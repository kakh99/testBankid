import LogiIn from './component/LoginScreen'
import HomeScreen from "./component/HomeScreen";
import SecondScreen from "./component/SecondScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Button } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
          name="Login"
          component={LogiIn}
          options={{title: "Welcome"}}
        />
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{title: "Welcome"}}
        />
        <Stack.Screen 
          name="Second"
          component={SecondScreen}
        />
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}