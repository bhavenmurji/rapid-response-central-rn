/**
 * App Navigator for Rapid Response Central
 * React Navigation setup with bottom tabs and stack navigation
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import { EmergencyColors, EmergencyTypography } from '../theme/EmergencyDesignSystem';

// Import screens (to be created)
import CodesScreen from '../../features/codes/screens/CodesScreen';
import RRTsScreen from '../../features/rrts/screens/RRTsScreen';
import CallsScreen from '../../features/calls/screens/CallsScreen';
import LabsScreen from '../../features/labs/screens/LabsScreen';
import CalcScreen from '../../features/calc/screens/CalcScreen';
import StudyScreen from '../../features/study/screens/StudyScreen';

// Calculator screens
import WellsScoreScreen from '../../features/calculators/screens/WellsScoreScreen';

// Stack navigators for each tab
const CodesStack = createStackNavigator();
const RRTsStack = createStackNavigator();
const CallsStack = createStackNavigator();
const LabsStack = createStackNavigator();
const CalcStack = createStackNavigator();
const StudyStack = createStackNavigator();

// Navigation types
export type RootTabParamList = {
  Codes: undefined;
  RRTs: undefined;
  Calls: undefined;
  Labs: undefined;
  Calc: undefined;
  Study: undefined;
};

export type CodesStackParamList = {
  CodesHome: undefined;
  CodeBlue: undefined;
  CodeStroke: undefined;
  CodeSTEMI: undefined;
  RSI: undefined;
  Shock: undefined;
  Pneumothorax: undefined;
  StatusEpilepticus: undefined;
  MTP: undefined;
  MalignantHyperthermia: undefined;
  Hyperkalemia: undefined;
  Eclampsia: undefined;
  DKAHHS: undefined;
};

export type RRTsStackParamList = {
  RRTsHome: undefined;
  Hypoxia: undefined;
  Dyspnea: undefined;
  Tachypnea: undefined;
  Bradypnea: undefined;
  Hypotension: undefined;
  Hypertension: undefined;
  Tachycardia: undefined;
  Bradycardia: undefined;
  AMS: undefined;
  Seizure: undefined;
  Headache: undefined;
  Weakness: undefined;
  Sepsis: undefined;
  Anaphylaxis: undefined;
  Fever: undefined;
  Hypothermia: undefined;
  Oliguria: undefined;
};

export type CallsStackParamList = {
  CallsHome: undefined;
  HeartFailure: undefined;
  AtrialFibrillation: undefined;
  HypertensiveCrisis: undefined;
  Palpitations: undefined;
  Asthma: undefined;
  COPDExacerbation: undefined;
  Pneumonia: undefined;
  PulmonaryEmbolism: undefined;
  GIBleeding: undefined;
  AbdominalPain: undefined;
  Pancreatitis: undefined;
  BowelObstruction: undefined;
  BackPain: undefined;
  JointPain: undefined;
  Fractures: undefined;
  SoftTissueInjury: undefined;
};

export type CalcStackParamList = {
  CalcHome: undefined;
  WellsScore: undefined;
  MDRDGFR: undefined;
  PSIPort: undefined;
  ABCD2: undefined;
  CHADS2VASc: undefined;
  HASBLED: undefined;
};

// Stack Navigators
function CodesNavigator() {
  return (
    <CodesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: EmergencyColors.critical.red,
        },
        headerTintColor: EmergencyColors.white,
        headerTitleStyle: {
          ...EmergencyTypography.sectionHeader,
          color: EmergencyColors.white,
        },
      }}
    >
      <CodesStack.Screen 
        name="CodesHome" 
        component={CodesScreen}
        options={{ 
          title: 'Emergency Codes',
          headerShown: false, // Let the screen handle its own header
        }}
      />
      {/* Additional code screens will be added here */}
    </CodesStack.Navigator>
  );
}

function RRTsNavigator() {
  return (
    <RRTsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: EmergencyColors.urgent.orange,
        },
        headerTintColor: EmergencyColors.white,
        headerTitleStyle: {
          ...EmergencyTypography.sectionHeader,
          color: EmergencyColors.white,
        },
      }}
    >
      <RRTsStack.Screen 
        name="RRTsHome" 
        component={RRTsScreen}
        options={{ 
          title: 'Rapid Response Teams',
          headerShown: false,
        }}
      />
      {/* Additional RRT screens will be added here */}
    </RRTsStack.Navigator>
  );
}

