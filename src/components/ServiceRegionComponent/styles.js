import {StyleSheet} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  MAIN_TEXT_COLOR,
  TITLE_COLOR,
} from '../../constants/colors';
import {
  MYRIAD_PRO,
  POPPINS_BOLD,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
} from '../../constants/fonts';
import {
  fontPixel,
  heightPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '../../utils/helpers';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: POPPINS_BOLD,
    fontSize: fontPixel(16),
    color: MAIN_TEXT_COLOR,
    textAlign: 'left',
    marginStart: 25,
    marginBottom: 20,
  },
  radioStyle: {
    flexDirection: 'row',
    marginStart: 16,
    marginTop: 10,
    width: '30%',
    alignItems: 'center',
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: COLOR_WHITE,
  },
  nextButtonStyle: {
    alignSelf: 'flex-end',
    marginRight: pixelSizeHorizontal(20),
    marginVertical: pixelSizeVertical(20),
  },
  titleStyle: {
    color: COLOR_WHITE,
    fontFamily: POPPINS_REGULAR,
    fontSize: fontPixel(18),
    marginBottom: 1,
    marginStart: 10,
  },
});
