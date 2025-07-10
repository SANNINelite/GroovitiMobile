import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useStore } from '../context/StoreContext';
import { router } from 'expo-router';

export default function SignupScreen() {
  const { apiBaseUrl } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${apiBaseUrl}/api/user/register`, {
        name,
        email,
        password,
      });
      console.log('Registering:', name, email);
      if (res.data.success) {
        Alert.alert('Signup successful', 'Please login to continue');
        router.replace('/'); // go back to login screen
      } else {
        Alert.alert('Signup failed', res.data.message || 'Try again');
      }
    } catch (err) {
      Alert.alert('Signup error', err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignup} />

      <TouchableOpacity onPress={() => router.replace('/')}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    marginBottom: 10, borderRadius: 5,
  },
  switchText: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
  },
});
