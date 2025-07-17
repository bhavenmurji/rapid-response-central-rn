/**
 * Emergency Components for Rapid Response Central
 * React Native + TypeScript implementation
 * Optimized for medical emergency environments
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { EmergencyColors, EmergencyTypography, EmergencySpacing, EmergencyComponents, EmergencyUtils } from '../theme/EmergencyDesignSystem';

// Types
interface EmergencyButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface ProtocolCardProps {
  title: string;
  subtitle?: string;
  severity: 'critical' | 'urgent' | 'caution' | 'normal';
  onPress: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  children?: React.ReactNode;
  style?: ViewStyle;
}

interface VitalSignDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
  status: 'critical' | 'urgent' | 'caution' | 'normal';
  trend?: 'up' | 'down' | 'stable';
}

interface EmergencyTimerProps {
  initialTime: number; // in seconds
  isRunning: boolean;
  onTimeUpdate?: (time: number) => void;
  showMilliseconds?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// Critical Emergency Button - Red, highest priority
export const CriticalEmergencyButton: React.FC<EmergencyButtonProps> = ({
  title,
  onPress,
  icon,
  isLoading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.criticalButton,
    fullWidth && styles.fullWidth,
    disabled && styles.disabledButton,
    style,
  ];

  const textStyles = [
    styles.criticalButtonText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint="Critical emergency action"
    >
      <View style={styles.buttonContent}>
        {isLoading ? (
          <ActivityIndicator color={EmergencyColors.white} size="small" />
        ) : (
          <>
            {icon && (
              <MaterialIcons
                name={icon}
                size={20}
                color={EmergencyColors.white}
                style={styles.buttonIcon}
              />
            )}
            <Text style={textStyles}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Urgent Action Button - Orange, high priority
export const UrgentActionButton: React.FC<EmergencyButtonProps> = ({
  title,
  onPress,
  icon,
  isLoading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.urgentButton,
    fullWidth && styles.fullWidth,
    disabled && styles.disabledButton,
    style,
  ];

  const textStyles = [
    styles.urgentButtonText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={styles.buttonContent}>
        {isLoading ? (
          <ActivityIndicator color={EmergencyColors.white} size="small" />
        ) : (
          <>
            {icon && (
              <MaterialIcons
                name={icon}
                size={20}
                color={EmergencyColors.white}
                style={styles.buttonIcon}
              />
            )}
            <Text style={textStyles}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Primary Action Button - Blue, standard priority
export const PrimaryActionButton: React.FC<EmergencyButtonProps> = ({
  title,
  onPress,
  icon,
  isLoading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.primaryButton,
    fullWidth && styles.fullWidth,
    disabled && styles.disabledButton,
    style,
  ];

  const textStyles = [
    styles.primaryButtonText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={styles.buttonContent}>
        {isLoading ? (
          <ActivityIndicator color={EmergencyColors.white} size="small" />
        ) : (
          <>
            {icon && (
              <MaterialIcons
                name={icon}
                size={20}
                color={EmergencyColors.white}
                style={styles.buttonIcon}
              />
            )}
            <Text style={textStyles}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Emergency Protocol Card
export const EmergencyProtocolCard: React.FC<ProtocolCardProps> = ({
  title,
  subtitle,
  severity,
  onPress,
  icon,
  children,
  style,
}) => {
  const getSeverityStyles = () => {
    switch (severity) {
      case 'critical':
        return {
          backgroundColor: EmergencyColors.critical.redLight,
          borderLeftColor: EmergencyColors.critical.red,
        };
      case 'urgent':
        return {
          backgroundColor: EmergencyColors.urgent.orangeLight,
          borderLeftColor: EmergencyColors.urgent.orange,
        };
      case 'caution':
        return {
          backgroundColor: EmergencyColors.caution.yellowLight,
          borderLeftColor: EmergencyColors.caution.yellow,
        };
      case 'normal':
        return {
          backgroundColor: EmergencyColors.normal.greenLight,
          borderLeftColor: EmergencyColors.normal.green,
        };
      default:
        return {
          backgroundColor: EmergencyColors.white,
          borderLeftColor: EmergencyColors.gray[300],
        };
    }
  };

  const severityStyles = getSeverityStyles();
  const cardStyle = [
    styles.protocolCard,
    severityStyles,
    style,
  ];

  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={onPress}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`${title} protocol`}
    >
      <View style={styles.cardHeader}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={24}
            color={severityStyles.borderLeftColor}
            style={styles.cardIcon}
          />
        )}
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
        </View>
        <MaterialIcons
          name="chevron-right"
          size={20}
          color={EmergencyColors.gray[400]}
        />
      </View>
      {children && <View style={styles.cardContent}>{children}</View>}
    </TouchableOpacity>
  );
};

// Vital Sign Display Component
export const VitalSignDisplay: React.FC<VitalSignDisplayProps> = ({
  label,
  value,
  unit,
  status,
  trend,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical':
        return EmergencyColors.critical.red;
      case 'urgent':
        return EmergencyColors.urgent.orange;
      case 'caution':
        return EmergencyColors.caution.yellow;
      case 'normal':
        return EmergencyColors.normal.green;
      default:
        return EmergencyColors.gray[500];
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      case 'stable':
        return 'trending-flat';
      default:
        return null;
    }
  };

  const statusColor = getStatusColor();
  const trendIcon = getTrendIcon();

  return (
    <View style={styles.vitalSignContainer}>
      <View style={styles.vitalSignHeader}>
        <Text style={styles.vitalSignLabel}>{label}</Text>
        {trendIcon && (
          <MaterialIcons
            name={trendIcon}
            size={16}
            color={statusColor}
          />
        )}
      </View>
      <View style={styles.vitalSignValueContainer}>
        <Text style={[styles.vitalSignValue, { color: statusColor }]}>
          {value}
        </Text>
        {unit && (
          <Text style={[styles.vitalSignUnit, { color: statusColor }]}>
            {unit}
          </Text>
        )}
      </View>
    </View>
  );
};

// Emergency Timer Component
export const EmergencyTimer: React.FC<EmergencyTimerProps> = ({
  initialTime,
  isRunning,
  onTimeUpdate,
  showMilliseconds = false,
  size = 'medium',
}) => {
  const [time, setTime] = React.useState(initialTime);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + (showMilliseconds ? 10 : 1000);
          onTimeUpdate?.(newTime);
          return newTime;
        });
      }, showMilliseconds ? 10 : 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, showMilliseconds, onTimeUpdate]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    if (showMilliseconds) {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTimerStyles = () => {
    switch (size) {
      case 'small':
        return styles.timerSmall;
      case 'large':
        return styles.timerLarge;
      default:
        return styles.timerMedium;
    }
  };

  return (
    <View style={[styles.timerContainer, getTimerStyles()]}>
      <Text style={[styles.timerText, getTimerStyles()]}>
        {formatTime(time)}
      </Text>
    </View>
  );
};

// Tab System for Protocols (Causes, History, Exam, Plan)
interface ProtocolTabSystemProps {
  tabs: Array<{ key: string; title: string; icon?: keyof typeof MaterialIcons.glyphMap }>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

export const ProtocolTabSystem: React.FC<ProtocolTabSystemProps> = ({
  tabs,
  activeTab,
  onTabChange,
  children,
}) => {
  return (
    <View style={styles.tabSystemContainer}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.activeTab,
            ]}
            onPress={() => onTabChange(tab.key)}
            accessibilityRole="tab"
            accessibilityLabel={tab.title}
          >
            {tab.icon && (
              <MaterialIcons
                name={tab.icon}
                size={20}
                color={
                  activeTab === tab.key
                    ? EmergencyColors.primary
                    : EmergencyColors.gray[500]
                }
                style={styles.tabIcon}
              />
            )}
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.tabContent}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Button Styles
  criticalButton: {
    ...EmergencyComponents.buttons.critical,
    ...EmergencyUtils.platformStyle(
      { shadowColor: EmergencyColors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
      { elevation: 4 }
    ),
  },
  urgentButton: {
    ...EmergencyComponents.buttons.urgent,
    ...EmergencyUtils.platformStyle(
      { shadowColor: EmergencyColors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
      { elevation: 4 }
    ),
  },
  primaryButton: {
    ...EmergencyComponents.buttons.primary,
    ...EmergencyUtils.platformStyle(
      { shadowColor: EmergencyColors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
      { elevation: 4 }
    ),
  },
  disabledButton: {
    opacity: 0.6,
  },
  fullWidth: {
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: EmergencySpacing.sm,
  },
  criticalButtonText: {
    ...EmergencyTypography.label,
    color: EmergencyColors.white,
    fontWeight: '700',
  },
  urgentButtonText: {
    ...EmergencyTypography.label,
    color: EmergencyColors.white,
    fontWeight: '600',
  },
  primaryButtonText: {
    ...EmergencyTypography.label,
    color: EmergencyColors.white,
    fontWeight: '600',
  },

  // Card Styles
  protocolCard: {
    backgroundColor: EmergencyColors.white,
    borderRadius: 12,
    padding: EmergencySpacing.md,
    marginVertical: EmergencySpacing.sm,
    borderLeftWidth: 4,
    ...EmergencyUtils.platformStyle(
      { shadowColor: EmergencyColors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      { elevation: 2 }
    ),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: EmergencySpacing.sm,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    ...EmergencyTypography.protocolTitle,
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    ...EmergencyTypography.bodyMedium,
    color: EmergencyColors.gray[600],
    marginTop: 2,
  },
  cardContent: {
    marginTop: EmergencySpacing.sm,
  },

  // Vital Sign Styles
  vitalSignContainer: {
    backgroundColor: EmergencyColors.white,
    borderRadius: 8,
    padding: EmergencySpacing.sm,
    margin: EmergencySpacing.xs,
    minWidth: 80,
    ...EmergencyUtils.platformStyle(
      { shadowColor: EmergencyColors.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
      { elevation: 1 }
    ),
  },
  vitalSignHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vitalSignLabel: {
    ...EmergencyTypography.caption,
    fontSize: 10,
    fontWeight: '500',
  },
  vitalSignValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  vitalSignValue: {
    ...EmergencyTypography.bodyLarge,
    fontWeight: '700',
    fontSize: 18,
  },
  vitalSignUnit: {
    ...EmergencyTypography.caption,
    marginLeft: 2,
    fontSize: 10,
  },

  // Timer Styles
  timerContainer: {
    backgroundColor: EmergencyColors.gray[900],
    borderRadius: 8,
    paddingHorizontal: EmergencySpacing.md,
    paddingVertical: EmergencySpacing.sm,
    alignItems: 'center',
  },
  timerText: {
    color: EmergencyColors.white,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  timerSmall: {
    fontSize: 14,
  },
  timerMedium: {
    fontSize: 18,
  },
  timerLarge: {
    fontSize: 24,
  },

  // Tab System Styles
  tabSystemContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: EmergencyColors.white,
    borderBottomWidth: 1,
    borderBottomColor: EmergencyColors.gray[200],
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: EmergencySpacing.md,
    paddingHorizontal: EmergencySpacing.sm,
    minHeight: EmergencySpacing.touchTarget,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: EmergencyColors.primary,
  },
  tabIcon: {
    marginRight: EmergencySpacing.xs,
  },
  tabText: {
    ...EmergencyTypography.label,
    fontSize: 12,
    color: EmergencyColors.gray[500],
  },
  activeTabText: {
    color: EmergencyColors.primary,
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    backgroundColor: EmergencyColors.background,
  },
});

export default {
  CriticalEmergencyButton,
  UrgentActionButton,
  PrimaryActionButton,
  EmergencyProtocolCard,
  VitalSignDisplay,
  EmergencyTimer,
  ProtocolTabSystem,
};