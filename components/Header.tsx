import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type DrawerNav = DrawerNavigationProp<any>;

export default function Header() {
  const router = useRouter();
  const navigation = useNavigation<DrawerNav>();

  return (
    <View style={styles.container}>
      {/* Left: Logo */}
      <Image
        source={require('../assets/images/grooviti-full.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Right: Notification & Hamburger */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <MaterialIcons name="notifications-none" size={26} color="#333" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="menu" size={26} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    zIndex: 999,
  },
  logo: {
    height: 40,
    width: 140,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
});