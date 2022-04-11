import debounce from 'lodash.debounce';
import React from 'react';

const withPreventDoubleClick = (WrappedComponent, pressDelay = 300) => {
  const PreventDoubleClick = props => {
    const debouncedOnPress = () => {
      props.onPress && props.onPress();
    };

    const onPress = debounce(debouncedOnPress, pressDelay, {
      leading: true,
      trailing: false,
    });

    return <WrappedComponent {...props} onPress={onPress} />;
  };

  return PreventDoubleClick;
};

export default withPreventDoubleClick;
