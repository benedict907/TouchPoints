import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {LanguageConstants} from '../../constants';
import {PLACEHOLDER_COLOR} from '../../constants/colors';
import {getLanguage} from '../../localization';
import CustomButton from '../common/CustomButton';
import StyledTextInput from '../common/StyledTextInput';
import styles from './styles';

const SubscriberComponent = ({
  appLanguage,
  setSubscriberId,
  saveSubscriberDetails,
  userServiceRegion,
}) => {
  const [subscriberID, setSubscriberID] = useState('');
  const [showSubscriptionError, setSubscriptionError] = useState(null);

  const validateSubscription = () => {
    if (subscriberID.length === 10) {
      setSubscriberId(subscriberID);
      saveSubscriberDetails({
        subscriber_id: subscriberID,
        page: 'question1',
        language: LanguageConstants[appLanguage],
        service_region: userServiceRegion,
      });
    } else {
      setSubscriptionError(true);
    }
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.headerText}>{getLanguage('enterSubscriberID')}</Text>
      <StyledTextInput
        onChangeText={text => {
          setSubscriberID(text.replace(/[^0-9]/g, ''));
          setSubscriptionError(null);
        }}
        keyboardType="numeric"
        value={subscriberID}
        maxLength={10}
        placeholderTextColor={PLACEHOLDER_COLOR}
        placeholder={getLanguage('customerIdPlaceHolder')}
        containerStyle={styles.containerStyle}
        textInputStyle={styles.textInputContainerStyle}
      />
      {showSubscriptionError ? (
        <Text style={styles.errorText}>
          {getLanguage('subscriptionIdError')}
        </Text>
      ) : null}
      <CustomButton
        title={getLanguage('nextText')}
        style={styles.nextButtonStyle}
        onPress={() => validateSubscription()}
      />
    </View>
  );
};
const mapStateToProps = ({homeModel: {appLanguage, userServiceRegion}}) => ({
  appLanguage,
  userServiceRegion,
});

const mapDispatchToProps = ({
  homeModel: {setSubscriberId, saveSubscriberDetails},
}) => ({
  setSubscriberId,
  saveSubscriberDetails,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscriberComponent);
