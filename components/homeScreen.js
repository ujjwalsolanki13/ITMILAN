import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HomeScreen = ({ route }) => {
  const { selectedITMILAN } = route.params;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.6:3000/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To ITMILAN</Text>
      <Text style={styles.subtitle}>Selected ITMILAN: {selectedITMILAN}</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userText}>{item.name}</Text>
            <Text style={styles.userText}>{item.email}</Text>
            <Text style={styles.userText}>{item.number}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A64B2A',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: 'white',
    marginBottom: 20,
    marginTop:40,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  userContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userText: {
    fontSize: 16,
    color: 'white',
  },
});

export default HomeScreen;
