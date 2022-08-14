import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';

const RecordingButton = ({isRecording, onStartPress, onStopPress, style}) => {
  const RenderRecording = () => {
    return (
      <TouchableOpacity
        onPress={onStopPress}
        style={[styles.buttonContainer, styles.buttonStopContainer, style]}>
        <View style={styles.buttonStop} />
      </TouchableOpacity>
    );
  };

  const RenderWaiting = () => {
    return (
      <TouchableOpacity
        onPress={onStartPress}
        style={[styles.buttonContainer, style]}>
        <View style={styles.circleInside} />
      </TouchableOpacity>
    );
  };

  return isRecording ? <RenderRecording /> : <RenderWaiting />;
};
export default RecordingButton;
