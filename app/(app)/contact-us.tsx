import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';

export default function ContactUsScreen() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInput = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      Alert.alert('Please fill all required fields.');
      return;
    }
    Alert.alert('Message submitted', 'Thank you! We will reach out soon.');
    // You can send this form to your backend here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Contact us</Text>
      <Text style={styles.subheading}>
        Need help? We’re here for you 24/7. Our dedicated team of growth experts is ready to help around the clock.
        Access 24/7 support through our award-winning network.
      </Text>

      <Pressable style={styles.callButton}>
        <Text style={styles.callText}>📞 Book a call</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Our Support Team</Text>

      {[
        { name: 'Saksham Gawande', role: 'Customer Success Lead' },
        { name: 'Akash Patil', role: 'VP of Customer Success' },
        { name: 'Esha', role: 'Payments Support' },
        { name: 'Diksha', role: 'Specialized Support' },
      ].map((member) => (
        <View key={member.name} style={styles.teamCard}>
          <Text style={styles.teamName}>{member.name}</Text>
          <Text style={styles.teamRole}>{member.role}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Contact Our Sales Team</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="First name *"
          value={form.firstName}
          onChangeText={(text) => handleInput('firstName', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Last name *"
          value={form.lastName}
          onChangeText={(text) => handleInput('lastName', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email *"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleInput('email', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone number"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => handleInput('phone', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Message *"
          multiline
          numberOfLines={4}
          value={form.message}
          onChangeText={(text) => handleInput('message', text)}
          style={[styles.input, styles.messageInput]}
        />

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
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
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  subheading: {
    fontSize: 15,
    color: '#555',
    marginBottom: 16,
  },
  callButton: {
    backgroundColor: '#FF6000',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  callText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  teamCard: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  teamName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  teamRole: {
    color: '#666',
    fontSize: 14,
  },
  form: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FF6000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
