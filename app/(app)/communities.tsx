import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

export default function CommunitiesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Explore Communities</Text>

      {/* Music Fest */}
      <View style={styles.card}>
        <Text style={styles.title}>🎵 Music Fest</Text>
        <Text style={styles.description}>Community for music events</Text>
        <Pressable style={styles.joinButton}>
          <Text style={styles.joinText}>Join</Text>
        </Pressable>
      </View>

      {/* Badminton Club */}
      <View style={styles.card}>
        <Text style={styles.title}>🏸 Badminton Club</Text>
        <Text style={styles.description}>Community for badminton players</Text>
        <Pressable style={styles.joinButton}>
          <Text style={styles.joinText}>Join</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  joinButton: {
    backgroundColor: '#FF6000',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
