import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Left: Logo */}
      <Image
        source={require('../assets/images/grooviti-full.png')} // Make sure this exists
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Right: Icons */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => console.log('Search pressed')}>
          <MaterialIcons name="search" size={26} color="#333" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Hamburger pressed')}>
          <MaterialIcons name="menu" size={26} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
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
