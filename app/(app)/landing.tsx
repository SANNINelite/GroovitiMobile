import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';

const events = [
  {
    id: '1',
    title: 'Sunburn Mumbai',
    location: 'Mumbai',
    date: 'July 20',
    image: require('../../assets/images/sunburn.jpg'),
  },
  {
    id: '2',
    title: 'EDM Bash Delhi',
    location: 'Delhi',
    date: 'Aug 5',
    image: require('../../assets/images/edm.jpg'),
  },
];

export default function LandingScreen() {
  return (
    <View style={styles.page}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Swiper */}
        <View style={styles.swiperContainer}>
          <Swiper autoplay dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
            <Image source={require('../../assets/images/banner.jpg')} style={styles.heroImage} />
            <Image source={require('../../assets/images/edm.jpg')} style={styles.heroImage} />
            <Image source={require('../../assets/images/comedy.jpg')} style={styles.heroImage} />
          </Swiper>
        </View>

        {/* Events */}
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {events.map((event) => (
          <Pressable
            key={event.id}
            style={styles.eventCard}
            onPress={() => router.push(`/events/${event.id}`)}
          >
            <Image source={event.image} style={styles.eventImage} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventMeta}>
                {event.location} • {event.date}
              </Text>
            </View>
          </Pressable>
        ))}

        {/* Why Grooviti */}
        <Text style={styles.sectionTitle}>Why Grooviti?</Text>
        <View style={styles.featureRow}>
          <Text style={styles.bullet}>🎫 Easy Booking</Text>
          <Text style={styles.bullet}>⚡ Real-time Events</Text>
          <Text style={styles.bullet}>🌍 Explore Nearby</Text>
        </View>

        {/* CTA */}
        <Pressable
          style={({ pressed }) => [
            styles.cta,
            { transform: [{ scale: pressed ? 0.96 : 1 }] },
          ]}
          onPress={() => router.push('/explore')}
        >
          <Text style={styles.ctaText}>Explore Events Now</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  swiperContainer: {
    height: 200,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  dot: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#FF6000',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    color: '#333',
  },
  eventCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventMeta: {
    color: '#666',
  },
  featureRow: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bullet: {
    fontSize: 16,
    marginVertical: 4,
  },
  cta: {
    backgroundColor: '#FF6000',
    padding: 14,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  ctaText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
