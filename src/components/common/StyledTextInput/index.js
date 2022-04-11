import React, {forwardRef, useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';

import styles from './styles';
import {COLOR_DISABLED_GREY, COLOR_LIGHT_GREY} from '../../../constants/colors';
import {TEXT_INPUT_ICONS_ACTIVE_OPACITY} from '../../../constants';
import {parseString} from '../../../utils/helpers';

import {
  leftTouchableStyle,
  getTextInputStyle,
  getMaxLength,
  removePlaceHolder,
  showPlaceHolder,
  lengthBoundedFieldStyles,
  rightPaddingForLengthBounded,
} from './helpers';
import commonStyles from '../../../constants/commonStyles';
import {WHATSAPP_ICON} from '../../../constants/assets';

const StyledTextInput = forwardRef(
  (
    {
      placeholder = '',
      onChange = null,
      onChangeText = null,
      onKeyPress,
      onFocus,
      onBlur,
      errorBoolean = false,
      isOTPBox = false,
      keyboardType = 'default',
      secureTextEntry = false,
      leftIcon: LeftIcon,
      onLeftIconPress = null,
      leftIconProps = {},
      maxLength,
      rightIcon: RightIcon,
      onRightIconPress = null,
      rightIconDisabled = false,
      headerText = '',
      mandatory = false,
      editable = true,
      isContainerTouchable = false,
      onPressContainer = null,
      defaultValue = '',
      textInputStyle,
      containerStyle,
      textInputContainerStyle,
      multiline = false,
      numberOfLines = 1,
      isCustomPlaceholder = false,
      value,
      testID,
      headerContainerStyle,
      showLeftIcon = false,
      autoFocus,
      lastFieldInList,
      onSubmitEditing,
      blurOnSubmit,
      returnKeyType,
      selection,
      leftButtonPressEnabled = false,
      placeholderTextColor,
      showSoftInputOnFocus,
      isLengthBoundedField = false,
    },
    ref,
  ) => {
    const [placeHolderText, setPlaceHolderText] = useState(placeholder);
    const [placeHolderOtherText, setPlaceHolderOtherText] = useState('*');

    return (
      <>
        {Boolean(headerText) && (
          <View style={[styles.headerContainer, headerContainerStyle]}>
            <Text style={styles.headerTextStyle}>{headerText}</Text>
            {mandatory && <Text style={styles.starTextStyle}>{' *'}</Text>}
          </View>
        )}

        <TouchableOpacity
          disabled={editable || isContainerTouchable === false}
          onPress={onPressContainer}
          activeOpacity={TEXT_INPUT_ICONS_ACTIVE_OPACITY}
          style={[
            leftTouchableStyle({
              isOTPBox,
              errorBoolean,
              multiline,
              lastFieldInList,
            }),
            containerStyle,
          ]}>
          {LeftIcon && (
            <TouchableOpacity
              style={styles.leftIconContainer}
              activeOpacity={TEXT_INPUT_ICONS_ACTIVE_OPACITY}
              disabled={leftButtonPressEnabled ? false : isContainerTouchable}
              onPress={onLeftIconPress}>
              <LeftIcon {...leftIconProps} style={styles.iconStyle} />
            </TouchableOpacity>
          )}
          {editable || isContainerTouchable === false ? (
            !isCustomPlaceholder ? (
              <View style={styles.textIconContainer}>
                {showLeftIcon && (
                  <WHATSAPP_ICON
                    width="25"
                    height="25"
                    style={styles.mediaIcon}
                  />
                )}
                <View
                  style={
                    isLengthBoundedField
                      ? styles.textCountContainer
                      : styles.textIconContainer
                  }>
                  <TextInput
                    ref={ref}
                    testID={testID}
                    editable={editable}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={parseString(value)}
                    style={[
                      getTextInputStyle({
                        leftIcon: LeftIcon,
                        rightIcon: RightIcon,
                        isOTPBox,
                        multiline,
                      }),
                      textInputStyle,
                      rightPaddingForLengthBounded(
                        isLengthBoundedField,
                        multiline,
                      ),
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={
                      placeholderTextColor
                        ? placeholderTextColor
                        : COLOR_DISABLED_GREY
                    }
                    onChange={onChange}
                    onChangeText={onChangeText}
                    onKeyPress={onKeyPress}
                    maxLength={maxLength || getMaxLength({isOTPBox, multiline})}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    defaultValue={defaultValue}
                    autoFocus={autoFocus}
                    textContentType={isOTPBox ? 'oneTimeCode' : 'none'}
                    onSubmitEditing={onSubmitEditing}
                    blurOnSubmit={blurOnSubmit}
                    returnKeyType={returnKeyType}
                    selection={selection}
                    showSoftInputOnFocus={showSoftInputOnFocus}
                  />

                  {isLengthBoundedField && (
                    <View
                      style={[
                        styles.countIconContainer,
                        lengthBoundedFieldStyles(multiline),
                      ]}>
                      <Text
                        style={[styles.headerTextStyle, styles.countTextStyle]}>
                        {value.length}/
                        {maxLength
                          ? `${maxLength}`
                          : getMaxLength({isOTPBox, multiline})}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <TextInput
                ref={ref}
                editable={editable}
                autoCapitalize="none"
                autoCorrect={false}
                style={[
                  getTextInputStyle({
                    leftIcon: LeftIcon,
                    rightIcon: RightIcon,
                    isOTPBox,
                    multiline,
                  }),
                  textInputStyle,
                ]}
                onChange={(args) => {
                  if (args.nativeEvent.text === '') {
                    showPlaceHolder({
                      setPlaceHolderText,
                      setPlaceHolderOtherText,
                      placeholder,
                    });
                  } else if (placeHolderOtherText === '*') {
                    removePlaceHolder({
                      setPlaceHolderText,
                      setPlaceHolderOtherText,
                    });
                  }
                  onChange(args.nativeEvent.text);
                }}
                onEndEditing={(e) => {
                  if (e.nativeEvent.text === '') {
                    showPlaceHolder({
                      setPlaceHolderText,
                      setPlaceHolderOtherText,
                      placeholder,
                    });
                  }
                }}
                onChangeText={onChangeText}
                maxLength={maxLength || getMaxLength({isOTPBox, multiline})}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                numberOfLines={numberOfLines}
                defaultValue={defaultValue}
                onSubmitEditing={onSubmitEditing}
                blurOnSubmit={blurOnSubmit}
                returnKeyType={returnKeyType}
                showSoftInputOnFocus={showSoftInputOnFocus}
                onResponderStart={() => {
                  setPlaceHolderOtherText('');
                  setPlaceHolderText('');
                }}>
                <Text>
                  {placeHolderText}
                  <Text style={styles.mandatory}>{placeHolderOtherText}</Text>
                </Text>
              </TextInput>
            )
          ) : (
            <View
              style={[
                getTextInputStyle({
                  leftIcon: LeftIcon,
                  rightIcon: RightIcon,
                  isOTPBox,
                }),
                textInputContainerStyle,
              ]}>
              <Text style={[styles.plainTextStyle, textInputStyle]}>
                {defaultValue || placeholder}
              </Text>
            </View>
          )}
          {RightIcon && (
            <TouchableOpacity
              style={styles.rightIconContainer}
              activeOpacity={TEXT_INPUT_ICONS_ACTIVE_OPACITY}
              disabled={
                isContainerTouchable === true || rightIconDisabled === true
              }
              hitSlop={commonStyles.iconHitSlope}
              onPress={onRightIconPress}>
              {/* {isLoaderVisible ? (
                <Loader
                  isSmall={true}
                  color={COLOR_LIGHT_GREY}
                  style={styles.activityIndicatorStyle}
                />
              ) : (
                <RightIcon />
              )} */}
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </>
    );
  },
);

export default StyledTextInput;
