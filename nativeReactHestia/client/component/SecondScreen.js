import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TextInput, ImageBackground,   ScrollView,TouchableOpacity, Alert} from 'react-native';
import { StyleSheet} from 'react-native';
import { StackActions } from '@react-navigation/native';
import React, {useEffect, useState} from 'react'

export default function SecondScreen({ navigation }) {
  const localBackgroundImage = require('../assets//Background_app_login[654].png')
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ postName: 'React updates ' })
};

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
}
const [backendData, setBackendData] = useState([])
const [loading, setloading] = useState(true)
  useEffect(()=>{
  fetch("https://api.github.com/users/hadley/orgs")
  .then((res)=>res.json())
  .then((json)=>setBackendData(json))
  .catch((error)=>console.log(error))
  .finally(()=>setloading(false))
},[])
  
  return (
    < ImageBackground source={localBackgroundImage}  style={styles.coverimage}>
    <View>
      <View>
            <Image source={require('../assets/rapport_check[678].png')} alt="hestia agora logo"  style={styles.textone} />
      </View>
      
      <TouchableOpacity style={styles.btn} title='Go to Home Screen'
        onPress= {postExample}>
        <Text style={styles.btnText}>Skapa In Ny Rapport</Text>
       </TouchableOpacity>
      
            
      <StatusBar style="auto" />
    </View>
    <View>
    {loading ? (<Text>loading...</Text>):(
      backendData.map((data)=>(
        <View>
          <Text>{data.id}</Text>
          <Text>{data.login}</Text>
        </View>
      ))
      
    )}
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