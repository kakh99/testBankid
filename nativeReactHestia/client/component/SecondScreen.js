import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TextInput, ImageBackground,   ScrollView,TouchableOpacity, Alert} from 'react-native';
import { StyleSheet} from 'react-native';
import { StackActions } from '@react-navigation/native';

export default function SecondScreen({ navigation }) {
  const localBackgroundImage = require('../assets//Background_app_login[654].png')
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ postName: 'React updates ' })
};

const postExample = async () => {
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
}
  
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