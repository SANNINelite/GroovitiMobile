import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BASE_URL } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function EventBookingScreen() {
  const { eventId } = useLocalSearchParams();
  const router = useRouter();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/event/${eventId}`);
        const json = await res.json();
        if (json.success) {
          setEvent(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleBook = async () => {
    if (!event || count < 1) return;

    try {
      setBooking(true);
      const token = await AsyncStorage.getItem('authToken');

      const res = await fetch(`${BASE_URL}/api/booking/ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          eventId: event._id,
          quantity: count,
        }),
      });

      const json = await res.json();

      if (json.success) {
        Toast.show({
          type: 'success',
          text1: 'Booking Confirmed!',
          text2: 'Your ticket has been booked 🎉',
        });
        router.push('/(app)/profile');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Booking Failed',
          text2: json.message || 'Something went wrong',
        });
      }
    } catch (err) {
      console.error("Booking error:", err);
      Alert.alert('Booking Error', err.message || 'Please try again later');
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF6000" style={{ marginTop: 20 }} />;
  }

  if (!event) {
    return <Text style={styles.error}>Event not found</Text>;
  }

  const availableTickets = event.totalTickets - event.ticketsSold;

  return (
    <View style={styles.container}>
      <Image source={{ uri: event.coverImage.url }} style={styles.banner} />

      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.price}>
        {event.price === 0 ? 'Free' : `₹${event.price}`} per ticket
      </Text>

      <Text style={styles.label}>Select Quantity</Text>
      <View style={styles.counterBox}>
        <TouchableOpacity
          style={styles.counterBtn}
          onPress={() => setCount((prev) => Math.max(1, prev - 1))}
        >
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.count}>{count}</Text>

        <TouchableOpacity
          style={styles.counterBtn}
          onPress={() => setCount((prev) => Math.min(availableTickets, prev + 1))}
        >
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.remaining}>Available: {availableTickets} tickets</Text>

      <TouchableOpacity
        style={styles.payBtn}
        onPress={handleBook}
        disabled={booking || availableTickets === 0}
      >
        <Text style={styles.payText}>
          {booking ? 'Booking...' : 'Confirm Booking'}
        </Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#FF6000',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#444',
    marginBottom: 6,
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  counterBtn: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  counterText: {
    fontSize: 20,
    color: '#333',
  },
  count: {
    fontSize: 18,
    fontWeight: '600',
  },
  remaining: {
    marginBottom: 30,
    fontSize: 14,
    color: '#666',
  },
  payBtn: {
    backgroundColor: '#FF6000',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  payText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
});