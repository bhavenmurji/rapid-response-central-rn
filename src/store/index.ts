/**
 * Redux Store Configuration
 * Central state management for Rapid Response Central
 */

import { configureStore } from '@reduxjs/toolkit';
import emergencyReducer from './slices/emergencySlice';
import settingsReducer from './slices/settingsSlice';
import protocolsReducer from './slices/protocolsSlice';

export const store = configureStore({
  reducer: {
    emergency: emergencyReducer,
    settings: settingsReducer,
    protocols: protocolsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['emergency/startTimer', 'emergency/updateTimer'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['emergency.activeTimers'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {emergency: EmergencyState, settings: SettingsState, protocols: ProtocolsState}
export type AppDispatch = typeof store.dispatch;