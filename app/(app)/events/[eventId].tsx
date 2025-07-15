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
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { BASE_URL } from '../../../constants';
import { WebView } from 'react-native-webview';
import * as Linking from 'expo-linking';

const screenHeight = Dimensions.get('window').height;

interface EventType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  coverImage: {
    url: string;
    public_id: string;
  };
  ticketsSold: number;
  totalTickets: number;
  location: {
    city: string;
    state?: string;
    country: string;
    latitude: number;
    longitude: number;
    address?: string;
  };
  createdAt: string;
}

export default function EventDetails() {
  const { eventId } = useLocalSearchParams();
  const router = useRouter(); // 👉 Used to navigate to bookticket.tsx
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
          message: `Check out this event: ${event.name} in ${event.location.city}. Book now on Grooviti!`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const openDirections = () => {
    if (event) {
      const url = `https://www.google.com/maps/search/?api=1&query=${event.location.latitude},${event.location.longitude}`;
      Linking.openURL(url).catch(err => console.error("Couldn't open map:", err));
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF6000" style={{ marginTop: 20 }} />;
  }

  if (!event) {
    return <Text style={styles.error}>Event not found</Text>;
  }

  const availableTickets = event.totalTickets - event.ticketsSold;

  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <style>
          body, html { margin: 0; padding: 0; height: 100%; }
          iframe { width: 100%; height: 100%; border: 0; border-radius: 12px; }
        </style>
      </head>
      <body>
        <iframe
          src="https://maps.google.com/maps?q=${event.location.latitude},${event.location.longitude}&z=16&output=embed"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: event.coverImage.url }} style={styles.banner} />
        <Text style={styles.title}>{event.name}</Text>

        <Text style={styles.label}>{event.category}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.infoBox}>
          <MaterialIcons name="place" size={22} color="#FF6000" />
          <Text style={styles.infoText}>
            {event.location.city}, {event.location.state}, {event.location.country}
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

        {/* Map Preview */}
        <Text style={styles.mapHeading}>📍 Location Preview</Text>
        <View style={styles.mapBox}>
          <WebView
            originWhitelist={['*']}
            source={{ html: mapHtml }}
            style={styles.mapPreview}
            javaScriptEnabled
            scrollEnabled={false}
          />
          <TouchableOpacity style={styles.directionsBtn} onPress={openDirections}>
            <FontAwesome5 name="location-arrow" size={14} color="#fff" />
            <Text style={styles.directionsText}> Get Directions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticky Bottom Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/bookticket?eventId=${event._id}`)}
        >
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    paddingBottom: 100,
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
  mapHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  mapBox: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  mapPreview: {
    flex: 1,
  },
  directionsBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FF6000',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
  },
  directionsText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 13,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
    backgroundColor: '#FF6000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  shareButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
    fontSize: 16,
  },
});