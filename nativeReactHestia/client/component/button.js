import React from "react";
import { StyleSheet,TouchableOpacity,View, Text,Button,  } from 'react-native';

export default function RoundedButton({text, onPress}){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={StyleSheet.button}>
              <Text style={StyleSheet.buttonText}></Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:8,
        paddingVertical:14,
        borderRadius: 4,
        backgroundColor: 'red'
       },
       buttonText:{
           color:'white',
           fontWeight:'bold',
           textTransform:'uppercase',
           fontSize:16,
       }
})