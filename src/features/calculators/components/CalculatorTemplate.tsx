import React, { useState, useEffect, ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  EmergencyColors,
  EmergencyStyles,
  EmergencyTypography,
  EmergencySpacing,
  EmergencyComponents,
} from '../../../core/theme/EmergencyDesignSystem';

export enum FieldType {
  Toggle = 'toggle',
  Radio = 'radio',
  Number = 'number',
}

export interface FieldOption {
  label: string;
  value: any;
  description?: string;
}

export interface CalculatorField {
  key: string;
  label: string;
  description?: string;
  type: FieldType;
  options?: FieldOption[];
  defaultValue?: any;
  unit?: string;
  hint?: string;
}

export interface CalculatorTemplateProps {
  title: string;
  description: string;
  formulaText?: string;
  fields?: CalculatorField[];
  parameters?: ReactNode[];
  results?: ReactNode[];
  interpretation?: ReactNode;
  calculateScore?: (values: Record<string, any>) => string;
  interpretScore?: (score: any) => string;
  primaryColor?: string;
  additionalInfo?: {
    notes?: string[];
    reference?: string;
  };
  onBack?: () => void;
}

export function CalculatorTemplate({
  title,
  description,
  formulaText,
  fields,
  parameters,
  results,
  interpretation,
  calculateScore,
  interpretScore,
  primaryColor = EmergencyColors.primary.main,
  additionalInfo,
  onBack,
}: CalculatorTemplateProps) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [score, setScore] = useState<string | null>(null);
  const [interpretationText, setInterpretationText] = useState<string | null>(null);

  // Initialize default values
  useEffect(() => {
    if (fields) {
      const initialValues: Record<string, any> = {};
      fields.forEach((field) => {
        if (field.type === FieldType.Toggle) {
          initialValues[field.key] = false;
        } else if (field.type === FieldType.Radio && field.options) {
          initialValues[field.key] = field.options[0].value;
        } else if (field.type === FieldType.Number) {
          initialValues[field.key] = field.defaultValue || 0;
        }
      });
      setValues(initialValues);
    }
  }, [fields]);

  // Calculate score when values change
  useEffect(() => {
    if (calculateScore) {
      const newScore = calculateScore(values);
      setScore(newScore);
      
      if (interpretScore) {
        setInterpretationText(interpretScore(newScore));
      }
    }
  }, [values, calculateScore, interpretScore]);

  const updateValue = (key: string, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const renderField = (field: CalculatorField) => {
    switch (field.type) {
      case FieldType.Toggle:
        return (
          <View style={styles.fieldCard} key={field.key}>
            <View style={styles.toggleField}>
              <View style={styles.toggleContent}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                {field.description && (
                  <Text style={styles.fieldDescription}>{field.description}</Text>
                )}
              </View>
              <Switch
                value={values[field.key] || false}
                onValueChange={(value) => updateValue(field.key, value)}
                trackColor={{
                  false: EmergencyColors.gray[300],
                  true: primaryColor,
                }}
                thumbColor={EmergencyColors.white}
              />
            </View>
          </View>
        );

      case FieldType.Radio:
        return (
          <View style={styles.fieldCard} key={field.key}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            {field.description && (
              <Text style={styles.fieldDescription}>{field.description}</Text>
            )}
            <View style={styles.radioGroup}>
              {field.options?.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.radioOption}
                  onPress={() => updateValue(field.key, option.value)}
                >
                  <View style={styles.radioButton}>
                    <View
                      style={[
                        styles.radioOuter,
                        values[field.key] === option.value && {
                          borderColor: primaryColor,
                        },
                      ]}
                    >
                      {values[field.key] === option.value && (
                        <View
                          style={[styles.radioInner, { backgroundColor: primaryColor }]}
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.radioContent}>
                    <Text style={styles.radioLabel}>{option.label}</Text>
                    {option.description && (
                      <Text style={styles.radioDescription}>{option.description}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case FieldType.Number:
        return (
          <View style={styles.fieldCard} key={field.key}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            {field.description && (
              <Text style={styles.fieldDescription}>{field.description}</Text>
            )}
            <View style={styles.numberInputContainer}>
              <TextInput
                style={styles.numberInput}
                value={String(values[field.key] || 0)}
                onChangeText={(text) => {
                  const num = parseInt(text) || 0;
                  updateValue(field.key, num);
                }}
                keyboardType="numeric"
                placeholder={field.hint}
              />
              {field.unit && <Text style={styles.unitText}>{field.unit}</Text>}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
      
      {/* Header with score display */}
      <View style={[styles.header, { backgroundColor: primaryColor }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={EmergencyColors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <Text style={styles.headerDescription}>{description}</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score || '--'}</Text>
          {interpretationText && (
            <Text style={styles.interpretation}>{interpretationText}</Text>
          )}
        </View>
      </View>

      {/* Calculator fields */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {fields?.map(renderField)}
          {parameters}
          {results}
          {interpretation && (
            <View style={styles.interpretationSection}>
              {interpretation}
            </View>
          )}
          
          {additionalInfo && (
            <View style={[styles.additionalInfo, { backgroundColor: `${primaryColor}20` }]}>
              <View style={styles.infoHeader}>
                <MaterialIcons name="info" size={24} color={primaryColor} />
                <Text style={[styles.infoTitle, { color: primaryColor }]}>
                  Additional Information
                </Text>
              </View>
              {additionalInfo.notes?.map((note, index) => (
                <Text key={index} style={[styles.infoNote, { color: primaryColor }]}>
                  • {note}
                </Text>
              ))}
              {additionalInfo.reference && (
                <Text style={[styles.reference, { color: primaryColor }]}>
                  Reference: {additionalInfo.reference}
                </Text>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EmergencyColors.background.primary,
  },
  header: {
    padding: EmergencySpacing.md,
    paddingTop: EmergencySpacing.sm,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: EmergencySpacing.xs,
  },
  headerTitle: {
    ...EmergencyTypography.h2,
    color: EmergencyColors.white,
  },
  headerDescription: {
    ...EmergencyTypography.bodyMedium,
    color: EmergencyColors.white,
    opacity: 0.9,
    marginTop: EmergencySpacing.sm,
    textAlign: 'center',
  },
  scoreContainer: {
    backgroundColor: EmergencyColors.white,
    borderRadius: 12,
    padding: EmergencySpacing.md,
    marginTop: EmergencySpacing.md,
    alignItems: 'center',
  },
  scoreLabel: {
    ...EmergencyTypography.bodySmall,
    color: EmergencyColors.gray[600],
  },
  scoreValue: {
    ...EmergencyTypography.emergencyHeading,
    fontSize: 48,
    marginVertical: EmergencySpacing.xs,
  },
  interpretation: {
    ...EmergencyTypography.bodyLarge,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: EmergencySpacing.md,
  },
  fieldCard: {
    backgroundColor: EmergencyColors.white,
    borderRadius: 12,
    padding: EmergencySpacing.md,
    marginBottom: EmergencySpacing.sm,
    ...EmergencyStyles.cardShadow,
  },
  fieldLabel: {
    ...EmergencyTypography.bodyLarge,
    fontWeight: '600',
    marginBottom: EmergencySpacing.xs,
  },
  fieldDescription: {
    ...EmergencyTypography.bodySmall,
    color: EmergencyColors.gray[600],
    marginBottom: EmergencySpacing.sm,
  },
  toggleField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleContent: {
    flex: 1,
    marginRight: EmergencySpacing.md,
  },
  radioGroup: {
    marginTop: EmergencySpacing.sm,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: EmergencySpacing.sm,
  },
  radioButton: {
    marginRight: EmergencySpacing.sm,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: EmergencyColors.gray[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioContent: {
    flex: 1,
  },
  radioLabel: {
    ...EmergencyTypography.bodyMedium,
  },
  radioDescription: {
    ...EmergencyTypography.bodySmall,
    color: EmergencyColors.gray[600],
    marginTop: 2,
  },
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: EmergencySpacing.sm,
  },
  numberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: EmergencyColors.gray[300],
    borderRadius: 8,
    padding: EmergencySpacing.sm,
    ...EmergencyTypography.bodyMedium,
  },
  unitText: {
    ...EmergencyTypography.bodyMedium,
    color: EmergencyColors.gray[600],
    marginLeft: EmergencySpacing.sm,
  },
  interpretationSection: {
    marginTop: EmergencySpacing.md,
  },
  additionalInfo: {
    borderRadius: 12,
    padding: EmergencySpacing.md,
    marginTop: EmergencySpacing.md,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: EmergencySpacing.sm,
  },
  infoTitle: {
    ...EmergencyTypography.bodyLarge,
    fontWeight: '600',
    marginLeft: EmergencySpacing.sm,
  },
  infoNote: {
    ...EmergencyTypography.bodyMedium,
    marginBottom: EmergencySpacing.xs,
  },
  reference: {
    ...EmergencyTypography.bodySmall,
    fontStyle: 'italic',
    marginTop: EmergencySpacing.sm,
  },
});