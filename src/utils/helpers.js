import {
  REFERENCE_WINDOW_DIMENSIONS,
  CURRENCY_INDIAN,
  opacityTypes,
  DATE_FORMAT,
} from '../constants';
import {isEmpty} from 'lodash';
import {PixelRatio, Dimensions, Platform} from 'react-native';
import moment from 'moment';
const {height, width} = Dimensions.get('window');
const widthBaseScale = width / 414;
const heightBaseScale = height / 896;

export const verticalScale = (size, factor = 1) => {
  const {height: referenceHeight} = REFERENCE_WINDOW_DIMENSIONS;
  const scaledSize = (height / referenceHeight) * size;
  return size + (scaledSize - size) * factor;
};
export function isIOSPlatform() {
  if (Platform.OS === 'ios') {
    return true;
  } else {
    return false;
  }
}
export const horizontalScale = (size, factor = 1) => {
  const {width: referenceWidth} = REFERENCE_WINDOW_DIMENSIONS;
  const scaledSize = (width / referenceWidth) * size;
  return size + (scaledSize - size) * factor;
};

export const getPrice = (indianPrice, uaePrice, selectedCurrency) =>
  selectedCurrency === CURRENCY_INDIAN
    ? `${selectedCurrency} ${indianPrice}`
    : `${selectedCurrency} ${uaePrice}`;

export function hasFalsyValues(data, keys) {
  if (isEmpty(data)) {
    return true;
  }
  if (Array.isArray(data)) {
    return data.some(item => (item === 0 ? false : Boolean(item) === false));
  }
  if (typeof data === 'object') {
    const keyList = Array.isArray(keys) ? keys : Object.keys(data);
    return keyList.some(key =>
      data[key] === 0 ? false : Boolean(data[key]) === false,
    );
  }
  return false;
}

export const parseString = value => {
  if (typeof value === 'number') {
    return value.toString();
  }
  if (typeof value === 'string') {
    return value;
  }
  return '';
};
const normalize = (size, based = 'width') => {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

//for width  pixel
export const widthPixel = size => {
  return normalize(size, 'width');
};
//for height  pixel
export const heightPixel = size => {
  return normalize(size, 'height');
};
//for font  pixel
export const fontPixel = size => {
  return heightPixel(size);
};
//for Margin and Padding vertical pixel
export const pixelSizeVertical = size => {
  return heightPixel(size);
};
//for Margin and Padding horizontal pixel
export const pixelSizeHorizontal = size => {
  return widthPixel(size);
};

export const getOpacityWithColor = (color, opacity) => {
  return `${color}${opacityTypes[opacity]}`;
};
// export const getQuestionType = ({selectedQuestionArray, selectedQuestion}) =>
//   selectedQuestionArray[selectedQuestion];
export const getConvertedDate = date => moment(date).format(DATE_FORMAT);
