import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../../components/Header'; // adjust path if needed

export default function TabsLayout() {
  return (
    <View style={styles.wrapper}>
      {/* Top Safe Area + Global Header */}
      <SafeAreaView style={styles.safeAreaTop} />
      <Header />

      {/* Tabs (Bottom Navigation) */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FF6000',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0.5,
            borderTopColor: '#ccc',
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="landing"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="travel-explore" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="bookings"
          options={{
            tabBarLabel: 'Bookings',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="event" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />

        {/* Hidden Screens */}
        <Tabs.Screen name="about-us" options={{ href: null }} />
        <Tabs.Screen name="plans" options={{ href: null }} />
        <Tabs.Screen name="contact-us" options={{ href: null }} />
        <Tabs.Screen name="communities" options={{ href: null }} />
        <Tabs.Screen name="events/[id]" options={{ href: null }} />
        <Tabs.Screen name="login" options={{ href: null }} />
        <Tabs.Screen name="edit-profile" options={{ href: null }} />
      </Tabs>

      {/* Bottom Safe Area */}
      <SafeAreaView style={styles.safeAreaBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000', // Keeps notch area black
  },
  safeAreaTop: {
    backgroundColor: '#000',
  },
  safeAreaBottom: {
    backgroundColor: '#000',
  },
});
