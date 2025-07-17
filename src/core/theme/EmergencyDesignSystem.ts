/**
 * Emergency Design System for Rapid Response Central
 * Optimized for high-stress medical environments
 * Converted from Flutter to React Native + TypeScript
 */

import { Platform, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Color System - Medical Emergency Standards
export const EmergencyColors = {
  // Primary Emergency Colors (Medical Standard)
  critical: {
    red: '#DC2626',        // Critical/Life-threatening
    redDark: '#B91C1C',    // Critical dark variant
    redLight: '#FEE2E2',   // Critical light background
  },
  urgent: {
    orange: '#EA580C',     // Urgent/High priority
    orangeDark: '#C2410C', // Urgent dark variant
    orangeLight: '#FED7AA', // Urgent light background
  },
  caution: {
    yellow: '#D97706',     // Caution/Monitoring required
    yellowDark: '#B45309', // Caution dark variant
    yellowLight: '#FEF3C7', // Caution light background
  },
  normal: {
    green: '#059669',      // Normal/Stable
    greenDark: '#047857',  // Normal dark variant
    greenLight: '#D1FAE5', // Normal light background
  },

  // UI Colors
  primary: '#0369A1',      // Primary brand color
  primaryDark: '#075985',  // Primary dark variant
  primaryLight: '#E0F2FE', // Primary light background
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Background Colors
  background: '#FFFFFF',
  surface: '#F9FAFB',
  card: '#FFFFFF',
} as const;

// Typography - Emergency Optimized
export const EmergencyTypography = {
  // Emergency Headings - Bold, high contrast
  emergencyHeading: {
    fontSize: 24,
    fontWeight: '800' as const,
    lineHeight: 28.8,
    letterSpacing: -0.5,
    color: EmergencyColors.black,
  },
  
  protocolTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 24,
    letterSpacing: -0.3,
    color: EmergencyColors.black,
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 21.6,
    letterSpacing: -0.2,
    color: EmergencyColors.gray[700],
  },

  // Body Text - Hospital lighting optimized
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    color: EmergencyColors.gray[800],
  },

  bodyMedium: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    color: EmergencyColors.gray[700],
  },

  bodySmall: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    color: EmergencyColors.gray[600],
  },

  // Labels and Captions
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 16.8,
    letterSpacing: 0.1,
    color: EmergencyColors.gray[700],
  },

  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 14.4,
    letterSpacing: 0.4,
    color: EmergencyColors.gray[500],
  },

  // Emergency Text Variants
  criticalText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: EmergencyColors.critical.red,
  },

  urgentText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: EmergencyColors.urgent.orange,
  },

  cautionText: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: EmergencyColors.caution.yellow,
  },
} as const;

// Spacing System - 8pt Grid
export const EmergencySpacing = {
  xs: 4,   // 0.25rem
  sm: 8,   // 0.5rem
  md: 16,  // 1rem
  lg: 24,  // 1.5rem
  xl: 32,  // 2rem
  xxl: 48, // 3rem
  xxxl: 64, // 4rem

  // Touch targets for gloved hands
  touchTarget: 44, // Minimum 44px for medical gloves
  touchTargetLarge: 56, // Large touch targets for critical actions
} as const;

