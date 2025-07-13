import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { useStore } from '../context/StoreContext';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { apiBaseUrl, setToken, setUser } = useStore();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${apiBaseUrl}/api/user/login`, {
        email,
        password,
      });

      if (res.data.success) {
        setToken(res.data.token);
        setUser({ email: res.data.email }); // only setting email
        router.replace('/landing');
      } else {
        Alert.alert('Login failed', res.data.message || 'Try again');
      }
    } catch (err: any) {
      Alert.alert('Login error', err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Grooviti Login</Text>

      <View style={styles.inputWrapper}>
        <MaterialIcons name="email" size={20} color="#FF6000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputWrapper}>
        <MaterialIcons name="lock" size={20} color="#FF6000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </Pressable>

      <TouchableOpacity onPress={() => router.push('/SignupScreen')}>
        <Text style={styles.switchText}>
          <Text style={styles.grey}>Don't have an account? </Text>
          <Text style={styles.link}>Sign up</Text>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
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