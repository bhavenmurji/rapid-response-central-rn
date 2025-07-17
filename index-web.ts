/**
 * Web-specific entry point for React Native
 * Direct web initialization without Expo wrapper
 */

import { AppRegistry } from 'react-native';
import App from './App';

// Register the app for web
AppRegistry.registerComponent('RapidResponseRN', () => App);

// Start the app on web
if (typeof document !== 'undefined') {
  AppRegistry.runApplication('RapidResponseRN', {
    rootTag: document.getElementById('root'),
  });
}

// Export for testing
export default App;