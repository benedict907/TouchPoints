import {RNCamera} from 'react-native-camera';
import {compressImage} from '../../utils/imageUtils';

import {Alert} from 'react-native';

const PICTURE_QUALITY = 0.5;
const changeCameraType = (cameraType, setcameraType) => {
  if (cameraType === RNCamera.Constants.Type.back) {
    setcameraType(RNCamera.Constants.Type.front);
  } else {
    setcameraType(RNCamera.Constants.Type.back);
  }
};

const toggleFlash = (cameraType, setFlashType) => {
  console.log('cameraType', cameraType);
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
    updateImage(data.uri);
    const cropData = {
      offset: {
        x: 0,
        y: 0,
      },
      size: {
        width: data.width,
        height: data.width,
      },
    };
    ImageEditor.cropImage(
      data.uri,
      cropData,
      successURI => {},
      error => {
        console.log(error.message);
      },
    ),
      // if (imageCropType === profileUpdate) {
      //   openImageCropper(data.uri, undefined, profileUpdate, (image) => {
      //     navigation.goBack();
      //     callback(image);
      //   });
      // }
      //  if (imageCropType === mediaUpdate) {
      // compressImage(data, response => {
      //   if (response) {
      navigation.goBack();
    // navigation.navigate(ATTACHMENT_PREVIEW_SCREEN, {
    //   imageInfo: response,
    //   onSend,
    //   receiverName,
    // });
    // } else {
    //   Alert.alert('', 'File Size Exceeded', [
    //     {text: 'OK', onPress: () => {}},
    //   ]);
    // }
    // });
    // } else if (imageCropType === huddleProfileUpdate) {
    //   openImageCropper(data.uri, undefined, imageCropType, (image) => {
    //     navigation.goBack();
    //     callback(image);
    //   });
    // }
  } catch (err) {
    // dispatch(
    //   showSnackBar({
    //     message: err?.message || localisedServerError(),
    //     messageType: ALERT_TYPE_ERROR,
    //   }),
    // );
    navigation.goBack();
  }
};
export {changeCameraType, captureImage, toggleFlash};
