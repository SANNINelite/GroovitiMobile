import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push('/landing')}>
        <Text style={[styles.icon, isActive('/landing') && styles.active]}>🏠</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/explore')}>
        <Text style={[styles.icon, isActive('/explore') && styles.active]}>🔍</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/bookings')}>
        <Text style={[styles.icon, isActive('/bookings') && styles.active]}>🎟️</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/profile')}>
        <Text style={[styles.icon, isActive('/profile') && styles.active]}>👤</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 24,
    color: '#999',
  },
  active: {
    color: '#FF6000',
    fontWeight: 'bold',
  },
});
