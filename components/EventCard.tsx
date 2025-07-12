import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface EventCardProps {
  title: string;
  location: string;
  date: string;
  image: any;
  onPress?: () => void;
  themeColor?: string;
}

export default function EventCard({
  title,
  location,
  date,
  image,
  onPress,
  themeColor = '#FF6000',
}: EventCardProps) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{location} • {date}</Text>
        <TouchableOpacity
          style={[styles.cardButton, { backgroundColor: themeColor }]}
          onPress={onPress}
        >
          <Text style={styles.cardButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 12,
  },
  cardButton: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
