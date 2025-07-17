/**
 * Rapid Response Central - React Native App
 * Emergency medical protocols for Virtua Voorhees Family Medicine
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function App() {
  const protocols = [
    { id: 1, title: 'Code Blue', subtitle: 'Cardiac Arrest', icon: 'favorite', color: '#DC2626' },
    { id: 2, title: 'Code Stroke', subtitle: 'Acute Stroke Protocol', icon: 'accessible', color: '#EA580C' },
    { id: 3, title: 'RRT', subtitle: 'Rapid Response Team', icon: 'warning', color: '#F59E0B' },
    { id: 4, title: 'Labs', subtitle: 'Critical Values', icon: 'science', color: '#10B981' },
    { id: 5, title: 'Calculators', subtitle: 'Medical Tools', icon: 'calculate', color: '#3B82F6' },
    { id: 6, title: 'Study', subtitle: 'FamMed Central', icon: 'school', color: '#8B5CF6' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="local-hospital" size={36} color="#DC2626" />
        <Text style={styles.title}>Rapid Response Central</Text>
        <Text style={styles.subtitle}>Virtua Voorhees Emergency Protocols</Text>
      </View>

      <View style={styles.grid}>
        {protocols.map((protocol) => (
          <TouchableOpacity key={protocol.id} style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: protocol.color }]}>
              <MaterialIcons name={protocol.icon} size={32} color="white" />
            </View>
            <Text style={styles.cardTitle}>{protocol.title}</Text>
            <Text style={styles.cardSubtitle}>{protocol.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>✅ React Native Web Deployment</Text>
        <Text style={styles.footerText}>🏥 Emergency Clinical Decision Support</Text>
        <Text style={styles.footerText}>📱 Optimized for All Devices</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: Math.min(32, width * 0.08),
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Math.min(16, width * 0.04),
    color: '#6b7280',
    marginTop: 5,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    margin: 10,
    width: Math.min(180, width * 0.42),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: Math.min(18, width * 0.045),
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: Math.min(14, width * 0.035),
    color: '#6b7280',
    textAlign: 'center',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: Math.min(14, width * 0.035),
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'center',
  },
});
