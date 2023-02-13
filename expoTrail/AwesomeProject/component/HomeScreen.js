import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import { View, Text, Image, TextInput, ImageBackground,   ScrollView,TouchableOpacity, Alert} from 'react-native';
import { StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';


const Stack = createNativeStackNavigator();

const HelloWorldApp = ({navigation, route}) => {

  const localBackgroundImage = require('../assets//Background_app_login[654].png')
  const [selected, setSelected] = React.useState("");
  const [selected2, setSelected2] = React.useState("");
  const [selected3, setSelected3] = React.useState(false);
 
  const data = [
      {key:'1', value:'Äter inte'},
      {key:'2', value:'För stora kläder'},
      {key:'3', value:'Ringer passer inte'},
      {key:'4', value:'Yr'},
      {key:'5', value:'Ledsen'},
      {key:'6', value:'Ensam'},
      {key:'7', value:'Ha det tråkigt'},
  ]
  const data2 = [
    {key:'1', value:'Matservice med mellanmål'},
    {key:'2', value:'Sällskap vid måltid av hemtjänst'},
    {key:'3', value:'Utökad ledsagning med hemtjänst'},
    {key:'4', value:'Kröning till träffpunkt'},
    {key:'5', value:'Fysisk träning'},
    {key:'6', value:'Måltidsvän'},
    
]
const data3 = [
  {key:'1', value:'Ja'},
  {key:'2', value:'Nej'},
  
]
/*
if (data.value==='Ja') {
  setSelected3(true);
}else{
  setSelected3(false);
}*/
//, authorization: `Bearer ${loginData.jwtToken}`
const loginData = JSON.parse(route.params.dataString);
const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${loginData.jwtToken}`},
  body: JSON.stringify({ symptom:selected, measures:selected2, elderly_agreement:selected3})
};

const handleSubmit = async () => {
  try {
    const response = await fetch(
      'http://172.18.3.20:8000/api/reports', requestOptions
    );
    console.log("requestOptions:"+requestOptions);
    const data = await response.json();
    Alert.alert("Post created at : ", data.createdAt);
    navigation.push("SecondScreen");
  } catch (error) {
    console.error(error);
  }
};
//const[]
/*const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
 // body: JSON.stringify({selected,selected2,selected3})
 body: JSON.stringify({name:"karam"})
};

const handleSubmit = async () => {
  try {
    await fetch(
      'http://172.18.3.20:8000/api/reports', requestOptions)
        .then(response => {
            response.json()
                .then(data => {
                    Alert.alert("Post created at : ", 
                    data.createdAt);
                    navigation.push("Second");
                });
        })
}
catch (error) {
    console.error(error);
}
};*/
/*const {data} =await axios.get('http://172.18.3.20:8000/api/auth/poll', {
      headers: {
       // authorization: `Bearer ${res.data.jwtToken}`,
        'order-ref': order
      }
    }) ;*/
/*const handleSubmit1 = function(){
  navigation.push("Second");
  console.log(selected)
  console.log(selected2)
  console.log(selected3)
 
}*/
/* function handleLogin(){
  //const { error, isPending, data: blogs } = FetchLogIn('http://localhost:8000/')
  navigation.navigate('SentReport')
  Alert.alert('you pressed me')
}*/

//const jwtToken = navigation.getParam('a');




  return (
    <ImageBackground source={localBackgroundImage}  style={styles.coverimage}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
         <View>
            <Image source={require('../assets/logo.png')} alt="hestia agora logo"  style={styles.textone} />
          </View>
          <View>
           <Text style={styles.textinput}>Symptom Report</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
          <View style={styles.inputTexts}>
      <Icon name="search" size={24} style={{ marginRight: 10 }} />
      <TextInput placeholder='Brukera Namn'>{loginData.elderlyInfo.name}</TextInput>
    </View>
          </View>
          <View style={styles.inputTexts}>
      <Icon name="search" size={24} style={{ marginRight: 10 }} />
      <TextInput >{loginData.elderlyInfo.personalNumber}</TextInput>
    </View>
    <View  style={styles.options}>
              
              <SelectList 
              placeholder='Symptom'
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
        </View>
        <View  style={styles.options}>
              
              <SelectList 
              placeholder='Förebyggande insats'
        setSelected={(val) => setSelected2(val)} 
        data={data2} 
        save="value"
    />
        </View>
        <View  style={styles.options}>
              
              <SelectList 
        placeholder='Föredragen av brukaren'
        setSelected={(val) =>{
          if (val==='Ja') {
            setSelected3(true)
          }else{
            setSelected3(false)
          }
          
        } } 
        data={data3} 
        save="value"
    /> 
        </View>
        <TouchableOpacity style={styles.btn}  onPress={handleSubmit}>
        <Text style={styles.btnText}>Shicka In Rapport</Text>
       </TouchableOpacity>
      </View>
      
      </ScrollView>
    </ImageBackground>

  );
};


const styles = StyleSheet.create({
  coverimage:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
    
  },
  scrollView: {
    marginHorizontal: 1,
  },
  container:{
    display:'flex',
    height:1000
  },
  textinput:{
    marginTop:10,
    marginLeft:80,
    display: 'flex',
   
    fontSize: 24,
    lineHeight: 33,
  },
  inputTexts:{
     flexDirection: 'row',
     
     padding:10,  
     borderWidth: 1,
     borderColor: 'gray',
    borderRadius: 10, 
    width:250,  
    marginLeft:60,
    marginTop:6
  },
  textone:{
    marginTop:100,
    marginLeft:100,
    display: 'flex',
  
    fontSize: 24,
    lineHeight: 33,
    color:'blue'
  },
  texttwo:{
    marginLeft:60,
    marginRight:30,
    display: 'flex',
   
    fontSize: 24,
    lineHeight: 33,
    color:'black'
 },
 options:{
  marginTop:6,
  marginLeft:60,
  marginRight:50,
  display: 'flex',
  
  fontSize: 24,
  lineHeight: 33,
  color:'black',
  width:250, 
 },
btn:{
    marginTop:150,
    marginLeft:30,
    width:300,
    display:'flex',
   
    backgroundColor:'#F3651B',
    
    alignItems:'center',
    borderRadius:10

   
},
btnText:{
  display:'flex',
  color:'white',
  padding:20,
  fontSize:20,
  textTransform:'uppercase'
}
  
});

export default HelloWorldApp;
