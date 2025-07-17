import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  CalculatorTemplate,
  CalculatorField,
  FieldType,
} from '../components/CalculatorTemplate';
import {
  EmergencyColors,
  EmergencyStyles,
  EmergencyTypography,
  EmergencySpacing,
} from '../../../core/theme/EmergencyDesignSystem';

const criteriaDetails = {
  dvt_symptoms: {
    title: 'Clinical signs and symptoms of DVT',
    subtitle: 'Leg swelling, pain with palpation',
    points: 3.0,
  },
  pe_likely: {
    title: 'PE is #1 diagnosis or equally likely',
    subtitle: 'Based on clinical judgment',
    points: 3.0,
  },
  hr_over_100: {
    title: 'Heart rate > 100 bpm',
    subtitle: 'Tachycardia',
    points: 1.5,
  },
  immobilization: {
    title: 'Immobilization ≥3 days or surgery in past 4 weeks',
    subtitle: 'Bedrest or recent surgery',
    points: 1.5,
  },
  previous_pe_dvt: {
    title: 'Previous PE or DVT',
    subtitle: 'Prior history',
    points: 1.5,
  },
  hemoptysis: {
    title: 'Hemoptysis',
    subtitle: 'Coughing up blood',
    points: 1.0,
  },
  malignancy: {
    title: 'Malignancy',
    subtitle: 'Treatment within 6 months or palliative',
    points: 1.0,
  },
};

