import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { EmergencyColors, EmergencyStyles, EmergencyTypography, EmergencySpacing } from '../../../core/theme/EmergencyDesignSystem';

export default function CalcScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={EmergencyColors.caution.yellow} />
      <View style={styles.header}>
        <MaterialIcons name="calculate" size={32} color={EmergencyColors.white} />
        <Text style={styles.headerTitle}>Medical Calculators</Text>
        <Text style={styles.headerSubtitle}>Clinical decision support tools</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.comingSoon}>Coming Soon</Text>
        <Text style={styles.description}>MDRD GFR, PSI-PORT, ABCD2, and other medical calculators</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { ...EmergencyStyles.container },
  header: { backgroundColor: EmergencyColors.caution.yellow, padding: EmergencySpacing.md, alignItems: 'center' },
  headerTitle: { ...EmergencyTypography.emergencyHeading, color: EmergencyColors.white, marginTop: EmergencySpacing.sm },
  headerSubtitle: { ...EmergencyTypography.bodyMedium, color: EmergencyColors.white, opacity: 0.9 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: EmergencySpacing.md },
  comingSoon: { ...EmergencyTypography.emergencyHeading, color: EmergencyColors.gray[600], marginBottom: EmergencySpacing.sm },
  description: { ...EmergencyTypography.bodyMedium, textAlign: 'center', color: EmergencyColors.gray[500] },
});