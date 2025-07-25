import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../../constants';

const pricing = {
  Basic: { monthly: 49, quarterly: 119, annual: 299 },
  Premium: { monthly: 499, quarterly: 1199, annual: 2999 },
  Custom: { monthly: 999, quarterly: 2399, annual: 5999 },
};

export default function OrganiserInfoScreen() {
  const { planName, billingCycle } = useLocalSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    organization: '',
    bio: '',
    website: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    city: '',
    state: '',
  });

  const [profileImage, setProfileImage] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validPlan = typeof planName === 'string' && ['Basic', 'Premium', 'Custom'].includes(planName);
  const validCycle = typeof billingCycle === 'string' && ['monthly', 'quarterly', 'annual'].includes(billingCycle);

  const totalPrice =
    validPlan && validCycle
      ? pricing[planName as 'Basic' | 'Premium' | 'Custom'][billingCycle as 'monthly' | 'quarterly' | 'annual']
      : 0;

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0]);
      setPreviewUrl(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordMinLength = 6;

    if (!formData.name.trim()) return 'Name is required.';
    if (!formData.email.trim() || !emailRegex.test(formData.email)) return 'Valid email is required.';
    if (formData.password.length < passwordMinLength) return `Password must be at least ${passwordMinLength} characters.`;
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match.';
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) return 'Valid 10-digit phone number required.';
    if (!formData.organization.trim()) return 'Organization name is required.';
    return null;
  };

  const handleBuyNow = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append('planName', planName as string);
      data.append('billingCycle', billingCycle as string);
      data.append('amount', String(totalPrice));
      if (profileImage) {
        data.append('profileImage', {
          uri: profileImage.uri,
          name: 'profile.jpg',
          type: 'image/jpeg',
        } as any);
      }

      const res = await axios.post(`${BASE_URL}/api/organizer/register`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        Alert.alert('Success', 'Proceeding to payment...');
        router.push({
          pathname: '/(app)/razorpay',
          params: {
            amount: totalPrice,
            userId: res.data.userId,
            email: formData.email,
          },
        });
      } else {
        Alert.alert('Error', res.data.message || 'Registration failed');
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Something went wrong. Please try again.';
      Alert.alert('Error', message);
      console.error('Registration Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.wrapper}>
        <View style={styles.left}>
          <Text style={styles.heading}>Organizer Information</Text>
          <Text style={styles.info}>
            Plan: <Text style={styles.bold}>{planName}</Text> | Billing: <Text style={styles.bold}>{billingCycle}</Text>
          </Text>
          <Text style={styles.totalPrice}>
            Total Price: <Text style={styles.bold}>₹{totalPrice}</Text>
          </Text>

          <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
            <Text style={styles.imagePickerText}>Pick Profile Image</Text>
          </TouchableOpacity>
          {previewUrl && (
            <Image
              source={{ uri: previewUrl }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(v) => handleChange('name', v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(v) => handleChange('email', v)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(v) => handleChange('password', v)}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(v) => handleChange('confirmPassword', v)}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(v) => handleChange('phone', v)}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Organization Name"
            value={formData.organization}
            onChangeText={(v) => handleChange('organization', v)}
          />
          <TextInput
            style={styles.textarea}
            placeholder="Short bio"
            value={formData.bio}
            onChangeText={(v) => handleChange('bio', v)}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Website"
            value={formData.website}
            onChangeText={(v) => handleChange('website', v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Instagram"
            value={formData.instagram}
            onChangeText={(v) => handleChange('instagram', v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Facebook"
            value={formData.facebook}
            onChangeText={(v) => handleChange('facebook', v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Twitter"
            value={formData.twitter}
            onChangeText={(v) => handleChange('twitter', v)}
          />
          <TextInput
            style={styles.input}
            placeholder="LinkedIn"
            value={formData.linkedin}
            onChangeText={(v) => handleChange('linkedin', v)}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={formData.city}
            onChangeText={(v) => handleChange('city', v)}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={formData.state}
            onChangeText={(v) => handleChange('state', v)}
          />

          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buyNowButtonText}>Buy Now</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#f8f9fb',
    flexGrow: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    color: '#2c3e50',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 15,
    color: '#666',
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 16,
    marginBottom: 18,
    color: '#333',
    fontWeight: '500',
  },
  imagePicker: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#333',
    fontWeight: '600',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 12,
  },
  input: {
    padding: 14,
    fontSize: 15,
    borderWidth: 0,
    backgroundColor: '#f1f3f6',
    borderRadius: 10,
    marginBottom: 10,
  },
  textarea: {
    padding: 14,
    fontSize: 15,
    borderWidth: 0,
    backgroundColor: '#f1f3f6',
    borderRadius: 10,
    marginBottom: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buyNowButton: {
    padding: 14,
    fontSize: 16,
    backgroundColor: '#4caf50',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buyNowButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
    color: '#FF6000', // or any color you want
  },
});