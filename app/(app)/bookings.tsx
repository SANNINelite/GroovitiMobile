import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

type Booking = {
  id: string;
  title: string;
  location: string;
  date: string;
  image: any;
};

const bookings: Booking[] = [
  // {
  //   id: '1',
  //   title: 'Neon Music Fest',
  //   location: 'Mumbai',
  //   date: 'July 20',
  //   image: require('../../assets/images/sunburn.jpg'),
  // },
  // {
  //   id: '2',
  //   title: 'AI Conference 2025',
  //   location: 'Delhi',
  //   date: 'August 2',
  //   image: require('../../assets/images/startup.jpg'),
  // },
];

export default function BookingsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>My Bookings</Text>

      {bookings.map((event) => (
        <View key={event.id} style={styles.card}>
          <Image source={event.image} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.date}>{event.date} • {event.location}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => alert('View Ticket Coming Soon!')}
          >
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6000',
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  date: {
    color: '#666',
    marginTop: 4,
  },
  viewBtn: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FF6000',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  viewText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
