import { Entypo, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BASE_URL } from '../../constants'; // Adjust path if needed
import { useStore } from '../../context/StoreContext';

const defaultProfilePic = require('../../assets/images/profile.jpg');
const defaultCoverPhoto = require('../../assets/images/cover.jpg');

type TabType = 'events' | 'communities' | 'followers';

export default function ProfileScreen() {
  const { token } = useStore();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('events');
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched user:', response.data.user); // <--- Add this line
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name || '',
          location: response.data.user.location || '',
          bio: response.data.user.bio || '',
          twitter: response.data.user.twitter || '',
          instagram: response.data.user.instagram || '',
          linkedin: response.data.user.linkedin || '',
          phone: response.data.user.phone || '',
          dob: response.data.user.dob || '',
          gender: response.data.user.gender || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLinkPress = (url: string) => {
    if (url.startsWith('http')) {
      Linking.openURL(url).catch(() => {
        alert('Failed to open the link.');
      });
    } else {
      // For usernames, prepend platform url
      alert('Invalid URL');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'events':
        if (!user?.events || user.events.length === 0) {
          return <Text style={styles.noDataText}>No events to display.</Text>;
        }
        return (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
            {user.events.map((event: any) => (
              <View key={event._id} style={styles.card}>
                <Image source={{ uri: event.image }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{event.name}</Text>
                <View style={styles.cardInfoRow}>
                  <Entypo name="location-pin" size={14} color="gray" />
                  <Text style={styles.cardInfo}>{event.location}</Text>
                </View>
                <View style={styles.cardInfoRow}>
                  <MaterialIcons name="date-range" size={14} color="gray" />
                  <Text style={styles.cardInfo}>{new Date(event.date).toLocaleDateString()}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        );
      case 'communities':
        if (!user?.communities || user.communities.length === 0) {
          return <Text style={styles.noDataText}>No communities to display.</Text>;
        }
        return (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
            {user.communities.map((community: any) => (
              <View key={community._id} style={styles.card}>
                <Image source={{ uri: community.image }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{community.name}</Text>
                <TouchableOpacity
                  style={styles.viewBtn}
                  onPress={() => {
                    // TODO: Implement navigation to community page
                    alert(`Go to community ${community.name}`);
                  }}
                >
                  <Text style={styles.viewBtnText}>View Community</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        );
      case 'followers':
        if (!user?.followers || user.followers.length === 0) {
          return <Text style={styles.noDataText}>No followers to display.</Text>;
        }
        return (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
            {user.followers.map((follower: any, i: number) => (
              <View key={i} style={styles.card}>
                <Image
                  source={{ uri: follower.profileImage?.url || defaultProfilePic }}
                  style={styles.cardImage}
                />
                <Text style={styles.cardTitle}>{follower.name}</Text>
                <Text style={styles.cardInfo}>{follower.location || 'No location'}</Text>
                <TouchableOpacity style={styles.followBtn} onPress={() => alert(`Following ${follower.name}`)}>
                  <Text style={styles.followBtnText}>Following</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6000" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load profile.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Cover Photo */}
      <Image source={defaultCoverPhoto} style={styles.coverPhoto} />

      {/* Profile Image and Info */}
      <View style={styles.headerSection}>
        <Image
          source={user.profileImage?.url ? { uri: user.profileImage.url } : defaultProfilePic}
          style={styles.profileImage}
        />

        {editMode ? (
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Name"
          />
        ) : (
          <Text style={styles.name}>{user.name || 'Guest User'}</Text>
        )}

        {editMode ? (
          <TextInput
            style={styles.input}
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
            placeholder="Location"
          />
        ) : (
          <Text style={styles.location}>{user.location}</Text>
        )}

        {/* Social Links */}
        <View style={styles.socialLinks}>
          {!editMode && (
            <>
              {user.twitter ? (
                <TouchableOpacity
                  onPress={() => handleLinkPress(`https://twitter.com/${user.twitter}`)}
                  style={styles.socialIconWrapper}
                >
                  <Entypo name="twitter" size={24} color="#1DA1F2" />
                </TouchableOpacity>
              ) : null}
              {user.instagram ? (
                <TouchableOpacity
                  onPress={() => handleLinkPress(`https://instagram.com/${user.instagram}`)}
                  style={styles.socialIconWrapper}
                >
                  <Entypo name="instagram" size={24} color="#C13584" />
                </TouchableOpacity>
              ) : null}
              {user.linkedin ? (
                <TouchableOpacity
                  onPress={() => handleLinkPress(`https://linkedin.com/in/${user.linkedin}`)}
                  style={styles.socialIconWrapper}
                >
                  <Entypo name="linkedin" size={24} color="#0e76a8" />
                </TouchableOpacity>
              ) : null}
            </>
          )}

          {editMode && (
            <>
              <TextInput
                style={styles.input}
                value={formData.twitter}
                onChangeText={(text) => setFormData({ ...formData, twitter: text })}
                placeholder="Twitter"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                value={formData.instagram}
                onChangeText={(text) => setFormData({ ...formData, instagram: text })}
                placeholder="Instagram"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                value={formData.linkedin}
                onChangeText={(text) => setFormData({ ...formData, linkedin: text })}
                placeholder="LinkedIn"
                autoCapitalize="none"
              />
            </>
          )}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.followers?.length || 0}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.following?.length || 0}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.events?.length || 0}</Text>
          <Text style={styles.statLabel}>Events</Text>
        </View>
      </View>

      {/* Profile Actions */}
      <View style={styles.profileActions}>
        {editMode ? (
          <>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => {
                // TODO: add save logic here
                setEditMode(false);
              }}
            >
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditMode(false)}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.editBtn} onPress={() => setEditMode(true)}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}
        >
          <Text style={styles.tabBtnText}>My Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'communities' && styles.activeTab]}
          onPress={() => setActiveTab('communities')}
        >
          <Text style={styles.tabBtnText}>Communities</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'followers' && styles.activeTab]}
          onPress={() => setActiveTab('followers')}
        >
          <Text style={styles.tabBtnText}>Connections</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {renderTabContent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  coverPhoto: { width: '100%', height: 150, backgroundColor: '#ddd' },
  headerSection: { alignItems: 'center', marginTop: -60, paddingHorizontal: 20 },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  name: { fontSize: 24, fontWeight: '600', marginTop: 10 },
  location: { fontSize: 16, color: 'gray', marginBottom: 10 },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
    gap: 20,
  },
  socialIconWrapper: {
    marginHorizontal: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  stat: { alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#FF6000' },
  statLabel: { fontSize: 14, color: 'gray' },
  profileActions: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginBottom: 20 },
  editBtn: {
    backgroundColor: '#FF6000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editBtnText: { color: '#fff', fontWeight: '600' },
  saveBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveBtnText: { color: '#fff', fontWeight: '600' },
  cancelBtn: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelBtnText: { color: '#fff', fontWeight: '600' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10, marginBottom: 10 },
  tabBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomColor: '#FF6000' },
  tabBtnText: { fontWeight: '600', fontSize: 16 },
  tabScroll: { paddingLeft: 20 },
  card: {
    width: 160,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  cardImage: { width: '100%', height: 100, resizeMode: 'cover' },
  cardTitle: { fontSize: 16, fontWeight: '600', marginHorizontal: 8, marginTop: 8 },
  cardInfoRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 8, marginBottom: 4 },
  cardInfo: { fontSize: 14, color: 'gray', marginLeft: 4 },
  viewBtn: {
    backgroundColor: '#FF6000',
    paddingVertical: 6,
    marginHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewBtnText: { color: '#fff', fontWeight: '600' },
  followBtn: {
    backgroundColor: '#FF6000',
    paddingVertical: 6,
    marginHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  followBtnText: { color: '#fff', fontWeight: '600' },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '80%',
    marginVertical: 8,
    padding: 4,
    fontSize: 16,
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: 'gray' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red' },
  noDataText: { textAlign: 'center', color: 'gray', marginTop: 20 },
});
