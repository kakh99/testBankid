import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TextInput, ImageBackground,TouchableOpacity} from 'react-native';
import { StyleSheet} from 'react-native';
import { StackActions } from '@react-navigation/native';

export default function SecondScreen({ navigation }) {
    const postExample = async () => {
    try {
        await fetch(
            'https://localhost:8000/api/login', requestOptions)
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
  
  const localBackgroundImage = require('../assets//Background_app_login[654].png')
  
  return (
    < ImageBackground source={localBackgroundImage}  style={styles.coverimage}>
    <View>
    
    <View>
            <Image source={require('../assets/logo.png')} alt="hestia agora logo"  style={styles.textone} />
    </View>
      
      <TouchableOpacity style={styles.btn} title='Go to Home Screen'
        onPress={() => navigation.push("Home")}>
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
  justifyContent:'center',
  alignContent:'cetnter',
  padding:15,
  fontSize:20,
  textTransform:'uppercase',
  marginBottom:20
}
});