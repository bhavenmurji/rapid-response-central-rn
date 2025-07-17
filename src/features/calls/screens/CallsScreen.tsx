import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { EmergencyColors, EmergencyStyles, EmergencyTypography, EmergencySpacing } from '../../../core/theme/EmergencyDesignSystem';

export default function CallsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={EmergencyColors.primary} />
      <View style={styles.header}>
        <MaterialIcons name="phone-in-talk" size={32} color={EmergencyColors.white} />
        <Text style={styles.headerTitle}>Emergency Calls</Text>
        <Text style={styles.headerSubtitle}>Non-critical medical conditions</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.comingSoon}>Coming Soon</Text>
        <Text style={styles.description}>Emergency call protocols for cardiovascular, respiratory, GI, and MSK conditions</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { ...EmergencyStyles.container },
  header: { backgroundColor: EmergencyColors.primary, padding: EmergencySpacing.md, alignItems: 'center' },
  headerTitle: { ...EmergencyTypography.emergencyHeading, color: EmergencyColors.white, marginTop: EmergencySpacing.sm },
  headerSubtitle: { ...EmergencyTypography.bodyMedium, color: EmergencyColors.white, opacity: 0.9 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: EmergencySpacing.md },
  comingSoon: { ...EmergencyTypography.emergencyHeading, color: EmergencyColors.gray[600], marginBottom: EmergencySpacing.sm },
  description: { ...EmergencyTypography.bodyMedium, textAlign: 'center', color: EmergencyColors.gray[500] },
});