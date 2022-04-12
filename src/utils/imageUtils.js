import ImageResizer from 'react-native-image-resizer';
import {Alert} from 'react-native';

const compressImage = (image, callback) => {
  ImageResizer.createResizedImage(
    image.uri,
    image.width,
    image.height,
    'JPEG',
    50,
    0,
    null,
  )
    .then(response => {
      callback(response);
    })
    .catch(({code, message}) => {
      Alert.alert('', message);

      callback(null);
    });
};

export {compressImage};
