/**
 * Rapid Response Central - React Native App
 * Emergency medical protocols for Virtua Voorhees Family Medicine
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Protocol Details
const protocolDetails = {
  'code-blue': {
    title: 'Code Blue - Cardiac Arrest',
    steps: [
      '1. Call for help and activate Code Blue',
      '2. Begin high-quality CPR immediately',
      '3. Attach defibrillator/AED as soon as available',
      '4. Follow ACLS algorithms',
      '5. Establish IV/IO access',
      '6. Administer medications per protocol'
    ],
    medications: ['Epinephrine 1mg IV/IO q3-5min', 'Amiodarone 300mg IV/IO first dose', 'Consider sodium bicarbonate']
  },
  'code-stroke': {
    title: 'Code Stroke - Acute Stroke Protocol',
    steps: [
      '1. Activate Code Stroke immediately',
      '2. Note time of last known well',
      '3. Perform rapid neurological assessment (NIHSS)',
      '4. Order STAT head CT',
      '5. Check blood glucose',
      '6. Evaluate for tPA eligibility'
    ],
    medications: ['tPA 0.9mg/kg (max 90mg)', 'Labetalol for BP >185/110', 'Avoid antiplatelets x24h post-tPA']
  },
  'rrt': {
    title: 'Rapid Response Team',
    steps: [
      '1. Call RRT for any concerning change',
      '2. Prepare recent vitals and labs',
      '3. Have medication list ready',
      '4. Brief RRT on patient status',
      '5. Assist with interventions',
      '6. Document thoroughly'
    ],
    medications: ['Based on clinical scenario', 'Have crash cart available', 'Prepare for potential transfer']
  },
  'labs': {
    title: 'Critical Lab Values',
    steps: [
      'Critical Values requiring immediate action:',
      '• K+ <2.5 or >6.5',
      '• Na+ <120 or >160',
      '• Glucose <40 or >500',
      '• pH <7.2 or >7.6',
      '• Hgb <7.0'
    ],
    medications: ['Treatment based on specific abnormality', 'Verify with repeat labs', 'Monitor closely']
  },
  'calculators': {
    title: 'Medical Calculators',
    steps: [
      'Available Calculators:',
      '• Wells Score (PE risk)',
      '• CHADS-VASc (Afib stroke risk)',
      '• GFR Calculator',
      '• Corrected Calcium',
      '• Anion Gap'
    ],
    medications: ['Use results to guide treatment', 'Document scores in chart', 'Consider clinical context']
  },
  'study': {
    title: 'FamMed Central Study Resources',
    steps: [
      'Quick Review Topics:',
      '• ACLS Algorithms',
      '• Common Drug Dosing',
      '• ECG Interpretation',
      '• Procedure Checklists',
      '• Board Review Questions'
    ],
    medications: ['Reference materials', 'Evidence-based guidelines', 'Updated protocols']
  }
};

export default function App() {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const protocols = [
    { id: 'code-blue', title: 'Code Blue', subtitle: 'Cardiac Arrest', icon: 'favorite', color: '#DC2626' },
    { id: 'code-stroke', title: 'Code Stroke', subtitle: 'Acute Stroke Protocol', icon: 'accessible', color: '#EA580C' },
    { id: 'rrt', title: 'RRT', subtitle: 'Rapid Response Team', icon: 'warning', color: '#F59E0B' },
    { id: 'labs', title: 'Labs', subtitle: 'Critical Values', icon: 'science', color: '#10B981' },
    { id: 'calculators', title: 'Calculators', subtitle: 'Medical Tools', icon: 'calculate', color: '#3B82F6' },
    { id: 'study', title: 'Study', subtitle: 'FamMed Central', icon: 'school', color: '#8B5CF6' },
  ];

  const handleProtocolPress = (protocolId: string) => {
    setSelectedProtocol(protocolId);
  };

  const handleBack = () => {
    setSelectedProtocol(null);
  };

  // Render protocol detail screen
  if (selectedProtocol && protocolDetails[selectedProtocol]) {
    const detail = protocolDetails[selectedProtocol];
    const protocol = protocols.find(p => p.id === selectedProtocol);
    
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.detailHeader, { backgroundColor: protocol?.color || '#DC2626' }]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <MaterialIcons name={protocol?.icon as any} size={36} color="white" />
          <Text style={styles.detailTitle}>{detail.title}</Text>
        </View>
        
        <View style={styles.detailContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Protocol Steps</Text>
            {detail.steps.map((step, index) => (
              <Text key={index} style={styles.stepText}>{step}</Text>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medications</Text>
            {detail.medications.map((med, index) => (
              <View key={index} style={styles.medicationItem}>
                <MaterialIcons name="medication" size={20} color={protocol?.color} />
                <Text style={styles.medicationText}>{med}</Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: protocol?.color }]}
            onPress={() => Alert.alert('Timer Started', 'Code timer has been activated')}
          >
            <MaterialIcons name="timer" size={24} color="white" />
            <Text style={styles.actionButtonText}>Start Code Timer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="local-hospital" size={36} color="#DC2626" />
        <Text style={styles.title}>Rapid Response Central</Text>
        <Text style={styles.subtitle}>Virtua Voorhees Emergency Protocols</Text>
      </View>

      <View style={styles.grid}>
        {protocols.map((protocol) => (
          <TouchableOpacity 
            key={protocol.id} 
            style={styles.card}
            onPress={() => handleProtocolPress(protocol.id)}
          >
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
  // Detail screen styles
  detailHeader: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 8,
  },
  detailTitle: {
    fontSize: Math.min(24, width * 0.06),
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  detailContent: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: Math.min(18, width * 0.045),
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  stepText: {
    fontSize: Math.min(16, width * 0.04),
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 8,
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  medicationText: {
    fontSize: Math.min(16, width * 0.04),
    color: '#4b5563',
    marginLeft: 10,
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  actionButtonText: {
    color: 'white',
    fontSize: Math.min(18, width * 0.045),
    fontWeight: '600',
    marginLeft: 10,
  },
});
