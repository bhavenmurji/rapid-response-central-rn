import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { EmergencyColors, EmergencyStyles, EmergencyTypography, EmergencySpacing, EmergencyComponents } from '../../../core/theme/EmergencyDesignSystem';

interface Calculator {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  color: string;
  route: string;
  isAvailable: boolean;
}

const calculators: Calculator[] = [
  {
    id: 'wells-pe',
    title: "Wells' Criteria for PE",
    subtitle: 'Predicts probability of pulmonary embolism',
    category: 'Pulmonary',
    icon: 'air',
    color: EmergencyColors.info.blue,
    route: 'WellsScore',
    isAvailable: true,
  },
  {
    id: 'mdrd-gfr',
    title: 'MDRD GFR',
    subtitle: 'Estimates glomerular filtration rate',
    category: 'Renal',
    icon: 'filter-list',
    color: EmergencyColors.success.main,
    route: 'MDRDGFR',
    isAvailable: false,
  },
  {
    id: 'psi-port',
    title: 'PSI/PORT Score',
    subtitle: 'Pneumonia severity index',
    category: 'Respiratory',
    icon: 'healing',
    color: EmergencyColors.caution.yellow,
    route: 'PSIPort',
    isAvailable: false,
  },
  {
    id: 'abcd2',
    title: 'ABCD2 Score',
    subtitle: 'Stroke risk after TIA',
    category: 'Neurological',
    icon: 'psychology',
    color: EmergencyColors.danger.red,
    route: 'ABCD2',
    isAvailable: false,
  },
  {
    id: 'chads2vasc',
    title: 'CHA₂DS₂-VASc',
    subtitle: 'Stroke risk in atrial fibrillation',
    category: 'Cardiac',
    icon: 'favorite',
    color: EmergencyColors.danger.red,
    route: 'CHADS2VASc',
    isAvailable: false,
  },
  {
    id: 'hasbled',
    title: 'HAS-BLED',
    subtitle: 'Bleeding risk on anticoagulation',
    category: 'Hematology',
    icon: 'water-drop',
    color: EmergencyColors.danger.red,
    route: 'HASBLED',
    isAvailable: false,
  },
];

export default function CalcScreen() {
  const navigation = useNavigation<any>();

  const handleCalculatorPress = (calculator: Calculator) => {
    if (calculator.isAvailable) {
      navigation.navigate(calculator.route);
    }
  };

  const groupedCalculators = calculators.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {} as Record<string, Calculator[]>);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={EmergencyColors.caution.yellow} />
      <View style={styles.header}>
        <MaterialIcons name="calculate" size={32} color={EmergencyColors.white} />
        <Text style={styles.headerTitle}>Medical Calculators</Text>
        <Text style={styles.headerSubtitle}>Clinical decision support tools</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(groupedCalculators).map(([category, calcs]) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {calcs.map((calc) => (
              <TouchableOpacity
                key={calc.id}
                style={[
                  styles.calculatorCard,
                  !calc.isAvailable && styles.calculatorCardDisabled,
                ]}
                onPress={() => handleCalculatorPress(calc)}
                disabled={!calc.isAvailable}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${calc.color}20` }]}>
                  <MaterialIcons name={calc.icon as any} size={24} color={calc.color} />
                </View>
                <View style={styles.calculatorInfo}>
                  <Text style={[
                    styles.calculatorTitle,
                    !calc.isAvailable && styles.calculatorTitleDisabled,
                  ]}>
                    {calc.title}
                  </Text>
                  <Text style={[
                    styles.calculatorSubtitle,
                    !calc.isAvailable && styles.calculatorSubtitleDisabled,
                  ]}>
                    {calc.subtitle}
                  </Text>
                </View>
                {calc.isAvailable ? (
                  <MaterialIcons name="chevron-right" size={24} color={EmergencyColors.gray[400]} />
                ) : (
                  <View style={styles.comingSoonBadge}>
                    <Text style={styles.comingSoonText}>Coming Soon</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { ...EmergencyStyles.container },
  header: { backgroundColor: EmergencyColors.caution.yellow, padding: EmergencySpacing.md, alignItems: 'center' },
  headerTitle: { ...EmergencyTypography.emergencyHeading, color: EmergencyColors.white, marginTop: EmergencySpacing.sm },
  headerSubtitle: { ...EmergencyTypography.bodyMedium, color: EmergencyColors.white, opacity: 0.9 },
  content: { flex: 1, padding: EmergencySpacing.md },
  categorySection: {
    marginBottom: EmergencySpacing.lg,
  },
  categoryTitle: {
    ...EmergencyTypography.h3,
    color: EmergencyColors.gray[800],
    marginBottom: EmergencySpacing.sm,
  },
  calculatorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: EmergencyColors.white,
    borderRadius: 12,
    padding: EmergencySpacing.md,
    marginBottom: EmergencySpacing.sm,
    ...EmergencyStyles.cardShadow,
  },
  calculatorCardDisabled: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: EmergencySpacing.md,
  },
  calculatorInfo: {
    flex: 1,
  },
  calculatorTitle: {
    ...EmergencyTypography.bodyLarge,
    fontWeight: '600',
    color: EmergencyColors.gray[900],
    marginBottom: 4,
  },
  calculatorTitleDisabled: {
    color: EmergencyColors.gray[500],
  },
  calculatorSubtitle: {
    ...EmergencyTypography.bodySmall,
    color: EmergencyColors.gray[600],
  },
  calculatorSubtitleDisabled: {
    color: EmergencyColors.gray[400],
  },
  comingSoonBadge: {
    backgroundColor: EmergencyColors.gray[200],
    paddingHorizontal: EmergencySpacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  comingSoonText: {
    ...EmergencyTypography.bodySmall,
    color: EmergencyColors.gray[600],
    fontSize: 10,
  },
});