import React from 'react';
import {StyleSheet, Dimensions, Platform, View} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  COLOR_WHITE_SMOKE,
} from '../../constants/colors';
import {fontPixel, heightPixel, widthPixel} from '../../utils/helpers';

const {width, height} = Dimensions.get('window');

export const buttonClose = {
  position: 'absolute',
  right: 5,
  top: 10,
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
};

export const durationText = {
  marginTop: Platform.OS === 'ios' ? 20 : 20,
  color: 'white',
  textAlign: 'center',
  fontSize: 20,
  alignItems: 'center',
};

export default StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    width,
    height,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonClose,
  preview: {
    width,
    height,
  },
  controlLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    height: 120,
    alignItems: 'center',
    width,
    flexDirection: 'row',
  },
  recodingButton: {
    marginBottom: Platform.OS === 'ios' ? 0 : 20,
  },
  durationText,
  dotText: {
    color: '#D91E18',
    fontSize: 10,
    lineHeight: 20,
  },
  btnUse: {
    position: 'absolute',
    width: 80,
    height: 80,
    right: 20,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  convertingText: {
    color: 'white',
    fontSize: 17,
    marginTop: 5,
    textAlign: 'center',
  },
  imageStyle: {
    height: heightPixel(40),
    width: widthPixel(40),
    alignSelf: 'center',
  },
  containerStyle: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    position: 'absolute',
    top: height - 100,
    paddingHorizontal: 13,
  },
  cameraStyle: {height: '80%', marginTop: 20},
  flashButtonContainer: {
    height: heightPixel(50),
    width: widthPixel(50),
    borderRadius: widthPixel(25),
    backgroundColor: COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    end: 20,
  },
  zoomInButtonContainer: {
    height: heightPixel(50),
    width: widthPixel(50),
    borderRadius: widthPixel(25),
    backgroundColor: COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 90,
    end: 20,
  },
  zoomOutButtonContainer: {
    height: heightPixel(50),
    width: widthPixel(50),
    borderRadius: widthPixel(25),
    backgroundColor: COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 150,
    end: 20,
  },
  zoomText: {
    color: COLOR_BLACK,
    fontSize: fontPixel(26),
  },

  closeButtonContainer: {
    height: heightPixel(50),
    width: widthPixel(50),
    borderRadius: widthPixel(25),
    backgroundColor: COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButtonContainer: {
    height: heightPixel(60),
    width: widthPixel(60),
    borderRadius: widthPixel(30),
    backgroundColor: COLOR_WHITE_SMOKE,
    justifyContent: 'center',
    alignItems: 'center',
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
  dummyText: {fontSize: 1},
});
