import React, {useCallback, useEffect, useState} from 'react';
import {
  enableFreeze,
  enableScreens,
} from '@amazon-devices/react-native-screens';
import {createNativeStackNavigator} from '@amazon-devices/react-navigation__native-stack';
import {NavigationContainer} from '@amazon-devices/react-navigation__native';
import {
  useKeplerAppStateManager,
  usePreventHideSplashScreen,
  useHideSplashScreenCallback,
} from '@amazon-devices/react-native-kepler';
import {useReportFullyDrawn} from '@amazon-devices/kepler-performance-api';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';

// Enable optimizations
enableScreens();
enableFreeze();

// Define navigation types
export type RootStackParamList = {
  Home: undefined;
  Details: {
    banner: string;
    title: string;
    description: string;
    videoUrl: string;
  };
  VideoPlayer: {
    videoUrl: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  // Prevent splash screen from hiding automatically (must be first)
  usePreventHideSplashScreen();
  
  const reportFullyDrawnCallback = useReportFullyDrawn();
  const hideSplashScreenCallback = useHideSplashScreenCallback();
  const keplerAppStateManager = useKeplerAppStateManager();
  const [appState, setAppState] = useState(
    keplerAppStateManager.getCurrentState(),
  );

  // Report fully drawn after first render (cold start)
  useEffect(() => {
    reportFullyDrawnCallback();
    // Hide splash screen only after app is fully drawn
    hideSplashScreenCallback();
  }, [reportFullyDrawnCallback, hideSplashScreenCallback]);

  // Handle app state changes for warm start
  const handleAppStateChange = useCallback(
    (stateChange: any) => {
      // Report fully drawn when app comes to foreground from background/inactive
      if (
        appState.match(/^(inactive|background)$/) &&
        stateChange === 'active'
      ) {
        reportFullyDrawnCallback();
        // Hide splash screen after warm start fully drawn
        hideSplashScreenCallback();
      }

      // Update app state
      if (stateChange.match(/^(inactive|background|active|unknown)$/)) {
        setAppState(stateChange);
      }
    },
    [appState, reportFullyDrawnCallback, hideSplashScreenCallback],
  );

  // Set up app state listener
  useEffect(() => {
    const changeSubscription = keplerAppStateManager.addAppStateListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      changeSubscription.remove();
    };
  }, [handleAppStateChange, keplerAppStateManager]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
