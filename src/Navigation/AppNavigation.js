import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import {HOME_STACK, IMAGE_PREVIEW_SCREEN, NEW_REQUEST} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageCaptureScreen from '../screens/ImageCaptureScreen';

const Stack = createStackNavigator();
const AppNavigation = () => {
  return (
    // <SafeAreaView horizontal>
    <Stack.Navigator
      initialRouteName={HOME_STACK}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name={HOME_STACK}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={IMAGE_PREVIEW_SCREEN}
        component={ImageCaptureScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    // </SafeAreaView>
  );
};

export default AppNavigation;
