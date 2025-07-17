/**
 * Settings State Slice
 * Manages user preferences, theme settings, and app configuration
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationSettings {
  enabled: boolean;
  criticalAlerts: boolean;
  codeAlerts: boolean;
  labAlerts: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export interface DisplaySettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  reducedMotion: boolean;
}

export interface TimerSettings {
  cprInterval: number; // in seconds (default: 120 for 2 minutes)
  medicationInterval: number; // in seconds (default: 180 for 3 minutes)
  autoStartTimers: boolean;
  showMilliseconds: boolean;
  alertBeforeInterval: number; // seconds before interval ends
}

export interface UserProfile {
  name: string;
  role: 'physician' | 'nurse' | 'resident' | 'student' | 'other';
  department: string;
  badgeId?: string;
  certifications: string[];
}

interface SettingsState {
  userProfile: UserProfile | null;
  notifications: NotificationSettings;
  display: DisplaySettings;
  timers: TimerSettings;
  quickAccess: string[]; // Protocol IDs for quick access
  recentProtocols: Array<{
    id: string;
    timestamp: number;
  }>;
  onboardingCompleted: boolean;
  appVersion: string;
  lastSync: number | null;
}

const initialState: SettingsState = {
  userProfile: null,
  notifications: {
    enabled: true,
    criticalAlerts: true,
    codeAlerts: true,
    labAlerts: true,
    soundEnabled: true,
    vibrationEnabled: true,
  },
  display: {
    theme: 'system',
    fontSize: 'medium',
    highContrast: false,
    colorBlindMode: 'none',
    reducedMotion: false,
  },
  timers: {
    cprInterval: 120,
    medicationInterval: 180,
    autoStartTimers: true,
    showMilliseconds: false,
    alertBeforeInterval: 10,
  },
  quickAccess: ['code_blue', 'code_stroke', 'rapid_response'],
  recentProtocols: [],
  onboardingCompleted: false,
  appVersion: '1.0.0',
  lastSync: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // User Profile
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
    
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.userProfile) {
        state.userProfile = { ...state.userProfile, ...action.payload };
      }
    },
    
    clearUserProfile: (state) => {
      state.userProfile = null;
    },
    
    // Notifications
    updateNotificationSettings: (state, action: PayloadAction<Partial<NotificationSettings>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    
    // Display
    updateDisplaySettings: (state, action: PayloadAction<Partial<DisplaySettings>>) => {
      state.display = { ...state.display, ...action.payload };
    },
    
    setTheme: (state, action: PayloadAction<DisplaySettings['theme']>) => {
      state.display.theme = action.payload;
    },
    
    setFontSize: (state, action: PayloadAction<DisplaySettings['fontSize']>) => {
      state.display.fontSize = action.payload;
    },
    
    // Timers
    updateTimerSettings: (state, action: PayloadAction<Partial<TimerSettings>>) => {
      state.timers = { ...state.timers, ...action.payload };
    },
    
    // Quick Access
    addQuickAccess: (state, action: PayloadAction<string>) => {
      if (!state.quickAccess.includes(action.payload)) {
        state.quickAccess.push(action.payload);
      }
    },
    
    removeQuickAccess: (state, action: PayloadAction<string>) => {
      state.quickAccess = state.quickAccess.filter(id => id !== action.payload);
    },
    
    reorderQuickAccess: (state, action: PayloadAction<string[]>) => {
      state.quickAccess = action.payload;
    },
    
    // Recent Protocols
    addRecentProtocol: (state, action: PayloadAction<string>) => {
      // Remove if already exists
      state.recentProtocols = state.recentProtocols.filter(p => p.id !== action.payload);
      
      // Add to beginning
      state.recentProtocols.unshift({
        id: action.payload,
        timestamp: Date.now(),
      });
      
      // Keep only last 10
      state.recentProtocols = state.recentProtocols.slice(0, 10);
    },
    
    clearRecentProtocols: (state) => {
      state.recentProtocols = [];
    },
    
    // Onboarding
    completeOnboarding: (state) => {
      state.onboardingCompleted = true;
    },
    
    // Sync
    updateLastSync: (state) => {
      state.lastSync = Date.now();
    },
    
    // Reset
    resetSettings: () => initialState,
  },
});

export const {
  setUserProfile,
  updateUserProfile,
  clearUserProfile,
  updateNotificationSettings,
  updateDisplaySettings,
  setTheme,
  setFontSize,
  updateTimerSettings,
  addQuickAccess,
  removeQuickAccess,
  reorderQuickAccess,
  addRecentProtocol,
  clearRecentProtocols,
  completeOnboarding,
  updateLastSync,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;