// components/LoginScreen.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/authReducer';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = () => {
    fetch('http://192.168.1.6:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number,
        password,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Login successful') {
        // Dispatch login action
        dispatch(login());
        // Navigate to home screen with ITMILAN
        navigation.navigate('Home', { selectedITMILAN: data.selectedITMILAN });
      } else {
        // Handle login error
        Alert.alert(
          "Error",
          "Invalid number or password. Please try again.",
          [{ text: "OK" }]
        );
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Alert.alert(
        "Error",
        "An error occurred. Please try again.",
        [{ text: "OK" }]
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="number"
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signup}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A64B2A',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  forgotPassword: {
    color: 'white',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signup: {
    color: 'white',
    marginTop: 20,
  },
});

export default LoginScreen;
