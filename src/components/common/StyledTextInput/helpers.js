import styles from './styles';

const leftTouchableStyle = ({
  isOTPBox,
  errorBoolean,
  multiline,
  lastFieldInList,
}) => [
  styles.textInputContainer,
  isOTPBox ? styles.isOTPEnabled : styles.isOTPDisabled,
  isOTPBox && lastFieldInList && styles.otpBoxlastFieldInList,
  errorBoolean ? styles.borderColorDisabled : styles.borderColorEnabled,
  multiline ? styles.multilineTextInput : {},
];

const getTextInputStyle = ({isOTPBox, multiline}) => [
  styles.textInputStyle,
  isOTPBox ? styles.OTPText : null,
  multiline ? styles.multilineTextInputPlaceholder : {},
];
const getMaxLength = ({isOTPBox, multiline}) => {
  if (multiline) {
    return 150;
  } else {
    isOTPBox ? 1 : 50;
  }
};
const showPlaceHolder = ({
  setPlaceHolderText,
  setPlaceHolderOtherText,
  placeholder,
}) => {
  setPlaceHolderText(placeholder);
  setPlaceHolderOtherText('*');
};
const removePlaceHolder = ({setPlaceHolderText, setPlaceHolderOtherText}) => {
  setPlaceHolderText('');
  setPlaceHolderOtherText('');
};

const lengthBoundedFieldStyles = (multiline) => {
  return multiline
    ? styles.lengthBoundedMultiLineField
    : styles.lengthBoundedSingleLineField;
};

const rightPaddingForLengthBounded = (lengthBounded, multiline) => {
  return lengthBounded && !multiline ? styles.lengthBoundedField : {};
};

export {
  leftTouchableStyle,
  getTextInputStyle,
  getMaxLength,
  showPlaceHolder,
  removePlaceHolder,
  lengthBoundedFieldStyles,
  rightPaddingForLengthBounded,
};
