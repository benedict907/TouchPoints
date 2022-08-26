import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import withPreventDoubleClick from '../../../HOC/withPreventDoubleClick';
import styles from './styles';
const PreventDoubleClick = withPreventDoubleClick(TouchableOpacity);
const CustomButton = ({title, onPress, style}) => {
  return (
    <PreventDoubleClick onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.textStyle}>{title}</Text>
    </PreventDoubleClick>
  );
};

const mapStateToProps = ({authModel: {isLoading}}) => ({
  isLoading,
});

export default connect(mapStateToProps, null)(CustomButton);
