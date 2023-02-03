import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';

 function SendText(){
    
    return(
        <View style={styles.container}>
            
        <Text>info are sent yeah</Text>
        </View>
    )
}
export default SendText;
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16
    }
});