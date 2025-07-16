import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '../../constants';
import { Ionicons } from '@expo/vector-icons';

interface EventType {
  _id: string;
  name: string;
  price: number;
  coverImage: { url: string };
}

export default function BookTicketScreen() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/event/${eventId}`);
        const json = await res.json();

        if (json.success) {
          setEvent(json.data);
        } else {
          Alert.alert('Error', json.message || 'Event not found');
          router.back();
        }
      } catch (err) {
        console.error('Failed to fetch event:', err);
        Alert.alert('Error', 'Failed to load event details');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const validateForm = () => {
    if (!form.firstName.trim()) {
      Alert.alert('Error', 'Please enter your first name');
      return false;
    }
    if (!form.lastName.trim()) {
      Alert.alert('Error', 'Please enter your last name');
      return false;
    }
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!event || !validateForm()) return;

    try {
      setPaymentProcessing(true);
      
      // Directly get tokens without expiration checks
      const token = await AsyncStorage.getItem('authToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        Alert.alert(
          'Login Required',
          'Please login to complete your booking',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Login', onPress: () => router.replace('/login') }
          ]
        );
        return;
      }

      const bookingData = {
        userId,
        items: [{ _id: event._id, quantity }],
        amount: event.price * quantity,
        address: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          event: event.name,
        },
      };

      const res = await fetch(`${BASE_URL}/api/booking/ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to create booking');
      }

      // Proceed to payment
      router.push({
        pathname: '/(app)/razorpay',
        params: {
          orderId: result.order_id,
          amount: result.amount,
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
      });

    } catch (error: any) {
      console.error('Payment error:', error);
      Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  const subtotal = event?.price ? event.price * quantity : 0;
  const processingFee = 0;
  const total = subtotal + processingFee;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6000" />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Event not available</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Tickets</Text>
      </View>

      <View style={styles.card}>
        {imageError ? (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Ionicons name="image-outline" size={40} color="#ccc" />
          </View>
        ) : (
          <Image source={{ uri: event.coverImage.url }} style={styles.image} />
        )}
        <View style={styles.eventDetails}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.eventPrice}>₹{event.price}</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity 
              style={styles.qtyBtn} 
              onPress={decreaseQty}
              disabled={quantity <= 1}
            >
              <Text style={[styles.qtyText, quantity <= 1 && styles.disabledQty]}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={increaseQty}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Details</Text>
        <TextInput
          placeholder="First Name"
          value={form.firstName}
          onChangeText={text => handleChange('firstName', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={form.lastName}
          onChangeText={text => handleChange('lastName', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={form.email}
          onChangeText={text => handleChange('email', text)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Phone"
          value={form.phone}
          onChangeText={text => handleChange('phone', text)}
          style={styles.input}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text>Tickets ×{quantity}</Text>
          <Text>₹{subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Processing Fee</Text>
          <Text>₹{processingFee.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>₹{total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.payButton, paymentProcessing && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={paymentProcessing}
      >
        {paymentProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>Proceed to Pay ₹{total.toFixed(2)}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ff3333',
    marginBottom: 20,
  },
  backLink: {
    color: '#FF6000',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  eventDetails: {
    flex: 1,
    marginLeft: 15,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventPrice: {
    fontSize: 16,
    color: '#FF6000',
    marginVertical: 10,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 6,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledQty: {
    color: '#ccc',
  },
  qtyValue: {
    marginHorizontal: 15,
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  summary: {
    marginVertical: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#FF6000',
  },
  payButton: {
    backgroundColor: '#FF6000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonDisabled: {
    opacity: 0.7,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});