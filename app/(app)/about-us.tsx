import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const teamMembers = [
  { name: 'Aditya Divate', role: 'CEO & Founder' },
  { name: 'Swaroop Mane', role: 'CTO' },
  { name: 'Akash Patil', role: 'App developer' },
  { name: 'Saksham Gawande', role: 'CMO' },
  { name: 'Siddhi Pankhade', role: 'Lead Developer' },
  { name: 'Samiksha Ner', role: 'UI/UX Designer' },
  { name: 'Esha Pansare', role: 'CDO' },
  { name: 'Diksha Waghulde', role: 'HR' },
];

export default function AboutUsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Connecting People Through Live Events</Text>
        <Text style={styles.intro}>
          Grooviti is your gateway to discovering and booking unforgettable experiences. We bring every kind of event—from buzzing concerts to vibrant college fests—together on one seamless platform.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionText}>
            To make finding and attending events effortless and fun, empowering organizers and helping you create your next great story.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Promise</Text>
          <View style={styles.promiseList}>
            <Text style={styles.promiseItem}>
              <Text style={styles.bold}>Effortless Discovery:</Text> Find your vibe with a curated, easy-to-browse platform.
            </Text>
            <Text style={styles.promiseItem}>
              <Text style={styles.bold}>Instant Booking:</Text> Secure your spot in seconds. No hassle, no FOMO.
            </Text>
            <Text style={styles.promiseItem}>
              <Text style={styles.bold}>One Hub, All Events:</Text> From parties to workshops, it's all here.
            </Text>
          </View>
        </View>

        <Text style={styles.tagline}>
          <Text style={styles.bold}>Book it. Groove it. Live it.</Text>
        </Text>

        <Text style={styles.sectionTitle}>Meet Our Team</Text>
        <View style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={require('../../assets/images/profile.jpg')}
                style={styles.avatar}
              />
              <Text style={styles.name}>{member.name}</Text>
              <Text style={styles.role}>{member.role}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={styles.safeBottom} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeBottom: {
    backgroundColor: '#000',
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6000',
    marginBottom: 10,
    textAlign: 'center',
  },
  intro: {
    fontSize: 16,
    color: '#444',
    marginBottom: 18,
    lineHeight: 22,
    textAlign: 'center',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
  promiseList: {
    marginTop: 4,
    marginLeft: 8,
  },
  promiseItem: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#FF6000',
  },
  tagline: {
    fontSize: 18,
    color: '#222',
    marginVertical: 18,
    textAlign: 'center',
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  role: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
});
