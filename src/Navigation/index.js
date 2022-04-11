import React, {useEffect, createRef} from 'react';
import {Platform, StatusBar, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import AppNavigation from './AppNavigation';
import styles from './styles';
const navigationRef = createRef();

const Navigation = ({setIsConnected, isConnected}) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return unsubscribe;
  }, [setIsConnected, isConnected]);

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
  homeModel: {isSearchListOpen},
}) => ({
  userData,
  isConnected,
  isSearchListOpen,
});

const mapDispatchToProps = ({authModel: {setIsConnected}}) => ({
  setIsConnected,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
