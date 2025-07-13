import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useStore } from '../context/StoreContext';

export default function CustomDrawer(props) {
  const router = useRouter();
  const { setToken, setUser } = useStore();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    router.replace('/login');
  };

  const menuItems = [
    // { label: 'Home', icon: 'home', route: '/landing' },
    // { label: 'Events', icon: 'event', route: '/explore' },
    { label: 'Communities', icon: 'group', route: '/communities' },
    { label: 'About Us', icon: 'info', route: '/about-us' },
    { label: 'Plans', icon: 'payments', route: '/plans' },
    { label: 'Contact Us', icon: 'call', route: '/contact-us' },
  ];

  // ✅ Fix aria-hidden warning by blurring focused input when drawer closes
  useEffect(() => {
    const unsubscribe = props.navigation?.addListener('drawerClose', () => {
      if (typeof document !== 'undefined') {
        const active = document.activeElement;
        if (active && typeof active.blur === 'function') {
          active.blur(); // ⬅️ Blur any focused element
        }
      }
    });

    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={styles.fullContainer}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollArea}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <MaterialIcons name={item.icon} size={24} color="#FF6000" />
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>

      {/* Bottom Logout */}
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="red" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  scrollArea: {
    paddingTop: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
    fontWeight: '500',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'red',
    fontWeight: 'bold',
  },
});
