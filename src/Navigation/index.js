import React, {useEffect, createRef} from 'react';
import {Platform, StatusBar, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import AppNavigation from './AppNavigation';
import styles from './styles';
const navigationRef = createRef();

const Navigation = ({
  setIsConnected,
  serviceRegions,
  getServiceRegions,
  isConnected,
}) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isInternetReachable);

      if (state.isInternetReachable && serviceRegions.length === 0) {
        getServiceRegions();
      }
    });
    return unsubscribe;
  }, [setIsConnected, isConnected, serviceRegions, getServiceRegions]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {Platform.OS !== 'ios' && (
        <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      )}

      <NavigationContainer ref={navigationRef}>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const mapStateToProps = ({
  authModel: {userData, isConnected},
  homeModel: {serviceRegions},
}) => ({
  userData,
  isConnected,
  serviceRegions,
});

const mapDispatchToProps = ({
  authModel: {setIsConnected},
  homeModel: {getServiceRegions},
}) => ({
  setIsConnected,
  getServiceRegions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
