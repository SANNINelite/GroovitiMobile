import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

type EventItem = {
  id: string;
  title: string;
  location: string;
  date: string;
  image: any;
  description: string;
};

const eventData: Record<string, EventItem> = {
  '1': {
    id: '1',
    title: 'Sunburn Mumbai',
    location: 'Mumbai',
    date: 'July 20',
    image: require('../../../assets/images/sunburn.jpg'),
    description:
      'Experience a night of electrifying music and neon vibes. Top DJs, live acts, and dance floors await!',
  },
  '2': {
    id: '2',
    title: 'EDM Bash Delhi',
    location: 'Delhi',
    date: 'Aug 5',
    image: require('../../../assets/images/edm.jpg'),
    description:
      'Join the capital’s biggest EDM festival! Dance to the beats of world-class DJs and enjoy great food, fun, and friends.',
  },
};

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const cleanId = Array.isArray(id) ? id[0] : id;
  const event = cleanId ? eventData[cleanId] : undefined;

  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={event.image} style={styles.image} resizeMode="cover" />

      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        📍 {event.location} | 📅 {event.date}
      </Text>

      <Text style={styles.description}>{event.description}</Text>

      <Pressable style={styles.bookButton} onPress={() => router.push('/(app)/bookings')}>
        <Text style={styles.bookText}>Book Now</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6000',
    marginBottom: 10,
  },
  meta: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginBottom: 30,
  },
  bookButton: {
    backgroundColor: '#FF6000',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
