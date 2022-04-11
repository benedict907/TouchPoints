import {StyleSheet} from 'react-native';
import {COLOR_WHITE} from '../../../constants/colors';

const styles = StyleSheet.create({
  containerFilled: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  containerNotFilled: {
    flex: undefined,
  },
});

export default styles;
