import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import { View, Text, Image, TextInput, ImageBackground,   ScrollView,TouchableOpacity,  Alert} from 'react-native';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import { createStackNavigator } from '@react-navigation/stack';
//import  ReportStatus from './screen/reportStatus'
//import RoundedButton from './component/button';
//import Element from './sentReport'
//import FetchLogIn from './component/costumsPost'
//import HomeStack from './routers/homeStack'
//import HomeScreen from './component/HomeScreen';
import SecondScreen from "./SecondScreen";

const Stack = createNativeStackNavigator();

const HelloWorldApp = ({navigation}) => {
  const localBackgroundImage = require('../assets//Background_app_login[654].png')
  const image = {uri: 'https://reactjs.org/logo-og.png'};
  const [selected, setSelected] = React.useState("");
 
  const data = [
      {key:'1', value:'Mobiles', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]
  const data2 = [
    {key:'1', value:'Mobiles', disabled:true},
    {key:'2', value:'Appliances'},
    {key:'3', value:'Cameras'},
    {key:'4', value:'Computers', disabled:true},
    {key:'5', value:'Vegetables'},
    {key:'6', value:'Diary Products'},
    {key:'7', value:'Drinks'},
]
const data3 = [
  {key:'1', value:'Mobiles', disabled:true},
  {key:'2', value:'Appliances'},
  {key:'3', value:'Cameras'},
  {key:'4', value:'Computers', disabled:true},
  {key:'5', value:'Vegetables'},
  {key:'6', value:'Diary Products'},
  {key:'7', value:'Drinks'},
]
const data4 = [
  {key:'1', value:'Mobiles', disabled:true},
  {key:'2', value:'Appliances'},
  {key:'3', value:'Cameras'},
  {key:'4', value:'Computers', disabled:true},
  {key:'5', value:'Vegetables'},
  {key:'6', value:'Diary Products'},
  {key:'7', value:'Drinks'},
]
const data5 = [
  {key:'1', value:'Mobiles', disabled:true},
  {key:'2', value:'Appliances'},
  {key:'3', value:'Cameras'},
  {key:'4', value:'Computers', disabled:true},
  {key:'5', value:'Vegetables'},
  {key:'6', value:'Diary Products'},
  {key:'7', value:'Drinks'},
]

 function handleLogin(){
  //const { error, isPending, data: blogs } = FetchLogIn('http://localhost:8000/')
  navigation.navigate('SentReport')
  Alert.alert('you pressed me')
}
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
          <TextInput placeholder='Brukera Namn' style={styles.textinputs}></TextInput>
          <TextInput placeholder='personnummer' style={styles.textinputs}></TextInput>
        
        
        <View  style={styles.options}>
              
              <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
        </View>
        <View  style={styles.options}>
              
              <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
        </View>
        <View  style={styles.options}>
              
              <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    /> 
        
        </View>
        
        <Button 
        title="Navigate to second screen with french"
        
      />
        <TouchableOpacity style={styles.btn} onPress={() => 
        navigation.navigate("Second", { language: "french" })
        /*<Stack.Navigator initialRouteName="showStatus">
        <Stack.Screen name="showStatus" component={showStatus} />
      </Stack.Navigator>
         
        >*/
       }>
        <Text style={styles.btnText}>Shicka In Report</Text>
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
  textinputs:{
    marginTop:9,
    marginLeft:50,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 24,
    lineHeight: 33,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    width:275,
    height:45,
    padding:2
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
  marginTop:20,
  marginLeft:50,
  marginRight:50,
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  fontSize: 24,
  lineHeight: 33,
  color:'black'
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
