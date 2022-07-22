import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import withInternetCheckComponent from '../../../HOC/withInternetCheckComponent';
import Loader from '../Loader';
import styles from './styles';
// const InternetCheckButton = withInternetCheckComponent(TouchableOpacity);
const CustomButton = ({
  title,
  onPress,
  style,
  isLoading,
  showLoader = false,
}) => {
  return !isLoading ? (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  ) : showLoader ? (
    <View style={[styles.loaderContainer, style]}>
      <Loader />
    </View>
  ) : null;
};

const mapStateToProps = ({authModel: {isLoading}}) => ({
  isLoading,
});

export default connect(mapStateToProps, null)(CustomButton);
