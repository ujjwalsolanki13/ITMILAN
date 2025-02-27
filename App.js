// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/homeScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen  name="Login" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen  name="Register" component={RegisterScreen} options={{headerShown:false}}/>
          <Stack.Screen  name="Home" component={HomeScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