export default function WellsScoreScreen() {
  const navigation = useNavigation();

  const fields: CalculatorField[] = Object.entries(criteriaDetails).map(([key, details]) => ({
    key,
    label: details.title,
    description: details.subtitle,
    type: FieldType.Toggle,
  }));

  const calculateScore = (values: Record<string, any>) => {
    let score = 0;
    Object.entries(values).forEach(([key, value]) => {
      if (value && criteriaDetails[key as keyof typeof criteriaDetails]) {
        score += criteriaDetails[key as keyof typeof criteriaDetails].points;
      }
    });
    
    // Format score to show decimal only if needed
    return score === Math.floor(score) ? score.toString() : score.toFixed(1);
  };

  const interpretScore = (score: any) => {
    const numScore = parseFloat(score);
    if (numScore <= 1.5) return 'Low Risk';
    if (numScore <= 6.0) return 'Moderate Risk';
    return 'High Risk';
  };

  const getManagement = (score: string) => {
    const numScore = parseFloat(score);
    if (numScore <= 1.5) {
      return {
        risk: '1.3%',
        recommendation: 'Consider PERC rule. If negative, no further testing needed.',
        alternative: 'If PERC positive or not applicable, consider D-dimer',
        imaging: 'CTPA only if D-dimer positive',
      };
    } else if (numScore <= 6.0) {
      return {
        risk: '16.2%',
        recommendation: 'Order D-dimer',
        alternative: 'If D-dimer positive, proceed to CTPA',
        imaging: 'CTPA if D-dimer positive',
      };
    } else {
      return {
        risk: '40.6%',
        recommendation: 'Proceed directly to CTPA',
        alternative: 'Consider empiric anticoagulation if imaging delayed',
        imaging: 'CTPA recommended without D-dimer',
      };
    }
  };

  const getRiskColor = (score: string) => {
    const numScore = parseFloat(score);
    if (numScore <= 1.5) return EmergencyColors.success.main;
    if (numScore <= 6.0) return EmergencyColors.caution.yellow;
    return EmergencyColors.danger.red;
  };

  const renderRiskStratification = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name="analytics" size={24} color={EmergencyColors.caution.yellow} />
        <Text style={styles.sectionTitle}>Risk Stratification</Text>
      </View>
      <View style={styles.riskRow}>
        <View style={[styles.riskIndicator, { backgroundColor: EmergencyColors.success.main }]} />
        <Text style={styles.riskLabel}>Low Risk</Text>
        <Text style={styles.riskRange}>≤1.5 points</Text>
        <View style={[styles.riskBadge, { backgroundColor: `${EmergencyColors.success.main}20` }]}>
          <Text style={[styles.riskPercent, { color: EmergencyColors.success.main }]}>1.3%</Text>
        </View>
      </View>
      <View style={styles.riskRow}>
        <View style={[styles.riskIndicator, { backgroundColor: EmergencyColors.caution.yellow }]} />
        <Text style={styles.riskLabel}>Moderate Risk</Text>
        <Text style={styles.riskRange}>2-6 points</Text>
        <View style={[styles.riskBadge, { backgroundColor: `${EmergencyColors.caution.yellow}20` }]}>
          <Text style={[styles.riskPercent, { color: EmergencyColors.caution.yellow }]}>16.2%</Text>
        </View>
      </View>
      <View style={styles.riskRow}>
        <View style={[styles.riskIndicator, { backgroundColor: EmergencyColors.danger.red }]} />
        <Text style={styles.riskLabel}>High Risk</Text>
        <Text style={styles.riskRange}>>6 points</Text>
        <View style={[styles.riskBadge, { backgroundColor: `${EmergencyColors.danger.red}20` }]}>
          <Text style={[styles.riskPercent, { color: EmergencyColors.danger.red }]}>40.6%</Text>
        </View>
      </View>
    </View>
  );

  const renderPERCRule = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name="rule" size={24} color={EmergencyColors.info.blue} />
        <Text style={styles.sectionTitle}>PERC Rule (For Low Risk)</Text>
      </View>
      <Text style={styles.percDescription}>
        If Wells' ≤1.5, patient can be ruled out if ALL are negative:
      </Text>
      <View style={styles.percCriteria}>
        {[
          'Age <50',
          'HR <100',
          'SaO2 >94%',
          'No hemoptysis',
          'No estrogen use',
          'No prior PE/DVT',
          'No unilateral leg swelling',
          'No surgery/trauma in 4 weeks',
        ].map((criterion) => (
          <View key={criterion} style={styles.percChip}>
            <Text style={styles.percChipText}>{criterion}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderClinicalNotes = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name="info-outline" size={24} color={EmergencyColors.primary.main} />
        <Text style={styles.sectionTitle}>Clinical Notes</Text>
      </View>
      
      <View style={styles.noteSection}>
        <Text style={[styles.noteTitle, { color: EmergencyColors.primary.main }]}>
          Three-Tier Model
        </Text>
        {[
          'Low risk (≤1.5): 1.3% prevalence',
          'Moderate risk (2-6): 16.2% prevalence',
          'High risk (>6): 40.6% prevalence',
        ].map((note) => (
          <Text key={note} style={styles.noteItem}>• {note}</Text>
        ))}
      </View>

      <View style={styles.noteSection}>
        <Text style={[styles.noteTitle, { color: EmergencyColors.info.blue }]}>
          Alternative Two-Tier Model
        </Text>
        {[
          'PE Unlikely (≤4): Use D-dimer',
          'PE Likely (>4): Proceed to imaging',
        ].map((note) => (
          <Text key={note} style={styles.noteItem}>• {note}</Text>
        ))}
      </View>

      <View style={styles.noteSection}>
        <Text style={[styles.noteTitle, { color: EmergencyColors.caution.yellow }]}>
          Important Considerations
        </Text>
        {[
          'Not for use if already anticoagulated',
          'Clinical judgment always paramount',
          'Consider age-adjusted D-dimer if used',
          'Pregnancy requires different approach',
        ].map((note) => (
          <Text key={note} style={styles.noteItem}>• {note}</Text>
        ))}
      </View>
    </View>
  );

  return (
    <CalculatorTemplate
      title="Wells' Criteria for PE"
      description="Predicts probability of pulmonary embolism"
      fields={fields}
      calculateScore={calculateScore}
      interpretScore={interpretScore}
      primaryColor={EmergencyColors.info.blue}
      results={[
        renderRiskStratification(),
        renderPERCRule(),
        renderClinicalNotes(),
      ]}
      additionalInfo={{
        notes: [
          'Validated in multiple studies',
          'Should be used with clinical judgment',
          'Not applicable to pregnant patients',
        ],
        reference: 'Wells PS, et al. Thromb Haemost. 2000',
      }}
      onBack={() => navigation.goBack()}
    />
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: EmergencyColors.white,
    borderRadius: 12,
    padding: EmergencySpacing.md,
    marginBottom: EmergencySpacing.md,
    ...EmergencyStyles.cardShadow,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: EmergencySpacing.md,
  },
  sectionTitle: {
    ...EmergencyTypography.bodyLarge,
    fontWeight: '600',
    marginLeft: EmergencySpacing.sm,
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: EmergencySpacing.sm,
  },
  riskIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: EmergencySpacing.sm,
  },
  riskLabel: {
    ...EmergencyTypography.bodyMedium,
    flex: 1,
    fontWeight: '600',
  },
  riskRange: {
    ...EmergencyTypography.bodySmall,
    color: EmergencyColors.gray[600],
    marginRight: EmergencySpacing.sm,
  },
  riskBadge: {
    paddingHorizontal: EmergencySpacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  riskPercent: {
    ...EmergencyTypography.bodySmall,
    fontWeight: '700',
  },
  percDescription: {
    ...EmergencyTypography.bodyMedium,
    color: EmergencyColors.gray[700],
    marginBottom: EmergencySpacing.sm,
  },
  percCriteria: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: EmergencySpacing.sm,
  },
  percChip: {
    backgroundColor: `${EmergencyColors.info.blue}20`,
    paddingHorizontal: EmergencySpacing.sm,
    paddingVertical: EmergencySpacing.xs,
    borderRadius: 16,
    margin: 4,
  },
  percChipText: {
    ...EmergencyTypography.bodySmall,
    color: EmergencyColors.info.blue,
  },
  noteSection: {
    marginBottom: EmergencySpacing.md,
  },
  noteTitle: {
    ...EmergencyTypography.bodyMedium,
    fontWeight: '700',
    marginBottom: EmergencySpacing.xs,
  },
  noteItem: {
    ...EmergencyTypography.bodySmall,
    color: EmergencyColors.gray[700],
    marginLeft: EmergencySpacing.sm,
    marginBottom: 4,
  },
});