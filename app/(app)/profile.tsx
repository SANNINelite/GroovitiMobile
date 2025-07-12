import { View, Text, Image, StyleSheet } from 'react-native';
import { useStore } from '../../context/StoreContext'; // ✅ Adjusted relative path
import type { StoreContextType } from '../../context/StoreContext'; // ✅ For type safety

const defaultProfilePic = require('../../assets/images/profile.jpg'); // ✅ Default fallback image

export default function ProfileScreen() {
  const { user } = useStore() as StoreContextType;

  return (
    <View style={styles.container}>
      <Image
        source={user?.profilePic ? { uri: user.profilePic } : defaultProfilePic}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user?.name || 'Guest'}</Text>
      <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user?.followers || 0}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user?.following || 0}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user?.bookings || 0}</Text>
          <Text style={styles.statLabel}>Bookings</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 30,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
});
