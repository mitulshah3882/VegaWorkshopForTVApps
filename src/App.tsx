import React from 'react';
import {
  enableFreeze,
  enableScreens,
} from '@amazon-devices/react-native-screens';
import {createNativeStackNavigator} from '@amazon-devices/react-navigation__native-stack';
import {NavigationContainer} from '@amazon-devices/react-navigation__native';
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
