// components/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [ITMILAN, setITMILAN] = useState('');
  const [responsibilityName, setResponsibilityName] = useState('');
  const [responsibilityType, setResponsibilityType] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    fetch('http://192.168.1.6:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        number,
        ITMILAN,
        responsibilityName,
        responsibilityType,
        address,
        password,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'User registered successfully') {
        // Display success alert
        Alert.alert(
          "Success",
          "User registered successfully",
          [{ text: "OK" }]
        );
        // Clear all input fields
        setName('');
        setEmail('');
        setNumber('');
        setITMILAN('');
        setResponsibilityName('');
        setResponsibilityType('');
        setAddress('');
        setPassword('');
        setConfirmPassword('');
      } else {
        // Handle registration error
        Alert.alert(
          "Error",
          "Registration failed. Please try again.",
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Register Now</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="number"
          value={number}
          onChangeText={setNumber}
          keyboardType="numeric"
        />
        <Picker
          selectedValue={ITMILAN}
          style={styles.input}
          onValueChange={(itemValue) => setITMILAN(itemValue)}
        >
          <Picker.Item label="select ITMILAN" value="" />
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
        </Picker>
        <Picker
          selectedValue={responsibilityName}
          style={styles.input}
          onValueChange={(itemValue) => setResponsibilityName(itemValue)}
        >
          <Picker.Item label="select Responsibility name" value="" />
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
        </Picker>
        <Picker
          selectedValue={responsibilityType}
          style={styles.input}
          onValueChange={(itemValue) => setResponsibilityType(itemValue)}
        >
          <Picker.Item label="select Responsibility type" value="" />
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="create password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.login}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A64B2A',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginBottom: 20,
    marginTop: 40,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 4,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  login: {
    color: 'white',
    marginTop: 20,
  },
});

export default RegisterScreen;
