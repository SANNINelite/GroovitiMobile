// app/index.js
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import 'react-native-gesture-handler';
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}

export default function Index() {
  return <LoginScreen />;
}
