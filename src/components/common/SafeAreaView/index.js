import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {getContainerStyle} from './helpers';

const SafeAreaView = ({
  children,
  all,
  vertical,
  horizontal,
  left,
  right,
  top,
  bottom,
  style,
  fill = true,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        getContainerStyle({
          insets,
          all,
          vertical,
          horizontal,
          left,
          right,
          top,
          bottom,
          fill,
        }),
        style,
      ]}>
      {children}
    </View>
  );
};

export default SafeAreaView;
