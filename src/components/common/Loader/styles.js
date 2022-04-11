import {StyleSheet, Platform, Dimensions, StatusBar} from 'react-native';
const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height:
      Platform.OS === 'android' ? height + StatusBar.currentHeight : height,
  },
  screenContainerSmall: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    marginRight: 20,
    height: 30,
  },
});

export default styles;
