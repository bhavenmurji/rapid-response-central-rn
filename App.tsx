/**
 * Rapid Response Central - React Native App
 * Emergency medical protocols for Virtua Voorhees Family Medicine
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/core/navigation/AppNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}
