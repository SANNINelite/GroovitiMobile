import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useStore } from '../context/StoreContext';
import { useRouter } from 'expo-router';

export default function Logout() {
  const { setToken, setUser } = useStore();
  const router = useRouter();

  useEffect(() => {
    setToken('');
    setUser(null);
    setTimeout(() => {
      router.replace('/login');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF6000" />
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#FF6000',
  },
});
