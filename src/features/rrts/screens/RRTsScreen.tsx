/**
 * RRTs Screen - Rapid Response Team Protocols
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

// RRT protocol categories
const rrtCategories = [
  {
    category: 'Airway & Breathing',
    protocols: [
      { id: 'hypoxia', title: 'Hypoxia', subtitle: 'Low oxygen saturation', severity: 'urgent' as const },
      { id: 'dyspnea', title: 'Dyspnea', subtitle: 'Shortness of breath', severity: 'urgent' as const },
      { id: 'tachypnea', title: 'Tachypnea', subtitle: 'Rapid breathing', severity: 'caution' as const },
      { id: 'bradypnea', title: 'Bradypnea', subtitle: 'Slow breathing', severity: 'urgent' as const },
    ],
  },
  {
    category: 'Circulation',
    protocols: [
      { id: 'hypotension', title: 'Hypotension', subtitle: 'Low blood pressure', severity: 'urgent' as const },
      { id: 'hypertension', title: 'Hypertension', subtitle: 'High blood pressure', severity: 'caution' as const },
      { id: 'tachycardia', title: 'Tachycardia', subtitle: 'Fast heart rate', severity: 'urgent' as const },
      { id: 'bradycardia', title: 'Bradycardia', subtitle: 'Slow heart rate', severity: 'urgent' as const },
    ],
  },
  {
    category: 'Neurological',
    protocols: [
      { id: 'ams', title: 'Altered Mental Status', subtitle: 'Confusion/decreased LOC', severity: 'urgent' as const },
      { id: 'seizure', title: 'Seizure', subtitle: 'Seizure activity', severity: 'urgent' as const },
      { id: 'headache', title: 'Severe Headache', subtitle: 'Acute severe headache', severity: 'caution' as const },
      { id: 'weakness', title: 'Weakness/Visual Loss', subtitle: 'Neurological deficits', severity: 'urgent' as const },
    ],
  },
  {
    category: 'Systemic',
    protocols: [
      { id: 'sepsis', title: 'Sepsis', subtitle: 'Systemic infection', severity: 'critical' as const },
      { id: 'anaphylaxis', title: 'Anaphylaxis', subtitle: 'Severe allergic reaction', severity: 'critical' as const },
      { id: 'fever', title: 'Fever', subtitle: 'High temperature', severity: 'caution' as const },
      { id: 'hypothermia', title: 'Hypothermia', subtitle: 'Low temperature', severity: 'urgent' as const },
      { id: 'oliguria', title: 'Oliguria', subtitle: 'Decreased urine output', severity: 'caution' as const },
    ],
  },
];

export default function RRTsScreen() {
  const handleProtocolPress = (protocolId: string) => {
    console.log(`Opening RRT protocol: ${protocolId}`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Airway & Breathing':
        return 'air' as keyof typeof MaterialIcons.glyphMap;
      case 'Circulation':
        return 'favorite' as keyof typeof MaterialIcons.glyphMap;
      case 'Neurological':
        return 'psychology' as keyof typeof MaterialIcons.glyphMap;
      case 'Systemic':
        return 'local-hospital' as keyof typeof MaterialIcons.glyphMap;
      default:
        return 'medical-services' as keyof typeof MaterialIcons.glyphMap;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={EmergencyColors.urgent.orange} 
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <MaterialIcons
              name="medical-services"
              size={28}
              color={EmergencyColors.white}
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Rapid Response Teams</Text>
            <Text style={styles.headerSubtitle}>Early intervention protocols</Text>
          </View>
        </View>
      </View>

      {/* Protocol Categories */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {rrtCategories.map((category) => (
          <View key={category.category} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <MaterialIcons
                name={getCategoryIcon(category.category)}
                size={20}
                color={EmergencyColors.urgent.orange}
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryTitle}>{category.category}</Text>
            </View>
            
            <View style={styles.protocolsContainer}>
              {category.protocols.map((protocol) => (
                <EmergencyProtocolCard
                  key={protocol.id}
                  title={protocol.title}
                  subtitle={protocol.subtitle}
                  severity={protocol.severity}
                  onPress={() => handleProtocolPress(protocol.id)}
                  style={styles.protocolCard}
                />
              ))}
            </View>
          </View>
        ))}

        {/* Footer Information */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerTitle}>Rapid Response Criteria</Text>
          <Text style={styles.footerText}>
            RRT activation prevents deterioration to cardiac arrest. Early recognition 
            and intervention improve patient outcomes. Follow hospital-specific RRT 
            activation criteria and escalation pathways.
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
    backgroundColor: EmergencyColors.urgent.orange,
    paddingBottom: EmergencySpacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: EmergencySpacing.md,
    paddingTop: EmergencySpacing.sm,
  },
  headerIcon: {
    backgroundColor: EmergencyColors.urgent.orangeDark,
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
  categoryContainer: {
    marginBottom: EmergencySpacing.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: EmergencySpacing.md,
    paddingVertical: EmergencySpacing.sm,
    backgroundColor: EmergencyColors.urgent.orangeLight,
    marginHorizontal: EmergencySpacing.md,
    borderRadius: 8,
    marginBottom: EmergencySpacing.sm,
  },
  categoryIcon: {
    marginRight: EmergencySpacing.sm,
  },
  categoryTitle: {
    ...EmergencyTypography.sectionHeader,
    color: EmergencyColors.urgent.orangeDark,
    fontSize: 16,
  },
  protocolsContainer: {
    paddingHorizontal: EmergencySpacing.md,
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
    borderLeftColor: EmergencyColors.urgent.orange,
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