import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useStore } from '../context/StoreContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { apiBaseUrl } = useStore();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${apiBaseUrl}/api/user/login`, {
        email,
        password,
      });

      console.log('Login response:', res.data);

      if (res.data.success) {
        Alert.alert('Login successful', `You are logged in as ${res.data.role}`);
        router.push('/landing'); // redirect after login
      } else {
        Alert.alert('Login failed', res.data.message || 'Try again');
      }
    } catch (err) {
      console.log('Login error:', err?.response?.data || err.message);
      Alert.alert('Login error', err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Grooviti Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />

      {/* Sign Up link */}
      <TouchableOpacity onPress={() => router.push('/SignupScreen')}>
        <Text style={styles.signupText}>Don't have an account? Sign up here</Text>
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
  signupText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
