/**
 * Code Blue Screen - Cardiac Arrest Protocol
 * React Native + TypeScript implementation
 * Converted from Flutter original
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { 
  activateEmergency, 
  startTimer, 
  incrementCPRCycles,
  updateEmergencyActions 
} from '../../../store/slices/emergencySlice';
import { addRecentProtocol } from '../../../store/slices/settingsSlice';

import { EmergencyColors, EmergencyStyles, EmergencyTypography, EmergencySpacing } from '../../../core/theme/EmergencyDesignSystem';
import { 
  CriticalEmergencyButton, 
  UrgentActionButton, 
  PrimaryActionButton,
  ProtocolTabSystem,
  EmergencyTimer,
  VitalSignDisplay 
} from '../../../core/components/EmergencyComponents';

// Tab definitions for protocol structure
const protocolTabs = [
  { key: 'causes', title: 'Causes', icon: 'search' as keyof typeof MaterialIcons.glyphMap },
  { key: 'history', title: 'History', icon: 'history' as keyof typeof MaterialIcons.glyphMap },
  { key: 'exam', title: 'Exam', icon: 'medical-services' as keyof typeof MaterialIcons.glyphMap },
  { key: 'plan', title: 'Plan', icon: 'fact-check' as keyof typeof MaterialIcons.glyphMap },
];

export default function CodeBlueScreen() {
  const [activeTab, setActiveTab] = useState('plan'); // Start with Plan for immediate action
  const dispatch = useAppDispatch();
  
  // Get emergency state from Redux
  const activeEmergencies = useAppSelector(state => state.emergency.activeEmergencies);
  const activeTimers = useAppSelector(state => state.emergency.activeTimers);
  
  // Find current code blue emergency and timer
  const currentEmergency = activeEmergencies.find(e => e.type === 'code_blue' && e.status === 'active');
  const codeBlueTimer = Object.values(activeTimers).find(t => t.type === 'code_blue' && t.isRunning);
  
  useEffect(() => {
    // Add to recent protocols when screen is opened
    dispatch(addRecentProtocol('code_blue'));
  }, [dispatch]);

  // Emergency actions
  const handleStartCPR = () => {
    if (!codeBlueTimer) {
      dispatch(startTimer({ type: 'cpr' }));
    } else {
      dispatch(incrementCPRCycles(codeBlueTimer.id));
    }
    
    if (!currentEmergency) {
      dispatch(activateEmergency({
        type: 'code_blue',
        criticalActions: [
          'Call Code Blue',
          'Start CPR',
          'Get Crash Cart/AED',
          'Secure Airway',
          'IV Access',
          'Epinephrine 1mg',
        ],
      }));
    } else {
      dispatch(updateEmergencyActions({
        emergencyId: currentEmergency.id,
        completedAction: 'Start CPR',
      }));
    }
  };

  const handleCallCode = () => {
    if (currentEmergency) {
      dispatch(updateEmergencyActions({
        emergencyId: currentEmergency.id,
        completedAction: 'Call Code Blue',
      }));
    }
    console.log('Calling Code Blue team');
  };

  const handleGetCrashCart = () => {
    if (currentEmergency) {
      dispatch(updateEmergencyActions({
        emergencyId: currentEmergency.id,
        completedAction: 'Get Crash Cart/AED',
      }));
    }
    console.log('Getting crash cart');
  };

  const renderCausesTab = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Common Causes of Cardiac Arrest</Text>
      
      <View style={styles.causesContainer}>
        <View style={styles.causeCategory}>
          <Text style={styles.categoryTitle}>4 H's</Text>
          <Text style={styles.causeItem}>• Hypoxia</Text>
          <Text style={styles.causeItem}>• Hypovolemia</Text>
          <Text style={styles.causeItem}>• Hyperkalemia/Hypokalemia</Text>
          <Text style={styles.causeItem}>• Hypothermia</Text>
        </View>

        <View style={styles.causeCategory}>
          <Text style={styles.categoryTitle}>4 T's</Text>
          <Text style={styles.causeItem}>• Tension pneumothorax</Text>
          <Text style={styles.causeItem}>• Tamponade (cardiac)</Text>
          <Text style={styles.causeItem}>• Toxins</Text>
          <Text style={styles.causeItem}>• Thrombosis (PE/MI)</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderHistoryTab = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Rapid History Assessment</Text>
      
      <View style={styles.historySection}>
        <Text style={styles.subsectionTitle}>Witness Information</Text>
        <Text style={styles.historyItem}>• Was collapse witnessed?</Text>
        <Text style={styles.historyItem}>• Time of collapse?</Text>
        <Text style={styles.historyItem}>• Any precipitating factors?</Text>
        <Text style={styles.historyItem}>• CPR started immediately?</Text>
      </View>

      <View style={styles.historySection}>
        <Text style={styles.subsectionTitle}>Medical History</Text>
        <Text style={styles.historyItem}>• Known cardiac disease</Text>
        <Text style={styles.historyItem}>• Recent procedures</Text>
        <Text style={styles.historyItem}>• Current medications</Text>
        <Text style={styles.historyItem}>• Drug allergies</Text>
      </View>
    </ScrollView>
  );

  const renderExamTab = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Physical Assessment</Text>
      
      <View style={styles.vitalSignsContainer}>
        <VitalSignDisplay label="HR" value="0" unit="bpm" status="critical" />
        <VitalSignDisplay label="BP" value="0/0" unit="mmHg" status="critical" />
        <VitalSignDisplay label="SpO2" value="--" unit="%" status="critical" />
        <VitalSignDisplay label="Temp" value="--" unit="°C" status="critical" />
      </View>

      <View style={styles.examSection}>
        <Text style={styles.subsectionTitle}>Primary Survey</Text>
        <Text style={styles.examItem}>• Airway: Check patency</Text>
        <Text style={styles.examItem}>• Breathing: Look, listen, feel</Text>
        <Text style={styles.examItem}>• Circulation: Check pulse, skin</Text>
        <Text style={styles.examItem}>• Disability: Neurological status</Text>
        <Text style={styles.examItem}>• Exposure: Look for obvious causes</Text>
      </View>
    </ScrollView>
  );

  const renderPlanTab = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Immediate Actions</Text>

      {/* Timer Section */}
      <View style={styles.timerSection}>
        <Text style={styles.timerLabel}>Code Blue Timer</Text>
        <EmergencyTimer
          initialTime={0}
          isRunning={codeBlueTimer?.isRunning || false}
          size="large"
          showMilliseconds={false}
        />
        <Text style={styles.cycleCounter}>CPR Cycles: {codeBlueTimer?.cycles || 0}</Text>
      </View>

      {/* Critical Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.actionsTitle}>1. Immediate Response (First 30 seconds)</Text>
        
        <CriticalEmergencyButton
          title="Call Code Blue"
          icon="phone"
          onPress={handleCallCode}
          fullWidth
          style={styles.actionButton}
        />

        <CriticalEmergencyButton
          title="Start CPR"
          icon="favorite"
          onPress={handleStartCPR}
          fullWidth
          style={styles.actionButton}
        />

        <UrgentActionButton
          title="Get Crash Cart/AED"
          icon="medical-services"
          onPress={handleGetCrashCart}
          fullWidth
          style={styles.actionButton}
        />
      </View>

      {/* CPR Guidelines */}
      <View style={styles.guidelinesContainer}>
        <Text style={styles.guidelinesTitle}>2. CPR Guidelines</Text>
        <View style={styles.cprGuideline}>
          <Text style={styles.guidelineText}>• Compressions: 100-120/min</Text>
          <Text style={styles.guidelineText}>• Depth: 5-6 cm (2-2.4 inches)</Text>
          <Text style={styles.guidelineText}>• Allow complete recoil</Text>
          <Text style={styles.guidelineText}>• Minimize interruptions</Text>
          <Text style={styles.guidelineText}>• Switch compressors every 2 minutes</Text>
        </View>
      </View>

      {/* Advanced Actions */}
      <View style={styles.advancedContainer}>
        <Text style={styles.guidelinesTitle}>3. Advanced Interventions</Text>
        
        <PrimaryActionButton
          title="Secure Airway"
          icon="air"
          onPress={() => console.log('Airway management')}
          fullWidth
          style={styles.actionButton}
        />

        <PrimaryActionButton
          title="IV Access"
          icon="medication"
          onPress={() => console.log('IV access')}
          fullWidth
          style={styles.actionButton}
        />

        <PrimaryActionButton
          title="Epinephrine 1mg"
          icon="medication"
          onPress={() => console.log('Epinephrine administered')}
          fullWidth
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'causes':
        return renderCausesTab();
      case 'history':
        return renderHistoryTab();
      case 'exam':
        return renderExamTab();
      case 'plan':
        return renderPlanTab();
      default:
        return renderPlanTab();
    }
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
              name="favorite"
              size={28}
              color={EmergencyColors.white}
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Code Blue</Text>
            <Text style={styles.headerSubtitle}>Cardiac Arrest Protocol</Text>
          </View>
          <View style={styles.severityIndicator}>
            <Text style={styles.severityText}>CRITICAL</Text>
          </View>
        </View>
      </View>

      {/* Tab System */}
      <ProtocolTabSystem
        tabs={protocolTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {renderTabContent()}
      </ProtocolTabSystem>
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
  severityIndicator: {
    backgroundColor: EmergencyColors.white,
    paddingHorizontal: EmergencySpacing.sm,
    paddingVertical: EmergencySpacing.xs,
    borderRadius: 4,
  },
  severityText: {
    ...EmergencyTypography.caption,
    color: EmergencyColors.critical.red,
    fontWeight: '700',
    fontSize: 10,
  },
  tabContent: {
    flex: 1,
    padding: EmergencySpacing.md,
  },
  sectionTitle: {
    ...EmergencyTypography.sectionHeader,
    marginBottom: EmergencySpacing.md,
  },

  // Causes Tab Styles
  causesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  causeCategory: {
    flex: 1,
    backgroundColor: EmergencyColors.critical.redLight,
    padding: EmergencySpacing.md,
    borderRadius: 8,
    marginHorizontal: EmergencySpacing.xs,
  },
  categoryTitle: {
    ...EmergencyTypography.protocolTitle,
    color: EmergencyColors.critical.red,
    marginBottom: EmergencySpacing.sm,
    fontSize: 16,
  },
  causeItem: {
    ...EmergencyTypography.bodyMedium,
    marginBottom: EmergencySpacing.xs,
  },

  // History Tab Styles
  historySection: {
    marginBottom: EmergencySpacing.lg,
  },
  subsectionTitle: {
    ...EmergencyTypography.protocolTitle,
    fontSize: 16,
    marginBottom: EmergencySpacing.sm,
  },
  historyItem: {
    ...EmergencyTypography.bodyMedium,
    marginBottom: EmergencySpacing.xs,
  },

  // Exam Tab Styles
  vitalSignsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: EmergencySpacing.lg,
  },
  examSection: {
    backgroundColor: EmergencyColors.gray[50],
    padding: EmergencySpacing.md,
    borderRadius: 8,
  },
  examItem: {
    ...EmergencyTypography.bodyMedium,
    marginBottom: EmergencySpacing.xs,
  },

  // Plan Tab Styles
  timerSection: {
    alignItems: 'center',
    backgroundColor: EmergencyColors.critical.redLight,
    padding: EmergencySpacing.md,
    borderRadius: 8,
    marginBottom: EmergencySpacing.lg,
  },
  timerLabel: {
    ...EmergencyTypography.label,
    marginBottom: EmergencySpacing.sm,
  },
  cycleCounter: {
    ...EmergencyTypography.bodyMedium,
    marginTop: EmergencySpacing.sm,
    fontWeight: '600',
  },
  actionsContainer: {
    marginBottom: EmergencySpacing.lg,
  },
  actionsTitle: {
    ...EmergencyTypography.sectionHeader,
    marginBottom: EmergencySpacing.md,
    fontSize: 16,
  },
  actionButton: {
    marginBottom: EmergencySpacing.sm,
  },
  guidelinesContainer: {
    backgroundColor: EmergencyColors.gray[50],
    padding: EmergencySpacing.md,
    borderRadius: 8,
    marginBottom: EmergencySpacing.lg,
  },
  guidelinesTitle: {
    ...EmergencyTypography.sectionHeader,
    marginBottom: EmergencySpacing.md,
    fontSize: 16,
  },
  cprGuideline: {
    paddingLeft: EmergencySpacing.sm,
  },
  guidelineText: {
    ...EmergencyTypography.bodyMedium,
    marginBottom: EmergencySpacing.xs,
  },
  advancedContainer: {
    marginBottom: EmergencySpacing.lg,
  },
});