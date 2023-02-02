//const BankId = require("bankid");
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const axiosLib = require("axios");
const https = require("https");
const to = require("await-to-js").to;
const fetch=require("isomorphic-fetch");
// Create Express app
const app = express();
//app.use(express.json());

const config = {
  mobileBankIdPolicy: "1.2.3.4.25",
  bankdIdUrl: "https://appapi2.test.bankid.com/rp/v5.1",
  pfx: fs.readFileSync("./certificate/FPTestcert4_20220818.p12"),
  passphrase: "qwerty123",
  ca: fs.readFileSync(`./certificate/cert.cer`)
};

// Agent for using SSL client certificate
const axios = axiosLib.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    pfx: config.pfx,
    passphrase: config.passphrase,
    ca: config.ca,
  }),
  headers: {
    "Content-Type": "application/json",
  },
});

async function call(method, params) {
 console.log(`${config.bankdIdUrl}/${method}`) ;
  const [error, result] = await to(
    axios.post(`${config.bankdIdUrl}/${method}`, params)
  );
  /*const [error, result] = await to (fetch(`${config.bankdIdUrl}/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    agent: new https.Agent({
      rejectUnauthorized: false,
      pfx: config.pfx,
      passphrase: config.passphrase,
      ca: config.ca,
    }),
  }));
*/

  if (error) {
    console.log(error.stack);
    // You will want to implement your own error handling here
    console.error("Error in call");
    if (error.response && error.response.data) {
      console.error(error.response.data);
      if (error.response.data.errorCode === "alreadyInProgress") {
        console.error(
          "You would have had to call cancel on this orderRef before retrying"
        );
        console.error(
          "The order should now have been automatically cancelled by this premature retry"
        );
      }
    }
    return { error };
  }
  console.log(result.data);
  // axiosLib(`https://app.bankid.com/?autostarttoken=[${result.data.autoStartToken}]&redirect=null`,param);

  return result.data;
}

const auth = async (endUserIp) =>
  await call("auth", {
    endUserIp,
    //personalNumber:"",
   /* requirement: {
      allowFingerprint: true,
    },*/
  });
const collect = async (orderRef) => await call("collect", { orderRef });

const startPolling = async (orderRef) => {
  try {
    while (true) {
      const { status, hintCode, completionData } = await collect(orderRef);
      if (status === "failed") {
        return { ok: false, status: hintCode };
      } else if (status === "complete") {
        return { ok: true, status: completionData };
      } else {
        console.log(hintCode);
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  } catch (err) {
    return err;
  }
};


app.get("/api/login", function (req, res, next) {
  console.log(req.socket.remoteAddress);
  auth("212.162.171.111")
    .then((response) => {
      const { orderRef, autoStartToken } = response;
      const redirectUrl = `bankid:///?autostarttoken=[${autoStartToken}]&redirect=null`;
      console.log(redirectUrl);
      res.redirect(redirectUrl);
      startPolling(orderRef);
    })
    .catch((err) => next(err));
});

//ROUTES

// /*eslint-disable-next-line no-unused-lets*/
app.use((err, _req, res, next) => {
  console.error(err.stack);
  const errRes = {
    message: err.message,
    error: {},
  };
  if (app.env === "development") {
    errRes.error = err;
  }
  res.status(err.status || 500);
  res.json(errRes);
});

const port = process.env.PORT || 8000; //add port to the env file for the server
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Express server listening on port ${port} `);
  console.log(`Backend: ${port}/api/`);
  console.log(`Frontend (production):${port}/`);
});
