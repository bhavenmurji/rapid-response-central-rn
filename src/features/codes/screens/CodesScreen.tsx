/**
 * Codes Screen - Emergency Protocols
 * React Native + TypeScript implementation
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { EmergencyColors, EmergencyStyles, EmergencyTypography, EmergencySpacing } from '../../../core/theme/EmergencyDesignSystem';
import { EmergencyProtocolCard } from '../../../core/components/EmergencyComponents';

// Emergency protocol data
const emergencyProtocols = [
  {
    id: 'code-blue',
    title: 'Code Blue',
    subtitle: 'Cardiac Arrest',
    severity: 'critical' as const,
    icon: 'favorite' as keyof typeof MaterialIcons.glyphMap,
  },
  {
    id: 'code-stroke',
    title: 'Code Stroke',
    subtitle: 'Acute Stroke Protocol',
    severity: 'critical' as const,
    icon: 'psychology' as keyof typeof MaterialIcons.glyphMap,
  },
  {
    id: 'code-stemi',
    title: 'Code STEMI',
    subtitle: 'ST-Elevation MI',
    severity: 'critical' as const,
    icon: 'monitor-heart' as keyof typeof MaterialIcons.glyphMap,
  },
  {
    id: 'rsi',
    title: 'Rapid Sequence Intubation',
    subtitle: 'Airway Management',
    severity: 'urgent' as const,
    icon: 'air' as keyof typeof MaterialIcons.glyphMap,
  },
  {
    id: 'shock',
    title: 'Shock Protocol',
    subtitle: 'Hemodynamic Support',
    severity: 'critical' as const,
    icon: 'flash-on' as keyof typeof MaterialIcons.glyphMap,
  },
  {
    id: 'pneumothorax',
    title: 'Pneumothorax',
    subtitle: 'Chest Decompression',
    severity: 'urgent' as const,
    icon: 'air' as keyof typeof MaterialIcons.glyphMap,
  },
  {
    id: 'status-epilepticus',
    title: 'Status Epilepticus',
    subtitle: 'Seizure Management',
    severity: 'urgent' as const,
    icon: 'psychology' as keyof typeof MaterialIcons.glyphMap,
  },
  {
    id: 'mtp',
    title: 'Massive Transfusion Protocol',
    subtitle: 'Blood Product Management',
    severity: 'critical' as const,
    icon: 'bloodtype' as keyof typeof MaterialIcons.glyphMap,
  },
  {
    id: 'malignant-hyperthermia',
    title: 'Malignant Hyperthermia',
    subtitle: 'Anesthesia Emergency',
    severity: 'critical' as const,
    icon: 'device-thermostat' as keyof typeof MaterialIcons.glyphMap,
  },
  {
    id: 'hyperkalemia',
    title: 'Hyperkalemia',
    subtitle: 'Electrolyte Emergency',
    severity: 'urgent' as const,
    icon: 'science' as keyof typeof MaterialIcons.glyphMap,
  },
  {
    id: 'eclampsia',
    title: 'Eclampsia',
    subtitle: 'Obstetric Emergency',
    severity: 'critical' as const,
    icon: 'pregnant-woman' as keyof typeof MaterialIcons.glyphMap,
  },
  {
    id: 'dka-hhs',
    title: 'DKA/HHS',
    subtitle: 'Diabetic Emergency',
    severity: 'urgent' as const,
    icon: 'local-hospital' as keyof typeof MaterialIcons.glyphMap,
  },
];

export default function CodesScreen() {
  const handleProtocolPress = (protocolId: string) => {
    // TODO: Navigate to specific protocol screen
    console.log(`Opening protocol: ${protocolId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={EmergencyColors.critical.red} 
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <MaterialIcons
              name="emergency"
              size={28}
              color={EmergencyColors.white}
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Emergency Codes</Text>
            <Text style={styles.headerSubtitle}>Life-threatening emergencies</Text>
          </View>
        </View>
      </View>

      {/* Protocol List */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.protocolsContainer}>
          {emergencyProtocols.map((protocol) => (
            <EmergencyProtocolCard
              key={protocol.id}
              title={protocol.title}
              subtitle={protocol.subtitle}
              severity={protocol.severity}
              icon={protocol.icon}
              onPress={() => handleProtocolPress(protocol.id)}
              style={styles.protocolCard}
            />
          ))}
        </View>

        {/* Footer Information */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerTitle}>Emergency Response Guidelines</Text>
          <Text style={styles.footerText}>
            These protocols are designed for immediate life-threatening emergencies. 
            Follow hospital-specific policies and procedures. Always call for additional 
            help when managing critical patients.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...EmergencyStyles.container,
  },
  header: {
    backgroundColor: EmergencyColors.critical.red,
    paddingBottom: EmergencySpacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: EmergencySpacing.md,
    paddingTop: EmergencySpacing.sm,
  },
  headerIcon: {
    backgroundColor: EmergencyColors.critical.redDark,
    borderRadius: 8,
    padding: EmergencySpacing.sm,
    marginRight: EmergencySpacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    ...EmergencyTypography.emergencyHeading,
    color: EmergencyColors.white,
    fontSize: 22,
  },
  headerSubtitle: {
    ...EmergencyTypography.bodyMedium,
    color: EmergencyColors.white,
    opacity: 0.9,
    marginTop: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: EmergencySpacing.xl,
  },
  protocolsContainer: {
    paddingHorizontal: EmergencySpacing.md,
    paddingTop: EmergencySpacing.md,
  },
  protocolCard: {
    marginHorizontal: 0,
    marginVertical: EmergencySpacing.xs,
  },
  footerInfo: {
    backgroundColor: EmergencyColors.gray[50],
    marginHorizontal: EmergencySpacing.md,
    marginTop: EmergencySpacing.lg,
    padding: EmergencySpacing.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: EmergencyColors.primary,
  },
  footerTitle: {
    ...EmergencyTypography.sectionHeader,
    fontSize: 16,
    marginBottom: EmergencySpacing.sm,
  },
  footerText: {
    ...EmergencyTypography.bodyMedium,
    lineHeight: 20,
  },
});