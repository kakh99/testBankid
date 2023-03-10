import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import { View, Text, Image, TextInput, ImageBackground,   ScrollView,TouchableOpacity} from 'react-native';
import { StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';



const Stack = createNativeStackNavigator();

const HelloWorldApp = ({navigation}) => {
  const localBackgroundImage = require('../assets//Background_app_login[654].png')
  const [selected, setSelected] = React.useState("");
  const [selected2, setSelected2] = React.useState("");
  const [selected3, setSelected3] = React.useState("");
 
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
const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ postName: 'React updates ' })
};

const handleSubmit = async () => {
  try {
    await fetch(
        'https://reqres.in/api/posts', requestOptions)
        .then(response => {
            response.json()
                .then(data => {
                    Alert.alert("Post created at : ", 
                    data.createdAt);
                    navigation.push("Login");
                });
        })
}
catch (error) {
    console.error(error);
}
};
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
      <TextInput placeholder='Brukera Namn'></TextInput>
    </View>
          </View>
          <View style={styles.inputTexts}>
      <Icon name="search" size={24} style={{ marginRight: 10 }} />
      <TextInput placeholder='personnummer'></TextInput>
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
        setSelected={(val) => setSelected3(val)} 
        data={data3} 
        save="value"
    /> 
        </View>
        <TouchableOpacity style={styles.btn}  onPress={() => navigation.push("Login")}>
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
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 24,
    lineHeight: 33,
  },
  inputTexts:{
     flexDirection: 'row',
     justifyContent:'start', 
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
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 24,
    lineHeight: 33,
    color:'blue'
  },
  texttwo:{
    marginLeft:60,
    marginRight:30,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 24,
    lineHeight: 33,
    color:'black'
 },
 options:{
  marginTop:6,
  marginLeft:60,
  marginRight:50,
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
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
  textTransform:'uppercase'
}
  
});

export default HelloWorldApp;
