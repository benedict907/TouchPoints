import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  InteractionManager,
  Image,
  Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from './styles';
import RecordingButton from '../../components/RecordingButton';
import withPreventDoubleClick from '../../HOC/withPreventDoubleClick';
import {
  CLOSE as Close,
  ROTATE as Rotate,
  FLASH as Flash,
} from '../../constants/assets';
import {changeCameraType, toggleFlash} from '../ImageCaptureScreen/helpers';

import RNVideoHelper from 'react-native-video-helper';

import {connect} from 'react-redux';
import Loader from '../../components/common/Loader';
import {getLanguage} from '../../localization';
let timer;
let time = 0;
const cancelDoublePressDelay = 1000;

const CancelButton = withPreventDoubleClick(
  TouchableOpacity,
  cancelDoublePressDelay,
);

const FlashButton = withPreventDoubleClick(
  TouchableOpacity,
  cancelDoublePressDelay,
);

const VideoCaptureScreen = ({
  navigation,
  isOpen: isOpenProp,
  runAfterInteractions,
  durationTextStyle,
  updateImage,
  recordOptions = {quality: 0.8},
}) => {
  const camera = useRef();
  const maxLength = 5;
  const [isRecording, setIsRecording] = useState(isOpenProp);
  const [loading, setLoading] = useState(false);
  const [recorded, setRecorder] = useState(false);
  const [cameraType, setcameraType] = useState(RNCamera.Constants.Type.back);
  const [flashType, setFlashType] = useState(RNCamera.Constants.FlashMode.off);
  const [zoomValue, setZoomValue] = useState(0);

  useEffect(() => {
    const doPostMount = () => setLoading(false);
    if (runAfterInteractions) {
      InteractionManager.runAfterInteractions(doPostMount);
    } else {
      doPostMount();
    }
  }, [runAfterInteractions]);

  const startCapture = () => {
    const shouldStartCapture = () => {
      camera.current
        .recordAsync(recordOptions)
        .then(async data => {
          setLoading(true);

          const sourceUri = data.uri;

          RNVideoHelper.compress(sourceUri, {
            startTime: 0, // optional, in seconds, defaults to 0
            endTime: 2, //  optional, in seconds, defaults to video duration
            quality: 'low', // default low, can be medium or high
            defaultOrientation: 0, // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
          })
            .progress(value => {
              console.warn('progress', value); // Int with progress value from 0 to 1
            })
            .then(compressedUri => {
              console.warn('compressedUri', compressedUri); // String with path to temporary compressed video
              setLoading(false);

              if (compressedUri.replace('file://', 'file:///') !== '') {
                updateImage(compressedUri.replace('file://', 'file:///'));
                navigation.goBack();
              } else {
                Alert.alert(
                  '',
                  'an error occured while compressing..please try again.',
                );
              }
            });

          setRecorder(true);
        })
        .catch(err => console.error(err));
      startTimer();

      setTimeout(() => {
        setIsRecording(true);
        setRecorder(false);
        time = 0;
      });
    };
    if (maxLength > 0 || maxLength < 0) {
      if (runAfterInteractions) {
        InteractionManager.runAfterInteractions(shouldStartCapture);
      } else {
        shouldStartCapture();
      }
    }
  };

  const stopCapture = () => {
    const shouldStopCapture = () => {
      if (camera.current) {
        stopTimer();
        camera.current.stopRecording();
        setIsRecording(false);
      }
    };
    if (runAfterInteractions) {
      InteractionManager.runAfterInteractions(shouldStopCapture);
    } else {
      shouldStopCapture();
    }
  };

  const startTimer = () => {
    timer = setInterval(() => {
      time = time + 1;
      if (maxLength > 0 && time >= maxLength) {
        stopCapture();
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
  };

  const renderContent = () => {
    return (
      <View>
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
          <RecordingButton
            style={styles.recodingButton}
            isRecording={isRecording}
            onStartPress={startCapture}
            onStopPress={stopCapture}
          />
          <TouchableOpacity
            onPress={() => {
              changeCameraType(cameraType, setcameraType);
            }}
            style={styles.closeButtonContainer}>
            <Image source={Rotate} style={styles.imageStyle} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <RNCamera
        ref={camera}
        useNativeZoom={true}
        maxZoom={1.0}
        zoom={zoomValue / 10}
        style={styles.preview}
        type={cameraType}
        flashMode={flashType}
        captureAudio>
        {renderContent()}
      </RNCamera>
    );
  };

  return (
    <View style={styles.containerStyle}>
      {loading ? (
        <View style={[styles.loaderContainer]}>
          <Text style={styles.loadingText}>
            {getLanguage('videoCompressingText')}
          </Text>
          <Loader />
        </View>
      ) : (
        <View style={styles.content}>{renderCamera()}</View>
      )}
    </View>
  );
};

const mapDispatchToProps = ({homeModel: {updateImage}}) => ({
  updateImage,
});

export default connect(null, mapDispatchToProps)(VideoCaptureScreen);
