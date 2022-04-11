import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getLanguage} from '../../localization';
import CustomButton from '../common/CustomButton';
import {onRadioButtonSelected} from './helper';
import styles from './styles';

const CustomerTypeComponent = ({
  subscriberId,
  setCustomerType,
  saveSubscriberDetails,
  setSelectedQuestionsArray,
  mdu_questions,
  odu_questions,
  non_odu_questions,
}) => {
  const [radioButtonValues, setRadioButtonValues] = useState([
    {
      title: 'MDU',
      selected: true,
      value: 'mdu_question',
      api_value: 'mdu',
      data: mdu_questions,
    },
    {
      title: 'ODU',
      selected: false,
      value: 'odu_question',
      api_value: 'odu',
      data: odu_questions,
    },
    {
      title: 'NON ODU',
      selected: false,
      value: 'non_odu_question',
      api_value: 'non_odu',
      data: non_odu_questions,
    },
  ]);
  const validateSubscription = () => {
    let selectedButton = radioButtonValues.filter(item => item.selected);
    setCustomerType(selectedButton[0].value);
    setSelectedQuestionsArray(selectedButton[0].data);
    saveSubscriberDetails({
      subscriber_id: subscriberId,
      page: 'question2',
      customer_type: selectedButton[0].api_value,
    });
  };

  const RadioButton = ({item: {title, selected}, index}) => (
    <TouchableOpacity
      onPress={() =>
        onRadioButtonSelected({
          radioButtonValues,
          index,
          setRadioButtonValues,
        })
      }
      style={styles.radioStyle}>
      <View style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonSelected} /> : null}
      </View>
      <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Text style={styles.headerText}>{getLanguage('selectCustomerType')}</Text>
      {radioButtonValues.map((item, index) => (
        <RadioButton item={item} key={index} index={index} />
      ))}

      <CustomButton
        title={getLanguage('nextText')}
        style={styles.nextButtonStyle}
        onPress={() => validateSubscription()}
      />
    </>
  );
};

const mapStateToProps = ({
  homeModel: {subscriberId, mdu_questions, odu_questions, non_odu_questions},
}) => ({
  subscriberId,
  mdu_questions,
  odu_questions,
  non_odu_questions,
});

const mapDispatchToProps = ({
  homeModel: {
    setCustomerType,
    saveSubscriberDetails,
    setSelectedQuestionsArray,
  },
}) => ({
  setCustomerType,
  saveSubscriberDetails,
  setSelectedQuestionsArray,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerTypeComponent);
