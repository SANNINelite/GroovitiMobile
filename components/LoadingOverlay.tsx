// components/LoadingOverlay.tsx

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingOverlay() {
  return (
    <View style={[styles.overlay, { pointerEvents: 'auto' }]}>
      <ActivityIndicator size="large" color="#FF6000" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
