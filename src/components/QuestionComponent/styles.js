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
  widthPixel,
} from '../../utils/helpers';
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    backgroundColor: COLOR_BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: POPPINS_BOLD,
    fontSize: fontPixel(16),
    textAlign: 'center',
    color: MAIN_TEXT_COLOR,
    marginStart: 25,
    marginBottom: 20,
  },
  imageStyle: {height: heightPixel(280), width: '100%'},
  capturedImageStyle: {
    height: heightPixel(280),
    width: '80%',
    marginTop: 20,
    alignSelf: 'center',
  },
  snapShotStyle: {
    width: 180,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
