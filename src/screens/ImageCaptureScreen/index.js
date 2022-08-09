import React, {useState, useRef, useEffect} from 'react';
import {BackHandler, Text, TouchableOpacity, View, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {changeCameraType, captureImage, toggleFlash} from './helpers';
import styles from './styles';
import {
  CAMERA as Camera,
  CLOSE as Close,
  ROTATE as Rotate,
  FLASH as Flash,
} from '../../constants/assets';
import withPreventDoubleClick from '../../HOC/withPreventDoubleClick';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {connect} from 'react-redux';
// import Loader from '../../components/Loader';

const cameraDoublePresssDelay = 2000;
const cancelDoublePressDelay = 1000;
const CameraButton = withPreventDoubleClick(
  TouchableOpacity,
  cameraDoublePresssDelay,
);
const CancelButton = withPreventDoubleClick(
  TouchableOpacity,
  cancelDoublePressDelay,
);

const FlashButton = withPreventDoubleClick(
  TouchableOpacity,
  cancelDoublePressDelay,
);

const ImageCaptureScreen = ({navigation, updateImage}) => {
  const [cameraType, setcameraType] = useState(RNCamera.Constants.Type.back);
  const [flashType, setFlashType] = useState(RNCamera.Constants.FlashMode.off);
  const [zoomValue, setZoomValue] = useState(0);
  const [isPageFocused, setPageFocused] = useState(false);
  const cameraRef = useRef();

  useEffect(() => {
    const backActionHandler = () => {
      navigation.goBack();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backActionHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
    };
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      setPageFocused(true);
    }, []),
  );

  return isPageFocused ? (
    <View style={styles.containerStyle}>
      <RNCamera
        captureAudio={false}
        ref={cameraRef}
        useNativeZoom={true}
        maxZoom={1.0}
        zoom={zoomValue / 10}
        style={styles.cameraStyle}
        type={cameraType}
        flashMode={flashType}>
        {() => {
          //This is a dummy text which wont be shown on front end. We need a text component to render UI, therefore keeping this text .
          return <Text style={styles.dummyText}>snap</Text>;
        }}
      </RNCamera>

      <FlashButton
        onPress={() => toggleFlash(flashType, setFlashType)}
        style={styles.flashButtonContainer}>
        <Image source={Flash} style={styles.imageStyle} />
      </FlashButton>
      <FlashButton
        onPress={() => {
          zoomValue < 10 ? setZoomValue(zoomValue + 1) : null;
        }}
        style={styles.zoomInButtonContainer}>
        <Text style={styles.zoomText}>+</Text>
      </FlashButton>
      <FlashButton
        onPress={() => {
          zoomValue > 0 ? setZoomValue(zoomValue - 1) : null;
        }}
        style={styles.zoomOutButtonContainer}>
        <Text style={styles.zoomText}>-</Text>
      </FlashButton>
      <View style={styles.bottomContainer}>
        <CancelButton
          onPress={navigation.goBack}
          style={styles.closeButtonContainer}>
          <Image source={Close} style={styles.imageStyle} />
        </CancelButton>
        <CameraButton
          onPress={() =>
            captureImage(cameraRef.current, navigation, updateImage)
          }
          style={styles.cameraButtonContainer}>
          <Image source={Camera} style={styles.imageStyle} />
        </CameraButton>
        <TouchableOpacity
          onPress={() => {
            changeCameraType(cameraType, setcameraType);
          }}
          style={styles.closeButtonContainer}>
          <Image source={Rotate} style={styles.imageStyle} />
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
};

const mapDispatchToProps = ({homeModel: {updateImage}}) => ({
  updateImage,
});

export default connect(null, mapDispatchToProps)(ImageCaptureScreen);
