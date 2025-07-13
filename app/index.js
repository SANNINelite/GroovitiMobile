// app/index.js
import { useStore } from '../context/StoreContext';
import LoginScreen from './login';
import LandingScreen from './(app)/landing';

// Polyfill for swiper
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}

export default function Index() {
  const { token } = useStore();

  if (!token) return <LoginScreen />;
  return <LandingScreen />;
}