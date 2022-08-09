import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import store from '../redux';

const withInternetCheckComponent = WrappedComponent => {
  const CheckInternetConnection = props => {
    const {isOfflineButton, onPress} = props;
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
      const unsubscribe = store.subscribe(() =>
        setIsConnected(store.getState().authModel.isConnected),
      );
      return () => unsubscribe();
    }, []);

    const onPressButton = () => {
      if (!isOfflineButton) {
        if (isConnected) {
          onPress && onPress();
        } else {
          Alert.alert('', 'No Internet Connection');
        }
      } else {
        onPress && onPress();
      }
    };

    return <WrappedComponent {...props} onPress={onPressButton} />;
  };

  return CheckInternetConnection;
};

export default withInternetCheckComponent;
