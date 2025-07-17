/**
 * Emergency State Slice
 * Manages active emergencies, timers, and critical alerts
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EmergencyTimer {
  id: string;
  type: 'code_blue' | 'code_stroke' | 'rapid_response' | 'cpr';
  startTime: number;
  elapsedTime: number;
  isRunning: boolean;
  cycles?: number; // For CPR cycles
}

export interface ActiveEmergency {
  id: string;
  type: 'code_blue' | 'code_stroke' | 'code_white' | 'rapid_response';
  startTime: number;
  location?: string;
  patient?: {
    name?: string;
    mrn?: string;
    age?: number;
  };
  status: 'active' | 'resolved' | 'transferred';
  criticalActions: string[];
  completedActions: string[];
}

interface EmergencyState {
  activeEmergencies: ActiveEmergency[];
  activeTimers: Record<string, EmergencyTimer>;
  criticalAlerts: Array<{
    id: string;
    message: string;
    severity: 'critical' | 'urgent' | 'warning';
    timestamp: number;
  }>;
  lastUpdated: number | null;
}

const initialState: EmergencyState = {
  activeEmergencies: [],
  activeTimers: {},
  criticalAlerts: [],
  lastUpdated: null,
};

const emergencySlice = createSlice({
  name: 'emergency',
  initialState,
  reducers: {
    // Emergency management
    activateEmergency: (state, action: PayloadAction<Omit<ActiveEmergency, 'id' | 'startTime' | 'status' | 'completedActions'>>) => {
      const emergency: ActiveEmergency = {
        ...action.payload,
        id: `emergency_${Date.now()}`,
        startTime: Date.now(),
        status: 'active',
        completedActions: [],
      };
      state.activeEmergencies.push(emergency);
      state.lastUpdated = Date.now();
    },
    
    resolveEmergency: (state, action: PayloadAction<string>) => {
      const emergency = state.activeEmergencies.find(e => e.id === action.payload);
      if (emergency) {
        emergency.status = 'resolved';
        state.lastUpdated = Date.now();
      }
    },
    
    updateEmergencyActions: (state, action: PayloadAction<{ emergencyId: string; completedAction: string }>) => {
      const emergency = state.activeEmergencies.find(e => e.id === action.payload.emergencyId);
      if (emergency && !emergency.completedActions.includes(action.payload.completedAction)) {
        emergency.completedActions.push(action.payload.completedAction);
        state.lastUpdated = Date.now();
      }
    },
    
    // Timer management
    startTimer: (state, action: PayloadAction<{ type: EmergencyTimer['type']; id?: string }>) => {
      const timerId = action.payload.id || `timer_${Date.now()}`;
      state.activeTimers[timerId] = {
        id: timerId,
        type: action.payload.type,
        startTime: Date.now(),
        elapsedTime: 0,
        isRunning: true,
        cycles: action.payload.type === 'cpr' ? 0 : undefined,
      };
      state.lastUpdated = Date.now();
    },
    
    stopTimer: (state, action: PayloadAction<string>) => {
      const timer = state.activeTimers[action.payload];
      if (timer) {
        timer.isRunning = false;
        state.lastUpdated = Date.now();
      }
    },
    
    updateTimer: (state, action: PayloadAction<{ id: string; elapsedTime: number }>) => {
      const timer = state.activeTimers[action.payload.id];
      if (timer) {
        timer.elapsedTime = action.payload.elapsedTime;
      }
    },
    
    incrementCPRCycles: (state, action: PayloadAction<string>) => {
      const timer = state.activeTimers[action.payload];
      if (timer && timer.type === 'cpr' && timer.cycles !== undefined) {
        timer.cycles += 1;
        state.lastUpdated = Date.now();
      }
    },
    
    resetTimer: (state, action: PayloadAction<string>) => {
      const timer = state.activeTimers[action.payload];
      if (timer) {
        timer.elapsedTime = 0;
        timer.startTime = Date.now();
        if (timer.cycles !== undefined) {
          timer.cycles = 0;
        }
        state.lastUpdated = Date.now();
      }
    },
    
    // Alert management
    addCriticalAlert: (state, action: PayloadAction<{ message: string; severity: 'critical' | 'urgent' | 'warning' }>) => {
      state.criticalAlerts.push({
        id: `alert_${Date.now()}`,
        message: action.payload.message,
        severity: action.payload.severity,
        timestamp: Date.now(),
      });
      state.lastUpdated = Date.now();
    },
    
    dismissAlert: (state, action: PayloadAction<string>) => {
      state.criticalAlerts = state.criticalAlerts.filter(alert => alert.id !== action.payload);
      state.lastUpdated = Date.now();
    },
    
    clearAllAlerts: (state) => {
      state.criticalAlerts = [];
      state.lastUpdated = Date.now();
    },
  },
});

export const {
  activateEmergency,
  resolveEmergency,
  updateEmergencyActions,
  startTimer,
  stopTimer,
  updateTimer,
  incrementCPRCycles,
  resetTimer,
  addCriticalAlert,
  dismissAlert,
  clearAllAlerts,
} = emergencySlice.actions;

export default emergencySlice.reducer;