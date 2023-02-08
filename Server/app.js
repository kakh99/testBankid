//const BankId = require("bankid");
const fs = require("fs");
const express = require("express");

const axiosLib = require("axios");
const https = require("https");
const to = require("await-to-js").to;
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
const mongoose = require('mongoose')
// Create Express app
const app = express();
//app.use(express.json());

const config = {
  mobileBankIdPolicy: "1.2.3.4.25",
  //mobileBankIdPolicy:"1.2.752.78.1.5", this is for production env

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
 // console.log("params:");console.log(params);
 //console.log(`${config.bankdIdUrl}/${method}`) ;
  const [error, result] = await to(
    axios.post(`${config.bankdIdUrl}/${method}`, params)
  );


  if (error) {
    console.log(error.stack);
    const timeoutErrorCodes = ['requestTimeout', 'maintenance (repeatedly)','internalError'];

    console.error("Error in call");
    if (error.response && error.response.data) {
      console.error(error.response.data);
      if (error.response.data.errorCode === "alreadyInProgress") {
        console.error(
          "An identification or signing for this personal number is already started. Please try again."
        );
      }else if (error.response.data.errorCode === "cancelled") {
        console.error(
          "Action cancelled. Please try again. "
        );
        
      }else if (timeoutErrorCodes.includes(error.response.data.errorCode) ){
        // handle request timeout or maintenance error
        console.error(
          "Internal error. Please try again"
        );
      } 
    }
    return { error };
  }

  console.log("result.data:");
  console.log(result.data);
  console.log("end of result.data:");
  // axiosLib(`https://app.bankid.com/?autostarttoken=[${result.data.autoStartToken}]&redirect=null`,param);

  return result.data;
}
const auth = async (endUserIp) =>
  await call("auth", {
    endUserIp,
    personalNumber:"193305074795",
    requirement: {
      allowFingerprint: true,
    },
  });
const collect = async (orderRef) => await call("collect", { orderRef });
// BankID method call cancel
const cancel = async (orderRef) => await call('cancel', {orderRef});

const startPolling = async (orderRef) => {
  try {
    console.log("startPolling");
    while (true) {
      const { status, hintCode, completionData } = await collect(orderRef);
      if (status === "failed") {
        return { ok: false, status: hintCode };
      } else if (status === "complete") {
        return { ok: true, status: completionData };
      } else {
        console.log(`hincode is :${hintCode}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  } catch (err) {
    return err;
  }
};
//async redirectUrl() =
app.get("/api/login", async (req, res, next) => {
  //console.log(req.socket.remoteAddress);
  try {
   console.log("start Auth");
    const response = await auth('91.128.217.193');
    const { orderRef, autoStartToken } = response;
   
   //if the user initiates another request and the first one is still going, the auth should return an error
   //here we are checking that if the autostartoken or orderref are undefined (the response from the auth method) but we should maybe change this method to check if there is error
    if (!autoStartToken || !orderRef) {
      //if(error.response.data.errorCode === "cancelled")
      console.log("orderRef or autostartToken is undefined");
    throw new Error('Request failed');
  }
    const redirectUrl = `bankid:///?autostarttoken=[${autoStartToken}]&redirect=null`;
    console.log("redirectUrl:");
    console.log(redirectUrl);
    res.redirect(redirectUrl);
    const [error, result] = await to(startPolling(orderRef));
    console.log(`polling result is ${result}`);
   /* const {ok, status} = await startPolling(orderRef);
     if (status === "userCancel") {
       const { status, hintCode, completionData } = await call('cancel', { orderRef });
        return { ok: true, status: hintCode };
      }*/
   /* const pollingResult  = await startPolling(orderRef);
    console.log(`pollingResults:${pollingResult}`);
    if (pollingResult.hintCode="userCancel") {
      console.log("cancelling")
      await cancel(orderRef);
    }else{
      console.log("not cancelled")
    }*/
  } catch (err) {
    console.log("caught in app.get");
   // console.log(err);
    next(err);
  }
});

//ROUTES
/*
async function startAuthandPolling(pnr){
  try {
    const response = await auth('91.128.217.193',pnr);
    const { orderRef, autoStartToken } = response;
    const redirectUrl = `bankid:///?autostarttoken=[${autoStartToken}]&redirect=null`;
    console.log("redirectUrl:");
    console.log(redirectUrl);
    //res.redirect(redirectUrl);
    //await cancel(orderRef);
    const pollingResult  = await startPolling(orderRef);
    console.log(`pollingResults:${pollingResult}`);
    
   /* if (pollingResult.hintCode="userCancel") {
      await cancel(orderRef);
    }
  } catch (err) {
    next(err);
  }
}*/
// /*eslint-disable-next-line no-unused-lets*/
app.use((err, _req, res, next) => {
  console.log("in error middleware");
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
  console.log("end of error middleware");
});

const mongoURI = process.env.MONGO_URI.replace(
  '<PASSWORD>',
  process.env.MONGO_URI_PASSWORD
);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
      console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
      console.error(err.stack);
      process.exit(1);
  }
  console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

const port = process.env.PORT || 8000; //add port to the env file for the server
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Express server listening on port ${port} `);
  console.log(`Backend: ${port}/api/`);
  console.log(`Frontend (production):${port}/`);
});
