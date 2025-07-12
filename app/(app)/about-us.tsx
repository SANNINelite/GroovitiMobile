import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';

const teamMembers = [
  { name: 'Aditya Divate', role: 'CEO & Founder' },
  { name: 'Swaroop Mane', role: 'CTO' },
  { name: 'Saksham Gawande', role: 'CMO' },
  { name: 'Siddhi Pankhade', role: 'Lead Developer' },
  { name: 'Samiksha Ner', role: 'UI/UX Designer' },
  { name: 'Esha Pansare', role: 'CDO' },
  { name: 'Akash Patil', role: 'Strategy Head' },
  { name: 'Diksha Waghulde', role: 'HR' },
  { name: 'New Employee', role: '--' },
  { name: 'New Employee', role: '--' },
];

export default function AboutUsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.description}>
          Welcome to our platform grooviti.com, where you can discover and book exciting events
          happening near you. Whether it's concerts, tech conferences, or food festivals, we bring
          them all to one place.
        </Text>
        <Text style={styles.description}>
          Our mission is to empower event creators and enrich communities by providing a comprehensive
          event listing platform.
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
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 20,
    color: '#333',
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