function CallsNavigator() {
  return (
    <CallsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: EmergencyColors.primary,
        },
        headerTintColor: EmergencyColors.white,
        headerTitleStyle: {
          ...EmergencyTypography.sectionHeader,
          color: EmergencyColors.white,
        },
      }}
    >
      <CallsStack.Screen 
        name="CallsHome" 
        component={CallsScreen}
        options={{ 
          title: 'Emergency Calls',
          headerShown: false,
        }}
      />
      {/* Additional call screens will be added here */}
    </CallsStack.Navigator>
  );
}

function LabsNavigator() {
  return (
    <LabsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: EmergencyColors.normal.green,
        },
        headerTintColor: EmergencyColors.white,
        headerTitleStyle: {
          ...EmergencyTypography.sectionHeader,
          color: EmergencyColors.white,
        },
      }}
    >
      <LabsStack.Screen 
        name="LabsHome" 
        component={LabsScreen}
        options={{ 
          title: 'Lab Results',
          headerShown: false,
        }}
      />
    </LabsStack.Navigator>
  );
}

function CalcNavigator() {
  return (
    <CalcStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: EmergencyColors.caution.yellow,
        },
        headerTintColor: EmergencyColors.white,
        headerTitleStyle: {
          ...EmergencyTypography.sectionHeader,
          color: EmergencyColors.white,
        },
      }}
    >
      <CalcStack.Screen 
        name="CalcHome" 
        component={CalcScreen}
        options={{ 
          title: 'Medical Calculators',
          headerShown: false,
        }}
      />
      <CalcStack.Screen 
        name="WellsScore" 
        component={WellsScoreScreen}
        options={{ 
          title: "Wells' Criteria for PE",
          headerShown: false,
        }}
      />
    </CalcStack.Navigator>
  );
}

function StudyNavigator() {
  return (
    <StudyStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: EmergencyColors.primary,
        },
        headerTintColor: EmergencyColors.white,
        headerTitleStyle: {
          ...EmergencyTypography.sectionHeader,
          color: EmergencyColors.white,
        },
      }}
    >
      <StudyStack.Screen 
        name="StudyHome" 
        component={StudyScreen}
        options={{ 
          title: 'FamMed Central',
          headerShown: false,
        }}
      />
    </StudyStack.Navigator>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator<RootTabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap;

          switch (route.name) {
            case 'Codes':
              iconName = 'emergency';
              break;
            case 'RRTs':
              iconName = 'medical-services';
              break;
            case 'Calls':
              iconName = 'phone-in-talk';
              break;
            case 'Labs':
              iconName = 'science';
              break;
            case 'Calc':
              iconName = 'calculate';
              break;
            case 'Study':
              iconName = 'school';
              break;
            default:
              iconName = 'help';
              break;
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: EmergencyColors.primary,
        tabBarInactiveTintColor: EmergencyColors.gray[500],
        tabBarStyle: {
          backgroundColor: EmergencyColors.white,
          borderTopWidth: 1,
          borderTopColor: EmergencyColors.gray[200],
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          ...EmergencyTypography.caption,
          fontSize: 11,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Codes" 
        component={CodesNavigator}
        options={{
          tabBarLabel: 'CODES',
        }}
      />
      <Tab.Screen 
        name="RRTs" 
        component={RRTsNavigator}
        options={{
          tabBarLabel: 'RRTs',
        }}
      />
      <Tab.Screen 
        name="Calls" 
        component={CallsNavigator}
        options={{
          tabBarLabel: 'Calls',
        }}
      />
      <Tab.Screen 
        name="Labs" 
        component={LabsNavigator}
        options={{
          tabBarLabel: 'Labs',
        }}
      />
      <Tab.Screen 
        name="Calc" 
        component={CalcNavigator}
        options={{
          tabBarLabel: 'Calc',
        }}
      />
      <Tab.Screen 
        name="Study" 
        component={StudyNavigator}
        options={{
          tabBarLabel: 'Study',
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}