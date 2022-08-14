import {StyleSheet} from 'react-native';
import {COLOR_BLACK, COLOR_WHITE} from '../../../constants/colors';
import {POPPINS_BOLD} from '../../../constants/fonts';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../../utils/helpers';
export default StyleSheet.create({
  container: {
    backgroundColor: COLOR_WHITE,
    height: heightPixel(45),
    width: widthPixel(120),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pixelSizeVertical(40),
  },
  loaderContainer: {
    borderRadius: 30,
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  textStyle: {
    color: COLOR_BLACK,
    fontFamily: POPPINS_BOLD,
    fontSize: fontPixel(16),
    textAlign: 'center',
  },
});
