import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TextInput, ImageBackground,TouchableOpacity} from 'react-native';
import { StyleSheet} from 'react-native';
import axios from 'axios';
import { Linking } from 'react-native';
import React, {useEffect, useState} from 'react'
export default function SecondScreen({ navigation }) {
    /*const postExample = async () => {
    try {
        await fetch(
            'https://reqres.in/api/posts', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        Alert.alert("Post created at : ", 
                        data.createdAt);
                        navigation.push("Home");
                    });
            })
    }
    catch (error) {
        console.error(error);
    }
}*/
const fetchApi = async ()=>{
  try {
    console.log('hello1')
    //http://172.18.2.231:8000/api/login'
    //https://bankidtest1.onrender.com/api/login
    const res = await axios.get('http://172.18.3.20:8000/api/login')
    console.log('hello2')
    console.log(res.data)
    let order = res.data.order;
    console.log('orderRef: ' + order);
    Linking.openURL(res.data.url);
    console.log("redirected")
    console.log('orderRef: ' + order);
    const res2 =await axios.get('http://172.18.3.20:8000/api/polling', {
      headers: {
        'order-ref': order
      }
    }) ;
    console.log("res2:");
    console.log(res2.data);
    //Linking.openURL('https://app.bankid.com/?autostarttoken=&redirect=null');
    if(res2.data== true){
      console.log(res2.data);
      navigation.push("Home")
    }
    
  } catch (error) {
       console.log(error.message)
  }
    
}
/* useEffect(()=>{
   fetchApi();
 },[])*/
  
  
  const localBackgroundImage = require('../assets//Background_app_login[654].png')
  
  return (
    < ImageBackground source={localBackgroundImage}  style={styles.coverimage}>
    <View>
    
    <View>
            <Image source={require('../assets/logo.png')} alt="hestia agora logo"  style={styles.textone} />
    </View>
      
      <TouchableOpacity style={styles.btn} title='Go to Home Screen'
        onPress={fetchApi}>
        <Text style={styles.btnText}>Logga In</Text>
       </TouchableOpacity>
      
      
      <StatusBar style="auto" />
    
    </View>
    </ ImageBackground>
  );
}

const styles = StyleSheet.create({
  coverimage:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
    
  },
  textone:{
    marginTop:100,
    marginLeft:70,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 24,
    lineHeight: 33,
    color:'blue'
  },
  scrollView: {
    marginHorizontal: 1,
  },
  btn:{
    marginTop:30,
    marginLeft:40,
    width:300,
    display:'flex',
    alignContent:'center',
    backgroundColor:'#F3651B',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10

   
},
btnText:{
  display:'flex',
  color:'white',

  padding:15,
  fontSize:20,
  textTransform:'uppercase',
  marginBottom:20
}
});