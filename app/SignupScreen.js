import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Pressable
} from 'react-native';
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

      if (res.data.success) {
        Alert.alert('Signup successful', 'Please log in to continue');
        router.replace('/'); // Redirect to Login
      } else {
        Alert.alert('Signup failed', res.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      Alert.alert('Signup error', err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Grooviti Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <TouchableOpacity onPress={() => router.replace('/')}>
        <Text style={styles.switchText}>
          <Text style={styles.grey}>Already have an account? </Text>
          <Text style={styles.link}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#FF6000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#FF6000',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    textAlign: 'center',
    fontSize: 14,
  },
  grey: {
    color: '#666',
  },
  link: {
    color: '#FF6000',
    fontWeight: 'bold',
  },
});
