import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Linking } from 'react-native';




export default function SecondScreen({ navigation }) {
  const localBackgroundImage = require('../assets//Background_app_login[654].png')
 /* const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ postName: 'React updates ' })
};
// 212.162.171.111
const postExample = async () => {
    try {
        await fetch(
            'https://bankidtest1.onrender.com/api/login')
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
/*const postExample = async () => {
  try {
      await fetch(
          'http://192.168.0.6:8000/api/login')
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
// http://212.162.171.111:8000/api/login
// http://localhost:3000/users
//https://api.github.com/users/hadley/orgs
const [backendData, setBackendData] = useState([])
const [loading, setloading] = useState(true)
 const getme = useEffect(()=>{
  console.log('hello')
  fetch("https://api.github.com/users/hadley/orgs")
  .then((res)=>res.json())
  .then((json)=>setBackendData(json))
  .catch((error)=>console.log(error))
  .finally(()=>setloading(false))
   
},[])

const [backendData1, setBackendData1] = useState([])
const fetchApi = async ()=>{
  try {
    console.log('hello1')
    //http://172.18.2.231:8000/api/login'
    //https://bankidtest1.onrender.com/api/login
    const res = await axios.get('http://192.168.0.11:8000/api/login')
    console.log('hello2')
    console.log(res.data)
    Linking.openURL(res.data);
    //Linking.openURL('https://app.bankid.com/?autostarttoken=&redirect=null');
  } catch (error) {
       console.log(error.message)
  }
    
}
 useEffect(()=>{
   fetchApi();
 },[])
  
  return (
    < ImageBackground source={localBackgroundImage}  style={styles.coverimage}>
    <View>
      <View>
            <Image source={require('../assets/rapport_check[678].png')} alt="hestia agora logo"  style={styles.textone} />
      </View>
      
      <TouchableOpacity style={styles.btn} title='Go to Home Screen'
        onPress= {()=> navigation.push("Home")}>
        <Text style={styles.btnText}>Skapa In Ny Rapport</Text>
       </TouchableOpacity>
      
            
      <StatusBar style="auto" />
    </View>
    <View>
      
    <View>
    </View>
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
  btn:{
    marginTop:150,
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
  padding:20,
  fontSize:20,
  textTransform:'uppercase',
  
}
});