import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_WHITE_SMOKE,
  COLOR_LIGHT_GREY,
  COLOR_WHITE,
} from '../../constants/colors';
import {fontPixel, heightPixel, widthPixel} from '../../utils/helpers';
const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: COLOR_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
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
  imageStyle: {
    height: heightPixel(40),
    width: widthPixel(40),
    alignSelf: 'center',
  },
  cleseButtonContainer: {
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
  dummyText: {fontSize: 1},
});

export default styles;
