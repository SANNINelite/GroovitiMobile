import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BASE_URL } from '../../constants';

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
}

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/notifications`);
        const json = await res.json();
        if (json.success) {
          setNotifications(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const renderItem = ({ item }: { item: Notification }) => (
    <View style={[styles.card, item.isRead ? styles.read : styles.unread]}>
      <MaterialIcons name="notifications" size={24} color="#FF6000" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>
          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6000" style={{ marginTop: 20 }} />
      ) : notifications.length === 0 ? (
        <Text style={styles.emptyText}>No notifications available</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6000',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  icon: {
    marginRight: 10,
    marginTop: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    color: '#333',
  },
  message: {
    color: '#555',
    fontSize: 14,
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  },
  read: {
    opacity: 0.6,
  },
  unread: {
    backgroundColor: '#fff7f0',
  },
});