import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';
import {COLOR_WHITE} from '../../../constants/colors';

const Loader = ({isSmall = false, style}) => {
  return (
    <View
      style={[
        isSmall ? styles.screenContainerSmall : styles.screenContainer,
        style,
      ]}>
      <ActivityIndicator
        color={COLOR_WHITE}
        size={isSmall ? 'small' : 'large'}
      />
    </View>
  );
};
export default Loader;
