import React, { useEffect } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function RazorpayScreen() {
  const router = useRouter();

  const { orderId, amount, name, email, contact } = useLocalSearchParams() as {
    orderId: string;
    amount: string;
    name: string;
    email: string;
    contact: string;
  };

  useEffect(() => {
    // if (!orderId || !amount || !name || !email || !contact) {
    //   Alert.alert('Error', 'Missing payment information');
    //   router.replace('/(app)/landing');
    //   return;
    // }

    console.log('Launching Razorpay with:', { orderId, amount, name, email, contact });

    const options = {
      key: 'rzp_live_46Ch3IQvMWEQnp',
      amount: Math.round(Number(amount) * 100), // safer for decimal values
      currency: 'INR',
      name: 'Grooviti',
      description: 'Ticket Booking',
      order_id: orderId,
      prefill: {
        name,
        email,
        contact,
      },
      theme: {
        color: '#FF6000',
      },
    };

    try {
      RazorpayCheckout.open(options)
        .then((paymentData: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          Alert.alert('Success', `Payment ID: ${paymentData.razorpay_payment_id}`);
          router.replace('/(app)/bookings');
        })
        .catch((error: { code: number; description: string }) => {
          console.error('Payment Error:', error);
          Alert.alert('Payment Failed', error.description || 'Try again');
          router.replace('/(app)/events/[eventId]');
        });
    } catch (err) {
      console.error('Razorpay Init Error:', err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Initializing Payment...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 16, color: '#666' },
});
