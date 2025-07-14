import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { BASE_URL } from '../../../constants';

interface EventType {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  totalTickets: number;
  ticketsSold: number;
  coverImage: { url: string };
  location: {
    city: string;
    state?: string;
    country: string;
    latitude: number;
    longitude: number;
    address?: string;
  };
}

export default function EventDetails() {
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/event/${eventId}`);
        const json = await res.json();
        if (json.success) {
          setEvent(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch event:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleShare = async () => {
    if (event) {
      try {
        await Share.share({
          message: `Check out this event: ${event.name} at ${event.location.city}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const openInMaps = () => {
    if (event) {
      const { latitude, longitude } = event.location;
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url).catch(err => console.error("Failed to open map:", err));
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
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        <Image source={{ uri: event.coverImage.url }} style={styles.banner} />
        <Text style={styles.title}>{event.name}</Text>

        <Text style={styles.label}>{event.category}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.infoBox}>
          <MaterialIcons name="place" size={22} color="#FF6000" />
          <Text style={styles.infoText}>
            {event.location.address}, {event.location.city}, {event.location.state}, {event.location.country}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <MaterialIcons name="attach-money" size={22} color="#FF6000" />
          <Text style={styles.infoText}>
            {event.price === 0 ? 'Free' : `₹${event.price}`}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <MaterialIcons name="confirmation-number" size={22} color="#FF6000" />
          <Text style={styles.infoText}>{availableTickets} tickets left</Text>
        </View>

        {/* Google Maps Box */}
        <TouchableOpacity onPress={openInMaps} style={styles.mapBox}>
          <MaterialIcons name="map" size={24} color="#fff" />
          <Text style={styles.mapText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Sticky Bottom Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={[styles.bottomButton, styles.bookButton]}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.bottomButton, styles.shareButton]} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
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
  label: {
    fontSize: 14,
    color: '#FF6000',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#444',
    marginBottom: 16,
    lineHeight: 22,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#555',
  },
  mapBox: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  mapText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  bottomButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  bookButton: {
    backgroundColor: '#FF6000',
  },
  shareButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  error: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
    fontSize: 16,
  },
});