import { Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StoreProvider } from '../context/StoreContext';
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <View style={styles.container}>
            <Slot />
          </View>
        </SafeAreaView>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // background for top/bottom safe areas (can also use '#222' or 'grey')
  },
  container: {
    flex: 1,
    backgroundColor: '#fff', // actual screen background
  },
});
