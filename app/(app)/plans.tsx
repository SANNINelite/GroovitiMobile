import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

export default function PlansScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Flexible plans for every event</Text>
      <Text style={styles.subheading}>
        Affordable and transparent pricing for individual organizers, event planners, and businesses.
      </Text>

      {/* Plan Periods */}
      <View style={styles.planPeriods}>
        <Text style={styles.planPeriod}>Monthly</Text>
        <Text style={styles.planPeriod}>Quarterly</Text>
        <Text style={styles.planPeriod}>Annual</Text>
      </View>

      {/* Basic Plan */}
      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Basic</Text>
        <Text style={styles.planSubtitle}>Ideal for individuals or small event organizers</Text>
        <Text style={styles.price}>₹49 / month</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Get started</Text>
        </Pressable>
        <View style={styles.features}>
          <Text style={styles.feature}>• Access to admin panel</Text>
          <Text style={styles.feature}>• Upto 100 Registrations per Event</Text>
          <Text style={styles.feature}>• Basic ticket listing options</Text>
          <Text style={styles.feature}>• Default Templates for Tickets and Events</Text>
          <Text style={styles.feature}>• Email support</Text>
        </View>
      </View>

      {/* Premium Plan */}
      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Premium</Text>
        <Text style={styles.planSubtitle}>Perfect for growing event organizers</Text>
        <Text style={styles.price}>₹499 / month</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
        <View style={styles.features}>
          <Text style={styles.feature}>• Access to admin panel</Text>
          <Text style={styles.feature}>• Upto 350 Registrations per Event</Text>
          <Text style={styles.feature}>• Email support</Text>
          <Text style={styles.feature}>• Access to personalized emails</Text>
          <Text style={styles.feature}>• Certificate generation</Text>
          <Text style={styles.feature}>• Default Templates</Text>
          <Text style={styles.feature}>• Event Attendance Management</Text>
        </View>
      </View>

      {/* Custom Plan */}
      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Custom</Text>
        <Text style={styles.planSubtitle}>Designed for large-scale event management</Text>
        <Text style={styles.price}>₹999 / month</Text>
        <Pressable style={[styles.button, { backgroundColor: '#333' }]}>
          <Text style={styles.buttonText}>Contact team</Text>
        </Pressable>
        <View style={styles.features}>
          <Text style={styles.feature}>• Access to admin panel</Text>
          <Text style={styles.feature}>• Upto 3000 Registrations</Text>
          <Text style={styles.feature}>• Access to personalized emails</Text>
          <Text style={styles.feature}>• Certificate generation</Text>
          <Text style={styles.feature}>• 24/7 customer support (Phone and Email)</Text>
          <Text style={styles.feature}>• Customizable event pages, certificates and tickets</Text>
          <Text style={styles.feature}>• Advanced reporting and analytics</Text>
          <Text style={styles.feature}>• Event Attendance Management</Text>
          <Text style={styles.feature}>• Event Page Templates</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  subheading: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  planPeriods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  planPeriod: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6000',
  },
  planCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    color: '#222',
  },
  planSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6000',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6000',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  features: {
    paddingLeft: 10,
  },
  feature: {
    fontSize: 13,
    marginVertical: 2,
    color: '#444',
  },
});
