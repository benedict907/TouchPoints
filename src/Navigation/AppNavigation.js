import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import LoginScreen from '../screens/Login';
import {
  HOME_STACK,
  IMAGE_PREVIEW_SCREEN,
  LOGIN_SCREEN,
  VIDEO_CAPTURE_SCREEN,
} from '../constants';
import ImageCaptureScreen from '../screens/ImageCaptureScreen';
import {connect} from 'react-redux';
import VideoCaptureScreen from '../screens/VideoCaptureScreen';

const Stack = createStackNavigator();
const AppNavigation = ({userData}) => {
  return (
    // <SafeAreaView horizontal>
    <Stack.Navigator
      initialRouteName={userData === null ? LOGIN_SCREEN : HOME_STACK}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={HOME_STACK} component={Home} />
      <Stack.Screen
        name={IMAGE_PREVIEW_SCREEN}
        component={ImageCaptureScreen}
      />
      <Stack.Screen
        name={VIDEO_CAPTURE_SCREEN}
        component={VideoCaptureScreen}
      />
    </Stack.Navigator>
    // </SafeAreaView>
  );
};

const mapStateToProps = ({authModel: {userData}}) => ({
  userData,
});

export default connect(mapStateToProps, null)(AppNavigation);
