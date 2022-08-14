import {RNCamera} from 'react-native-camera';
import {compressImage} from '../../utils/imageUtils';
import {Image} from 'react-native-compressor';

const PICTURE_QUALITY = 0.5;
const changeCameraType = (cameraType, setcameraType) => {
  if (cameraType === RNCamera.Constants.Type.back) {
    setcameraType(RNCamera.Constants.Type.front);
  } else {
    setcameraType(RNCamera.Constants.Type.back);
  }
};

const toggleFlash = (cameraType, setFlashType) => {
  if (cameraType === RNCamera.Constants.FlashMode.off) {
    setFlashType(RNCamera.Constants.FlashMode.torch);
  } else {
    setFlashType(RNCamera.Constants.FlashMode.off);
  }
};

const captureImage = async (camera, navigation, updateImage) => {
  const options = {quality: PICTURE_QUALITY};
  try {
    const data = await camera.takePictureAsync(options);

    Image.compress(data.uri, {
      compressionMethod: 'auto',
      minimumFileSizeForCompress: 1,
    }).then(res => {
      updateImage(res);
      navigation.goBack();
    });

    // compressImage(data, response => {
    //   if (response) {
    //     updateImage(response.uri);
    //     navigation.goBack();
    //   }
    // });
  } catch (err) {
    navigation.goBack();
  }
};

const stopVideo = camera => {
  camera.stopRecording();
};

export {changeCameraType, captureImage, stopVideo, toggleFlash};
