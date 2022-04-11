import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import {fontPixel} from '../utils/helpers';
import {
  SHADOW_TRANSPARENT_BLACK,
  SHADOW_BLACK,
  COLOR_SHADOW_GREY,
  COLOR_SHADOW_DARK_GREEN,
  COLOR_WHITE,
  COLOR_LIGHT_BLUE,
  COLOR_SHADOW_GREY_LIGHT,
  COLOR_WHITE_SMOKE,
  BLURRED_WHITE,
  TIMBER_WOLF,
  DARK_BLUR_VIEW,
  LIGHT_ASH,
} from './colors';
import {LATO_BOLD, LATO_REGULAR} from './fonts';

const {height, width} = Dimensions.get('screen');

export default StyleSheet.create({
  transparentBg: {backgroundColor: 'transparent'},
  shadow: {
    // Android
    elevation: 6,
    // iOS
    shadowRadius: 5,
    shadowOffset: {width: 2, height: 0},
    shadowOpacity: 1,
    shadowColor: SHADOW_TRANSPARENT_BLACK,
  },
  divider: {
    height: 1,
    backgroundColor: LIGHT_ASH,
  },
  shadowAverage: {
    // iOS
    shadowColor: SHADOW_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Android
    elevation: 4,
  },
  shadowLight: {
    // iOS
    shadowColor: SHADOW_BLACK,
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Android
    elevation: 1,
  },
  shadowLightGray: {
    // iOS
    shadowColor: COLOR_SHADOW_GREY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
    // Android
    elevation: 3,
  },
  shadowLightGrayWithRadius: {
    // iOS
    shadowColor: COLOR_SHADOW_GREY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
    // Android
    elevation: 3,
    borderRadius: 5,
  },
  shadowLightGrey: {
    // iOS
    shadowColor: COLOR_SHADOW_GREY_LIGHT,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    //  shadowOpacity: 0.5,
    // Android
    elevation: 3,
  },
  shadowLightBlack: {
    // Android
    elevation: 6,
    // iOS
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowColor: SHADOW_TRANSPARENT_BLACK,
  },

  shadowPopUp: {
    shadowColor: COLOR_SHADOW_DARK_GREEN,
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.2,
    elevation: 2,
  },
  fullFlex: {flexGrow: 1},
  modalStyle: {backgroundColor: COLOR_WHITE},
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: height,
    width: width,
    backgroundColor: COLOR_WHITE,
  },

  textShadow: {
    // iOS
    shadowColor: SHADOW_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
    // Android
    elevation: 8,
  },
  leftTouchableContainer: {
    paddingLeft: 15,
    paddingVertical: 10,
    transform: [{rotateY: I18nManager.isRTL ? '180deg' : '0deg'}],
    alignSelf: 'flex-start',
  },
  rootView: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rootViewLarge: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileCameraStyle: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    zIndex: 1,
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40, // To fix the title left position,
  },
  titleStyle: {
    textAlign: 'center',
    color: COLOR_WHITE,
    fontSize: fontPixel(18),
    fontFamily: LATO_BOLD,
  },
  imageCropLoadStyle: {backgroundColor: DARK_BLUR_VIEW, flex: 1},
  iconHitSlope: {top: 20, bottom: 20, left: 20, right: 20},
});
