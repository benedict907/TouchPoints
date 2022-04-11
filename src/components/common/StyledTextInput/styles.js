import {StyleSheet, I18nManager, Platform} from 'react-native';
import {
  POPPINS_PRO,
  MYRIAD_PRO,
  POPPINS_REGULAR,
} from '../../../constants/fonts';
import {
  COLOR_DARK_GREY,
  COLOR_DISABLED_GREY,
  INPUT_BACKGROUND_COLOR,
  MAIN_TEXT_COLOR,
} from '../../../constants/colors';
import {fontPixel, getOpacityWithColor} from '../../../utils/helpers';

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  headerTextStyle: {
    color: COLOR_DISABLED_GREY,
    fontFamily: MYRIAD_PRO,
  },
  icon: {
    marginRight: 5,
  },
  textIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCountContainer: {
    flex: 1,
  },
  starTextStyle: {},
  textInputContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: getOpacityWithColor(MAIN_TEXT_COLOR, 3),
    height: 42,
    marginTop: 8,
    paddingHorizontal: 10,
  },
  textInputStyle: {
    flex: 1,
    height: 42,
    borderRadius: 5,
    color: COLOR_DARK_GREY,
    fontFamily: POPPINS_REGULAR,
    fontSize: fontPixel(15),
  },
  leftIconContainer: {
    marginEnd: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {transform: [{rotateY: I18nManager.isRTL ? '180deg' : '0deg'}]},

  rightIconContainer: {
    marginStart: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  isOTPEnabled: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 0,
    maxWidth: 42,
  },
  otpBoxlastFieldInList: {marginRight: I18nManager.isRTL ? 10 : 0},
  OTPText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: POPPINS_PRO,
    fontSize: fontPixel(14),
  },
  activityIndicatorStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    marginRight: 0,
    height: 30,
  },

  countIconContainer: {
    alignSelf: 'flex-end',
    marginTop: Platform.OS === 'android' ? -6 : 3,
  },

  countTextStyle: {
    fontSize: fontPixel(11),
    paddingBottom: 5,
  },
  lengthBoundedSingleLineField: {
    justifyContent: 'center',
    height: '100%',
    position: 'absolute',
    marginTop: 4,
  },
  lengthBoundedMultiLineField: {
    justifyContent: 'flex-end',
    height: 30,
    position: 'relative',
  },
  lengthBoundedField: {paddingRight: 40},
  mediaIcon: {marginEnd: 5},
});

export default styles;
