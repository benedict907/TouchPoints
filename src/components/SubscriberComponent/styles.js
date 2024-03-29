import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK,
  MAIN_TEXT_COLOR,
  TITLE_COLOR,
} from '../../constants/colors';
import {MYRIAD_PRO, POPPINS_BOLD, POPPINS_REGULAR} from '../../constants/fonts';
import {
  fontPixel,
  heightPixel,
  horizontalScale,
  widthPixel,
} from '../../utils/helpers';
export default StyleSheet.create({
  headerText: {
    fontFamily: POPPINS_BOLD,
    fontSize: fontPixel(16),
    color: MAIN_TEXT_COLOR,
    textAlign: 'left',
  },
  containerStyle: {
    marginHorizontal: horizontalScale(24),
    borderRadius: 6,
    backgroundColor: '#2b2e4c',
    marginTop: 20,
    height: heightPixel(54),
  },
  nextButtonStyle: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  textInputContainerStyle: {
    color: MAIN_TEXT_COLOR,
    fontSize: fontPixel(14),
    fontFamily: POPPINS_REGULAR,
  },
  errorText: {
    color: 'red',
    fontSize: fontPixel(14),
    fontFamily: POPPINS_REGULAR,
    marginStart: 25,
    marginTop: 10,
  },
});
