import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';
import { StoreProvider } from '../context/StoreContext';
import CustomDrawer from '../components/CustomDrawer';
import Toast from 'react-native-toast-message';

<Toast />

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StoreProvider>
          <StatusBar barStyle="light-content" />

          {/* Top Safe Area */}
          <SafeAreaView edges={['top']} style={styles.safeTop} />

          {/* Drawer Navigation */}
          <Drawer
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
              drawerPosition: 'right',
              headerShown: false,
            }}
          >
            <Drawer.Screen name="(app)" options={{ drawerLabel: 'Grooviti' }} />
          </Drawer>

          {/* Bottom Safe Area */}
          <SafeAreaView edges={['bottom']} style={styles.safeBottom} />
        </StoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeTop: {
    backgroundColor: '#000',
  },
  safeBottom: {
    backgroundColor: '#000',
  },
});
