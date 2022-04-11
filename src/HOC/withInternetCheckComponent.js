import React from 'react';
import {Keyboard, Alert} from 'react-native';
import {connect} from 'react-redux';

const withInternetCheckComponent = WrappedComponent => {
  const CheckInternetConnection = props => {
    const {isOfflineButton, onPress, dismissKeyboardOnPress, isConnected} =
      props;
    const onPressButton = () => {
      if (!isOfflineButton) {
        if (isConnected) {
          onPress && onPress();
        } else {
          dismissKeyboardOnPress && Keyboard.dismiss();
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

const mapStateToProps = ({authModel: {isConnected}}) => ({
  isConnected,
});

export default connect(mapStateToProps, null)(withInternetCheckComponent);
