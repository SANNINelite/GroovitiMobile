import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '../../../constants';

export default function EventDetails() {
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true); // ensure loading is reset on each new event
      try {
        const res = await fetch(`${BASE_URL}/api/event/${eventId}`);
        const json = await res.json();
        setEvent(json.data);
      } catch (err) {
        console.error('Error fetching event:', err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]); // ✅ this makes it re-fetch when eventId changes

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#FF6000" />;
  }

  if (!event) {
    return <Text style={{ padding: 20 }}>Event not found</Text>;
  }

  const {
    name,
    description,
    price,
    category,
    location,
    availableTickets,
    coverImage,
    venue,
    date,
    isLive,
  } = event;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: coverImage?.url }} style={styles.banner} resizeMode="cover" />
      <View style={styles.details}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>

        <Text style={styles.label}>🗓️ Date:</Text>
        <Text style={styles.info}>{date}</Text>

        <Text style={styles.label}>📍 Location:</Text>
        <Text style={styles.info}>{venue}</Text>

        <Text style={styles.label}>🏷️ Category:</Text>
        <Text style={styles.info}>{category}</Text>

        <Text style={styles.label}>🎫 Price:</Text>
        <Text style={styles.price}>Rs. {price}</Text>

        <Text style={styles.label}>🎟️ Tickets Left:</Text>
        <Text style={styles.info}>{availableTickets}</Text>

        <Text style={styles.label}>📡 Status:</Text>
        <Text style={{ color: isLive ? 'green' : 'red', fontWeight: 'bold' }}>
          {isLive ? 'Event is Live!' : 'Event Over'}
        </Text>

        {/* Book Now Button */}
        <Pressable
          style={styles.button}
          onPress={() => {
            Linking.openURL(`https://grooviti.in/events/${event._id}`);
          }}
        >
          <Text style={styles.buttonText}>Book Now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 250,
  },
  details: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  info: {
    color: '#555',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6000',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FF6000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
