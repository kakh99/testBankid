
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, Text, Image, TextInput, ImageBackground,   ScrollView,TouchableOpacity,  Alert} from 'react-native';
import { StyleSheet} from 'react-native';
const {Navigator, Screen} = createNativeStackNavigator();
const ReportStatus = () => {
  return (
    <View>
        <Text>hello in this page</Text>
    </View>
  
  );
}
 
export default ReportStatus;