// Border Radius
export const EmergencyBorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// Shadows - Emergency visibility
export const EmergencyShadows = {
  small: {
    shadowColor: EmergencyColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: EmergencyColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: EmergencyColors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// Component Specifications
export const EmergencyComponents = {
  // Button Specifications
  buttons: {
    critical: {
      backgroundColor: EmergencyColors.critical.red,
      borderColor: EmergencyColors.critical.redDark,
      textColor: EmergencyColors.white,
      minHeight: EmergencySpacing.touchTarget,
      borderRadius: EmergencyBorderRadius.md,
      paddingHorizontal: EmergencySpacing.lg,
      paddingVertical: EmergencySpacing.sm,
    },
    urgent: {
      backgroundColor: EmergencyColors.urgent.orange,
      borderColor: EmergencyColors.urgent.orangeDark,
      textColor: EmergencyColors.white,
      minHeight: EmergencySpacing.touchTarget,
      borderRadius: EmergencyBorderRadius.md,
      paddingHorizontal: EmergencySpacing.lg,
      paddingVertical: EmergencySpacing.sm,
    },
    primary: {
      backgroundColor: EmergencyColors.primary,
      borderColor: EmergencyColors.primaryDark,
      textColor: EmergencyColors.white,
      minHeight: EmergencySpacing.touchTarget,
      borderRadius: EmergencyBorderRadius.md,
      paddingHorizontal: EmergencySpacing.lg,
      paddingVertical: EmergencySpacing.sm,
    },
    secondary: {
      backgroundColor: EmergencyColors.white,
      borderColor: EmergencyColors.gray[300],
      textColor: EmergencyColors.gray[700],
      minHeight: EmergencySpacing.touchTarget,
      borderRadius: EmergencyBorderRadius.md,
      paddingHorizontal: EmergencySpacing.lg,
      paddingVertical: EmergencySpacing.sm,
      borderWidth: 1,
    },
  },

  // Card Specifications
  cards: {
    protocol: {
      backgroundColor: EmergencyColors.white,
      borderRadius: EmergencyBorderRadius.lg,
      padding: EmergencySpacing.md,
      margin: EmergencySpacing.sm,
      ...EmergencyShadows.medium,
    },
    critical: {
      backgroundColor: EmergencyColors.critical.redLight,
      borderLeftWidth: 4,
      borderLeftColor: EmergencyColors.critical.red,
      borderRadius: EmergencyBorderRadius.md,
      padding: EmergencySpacing.md,
    },
    urgent: {
      backgroundColor: EmergencyColors.urgent.orangeLight,
      borderLeftWidth: 4,
      borderLeftColor: EmergencyColors.urgent.orange,
      borderRadius: EmergencyBorderRadius.md,
      padding: EmergencySpacing.md,
    },
  },

  // Input Specifications
  inputs: {
    default: {
      borderWidth: 1,
      borderColor: EmergencyColors.gray[300],
      borderRadius: EmergencyBorderRadius.md,
      paddingHorizontal: EmergencySpacing.md,
      paddingVertical: EmergencySpacing.sm,
      minHeight: EmergencySpacing.touchTarget,
      backgroundColor: EmergencyColors.white,
    },
    focused: {
      borderColor: EmergencyColors.primary,
      borderWidth: 2,
    },
    error: {
      borderColor: EmergencyColors.error,
      borderWidth: 2,
    },
  },
} as const;

// Responsive Breakpoints
export const EmergencyBreakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
} as const;

// Device-specific utilities
export const EmergencyUtils = {
  isTablet: screenWidth >= EmergencyBreakpoints.tablet,
  isDesktop: screenWidth >= EmergencyBreakpoints.desktop,
  screenWidth,
  screenHeight,
  
  // Platform-specific styling
  platformStyle: (ios: any, android: any, web?: any) => {
    if (Platform.OS === 'ios') return ios;
    if (Platform.OS === 'android') return android;
    if (Platform.OS === 'web' && web) return web;
    return android; // Default to Android
  },

  // Responsive sizing
  responsiveSize: (mobile: number, tablet?: number, desktop?: number) => {
    if (EmergencyUtils.isDesktop && desktop) return desktop;
    if (EmergencyUtils.isTablet && tablet) return tablet;
    return mobile;
  },

  // Accessibility helpers
  accessibilityMinimumSize: (size: number) => Math.max(size, EmergencySpacing.touchTarget),
} as const;

// Common Styles
export const EmergencyStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: EmergencyColors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },

  // Emergency Button Styles
  criticalButton: {
    ...EmergencyComponents.buttons.critical,
  },
  urgentButton: {
    ...EmergencyComponents.buttons.urgent,
  },
  primaryButton: {
    ...EmergencyComponents.buttons.primary,
  },
  secondaryButton: {
    ...EmergencyComponents.buttons.secondary,
  },

  // Card Styles
  protocolCard: {
    ...EmergencyComponents.cards.protocol,
  },
  criticalCard: {
    ...EmergencyComponents.cards.critical,
  },
  urgentCard: {
    ...EmergencyComponents.cards.urgent,
  },

  // Typography Styles
  emergencyHeading: {
    ...EmergencyTypography.emergencyHeading,
  },
  protocolTitle: {
    ...EmergencyTypography.protocolTitle,
  },
  sectionHeader: {
    ...EmergencyTypography.sectionHeader,
  },
  bodyLarge: {
    ...EmergencyTypography.bodyLarge,
  },
  bodyMedium: {
    ...EmergencyTypography.bodyMedium,
  },

  // Utility Styles
  shadowSmall: {
    ...EmergencyShadows.small,
  },
  shadowMedium: {
    ...EmergencyShadows.medium,
  },
  shadowLarge: {
    ...EmergencyShadows.large,
  },
});

export default {
  Colors: EmergencyColors,
  Typography: EmergencyTypography,
  Spacing: EmergencySpacing,
  BorderRadius: EmergencyBorderRadius,
  Shadows: EmergencyShadows,
  Components: EmergencyComponents,
  Breakpoints: EmergencyBreakpoints,
  Utils: EmergencyUtils,
  Styles: EmergencyStyles,
};