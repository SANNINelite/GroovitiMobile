// app/(app)/confirmation.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function Confirmation() {
  return (
    <View style={styles.container}>
      <Text style={styles.success}>🎉 Payment Successful!</Text>
      <Text style={styles.message}>Your ticket has been booked. Check your profile.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  success: { fontSize: 24, fontWeight: 'bold', color: '#28a745', marginBottom: 10 },
  message: { fontSize: 16, color: '#444', textAlign: 'center' },
});