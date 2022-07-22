import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import LoginScreen from '../screens/Login';
import {
  HOME_STACK,
  IMAGE_PREVIEW_SCREEN,
  LOGIN_SCREEN,
  NEW_REQUEST,
} from '../constants';
import ImageCaptureScreen from '../screens/ImageCaptureScreen';
import {connect} from 'react-redux';

const Stack = createStackNavigator();
const AppNavigation = ({userData}) => {
  console.log('sss', userData);
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
    </Stack.Navigator>
    // </SafeAreaView>
  );
};

const mapStateToProps = ({authModel: {userData}}) => ({
  userData,
});

export default connect(mapStateToProps, null)(AppNavigation);
