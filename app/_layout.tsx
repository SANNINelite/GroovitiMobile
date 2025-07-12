import { Slot } from 'expo-router';
import { StoreProvider } from '../context/StoreContext';

export default function RootLayout() {
  return (
    <StoreProvider>
      <Slot />
    </StoreProvider>
  );
}
