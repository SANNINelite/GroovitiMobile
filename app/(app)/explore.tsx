import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EventCard from '@/components/EventCard';

const events = [
  {
    id: '1',
    title: 'Neon Music Fest',
    location: 'Mumbai',
    date: 'July 20',
    image: require('../../assets/images/sunburn.jpg'),
  },
  {
    id: '2',
    title: 'AI Conference 2025',
    location: 'Delhi',
    date: 'August 2',
    image: require('../../assets/images/startup.jpg'),
  },
  {
    id: '3',
    title: 'Laugh Riot Standup',
    location: 'Pune',
    date: 'August 10',
    image: require('../../assets/images/comedy.jpg'),
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={22} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Popular Events</Text>

      {/* Event List */}
      {filteredEvents.length > 0 ? (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              location={item.location}
              date={item.date}
              image={item.image}
              themeColor="#FF6000"
              onPress={() => router.push(`/events/${item.id}` as any)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noEventsText}>No matching events found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  noEventsText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
});
