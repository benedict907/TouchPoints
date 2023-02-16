import React, {useState} from 'react';
import {View, Alert} from 'react-native';

import StyledTextInput from '../../components/common/StyledTextInput';
import {connect} from 'react-redux';

import styles from './styles';
import {PLACEHOLDER_COLOR} from '../../constants/colors';
import CustomButton from '../../components/common/CustomButton';
import {HOME_STACK} from '../../constants';
const LoginScreen = ({navigation, login}) => {
  const [mobile, setMobile] = useState('9747389586');
  const [password, setPassword] = useState('123456');
  return (
    <View style={styles.mainContainer}>
      {/* <Text style={styles.headerText}>Login</Text> */}
      <StyledTextInput
        onChangeText={setMobile}
        keyboardType="numeric"
        value={mobile}
        maxLength={10}
        placeholderTextColor={PLACEHOLDER_COLOR}
        placeholder={'Enter phone number'}
        containerStyle={styles.containerStyle}
        textInputStyle={styles.textInputContainerStyle}
      />
      <StyledTextInput
        onChangeText={setPassword}
        keyboardType="numeric"
        value={password}
        maxLength={10}
        secureTextEntry={true}
        placeholderTextColor={PLACEHOLDER_COLOR}
        placeholder={'Enter password'}
        containerStyle={styles.containerStyle}
        textInputStyle={styles.textInputContainerStyle}
      />
      <CustomButton
        title={'Login'}
        onPress={() => {
          login({
            mobile,
            password,
            callback: (status, error) => {
              if (status === 'success') {
                navigation.navigate(HOME_STACK);
              } else {
                Alert.alert('', error);
              }
            },
          });
        }}
      />
    </View>
  );
};

const mapStateToProps = ({
  homeModel: {currentLayout, appLanguage, subscriberId},
}) => ({
  appLanguage,
  subscriberId,
  currentLayout,
});

const mapDispatchToProps = ({
  authModel: {login, setCurrentLayout, resetData, setAddress},
}) => ({
  login,
  setCurrentLayout,
  resetData,
  setAddress,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
