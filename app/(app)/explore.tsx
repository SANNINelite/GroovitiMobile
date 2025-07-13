// app/(app)/explore.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { BASE_URL } from '../../constants';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface Event {
  _id: string;
  name: string;
  dateTime: string;
  availableTickets: number;
  coverImage: {
    url: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
    address: string;
  };
}

export default function ExploreScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/event/list`);
        const json = await res.json();
        if (json.success) {
          // Sort by availableTickets > 0 first and by dateTime (descending)
          const sorted = json.data.sort((a: Event, b: Event) => {
            if (a.availableTickets > 0 && b.availableTickets <= 0) return -1;
            if (a.availableTickets <= 0 && b.availableTickets > 0) return 1;
            return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
          });
          setEvents(sorted);
          setFilteredEvents(sorted);
        } else {
          setError('Failed to fetch events.');
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (!text) {
      setFilteredEvents(events);
    } else {
      const lower = text.toLowerCase();
      const filtered = events.filter((event) =>
        event.name.toLowerCase().includes(lower)
      );
      setFilteredEvents(filtered);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF6000" />
        <Text>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <MaterialIcons name="search" size={22} color="#666" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search events..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              item.availableTickets <= 0 && styles.cardSoldOut,
            ]}
            onPress={() => {
              if (item.availableTickets > 0) {
                router.push(`/events/${item._id}`);
              }
            }}
            disabled={item.availableTickets <= 0}
          >
            {item.coverImage?.url ? (
              <Image
                source={{ uri: item.coverImage.url }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.noImage}>No image available</Text>
            )}
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.date}>
              {new Date(item.dateTime).toLocaleString()}
            </Text>
            <Text style={styles.location}>
              {item.location.city}, {item.location.state}, {item.location.country}
            </Text>
            <Text style={styles.address}>{item.location.address}</Text>
            <Text style={[styles.status, { color: item.availableTickets > 0 ? 'green' : 'gray' }]}>
              {item.availableTickets > 0 ? 'Tickets Available' : 'Sold Out'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f2f2f2',
    height: 48,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  card: {
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  cardSoldOut: {
    backgroundColor: '#eaeaea',
    opacity: 0.7,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  noImage: {
    fontStyle: 'italic',
    color: '#aaa',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6000',
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  address: {
    fontSize: 13,
    color: '#777',
  },
  status: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
});