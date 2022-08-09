import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getLanguage} from '../../localization';
import CustomButton from '../common/CustomButton';
import {onRadioButtonSelected} from './helper';
import styles from './styles';

const CustomerTypeComponent = ({setAuditType}) => {
  const [radioButtonValues, setRadioButtonValues] = useState([
    {
      title: 'Installer Audit',
      selected: true,
      value: 1,
    },
    {
      title: 'Champion installer audit',
      selected: false,
      value: 2,
    },
    {
      title: 'ASM/CSM/Trainer Audit',
      selected: false,
      value: 3,
    },
  ]);
  const selectAuditType = () => {
    let selectedButton = radioButtonValues.filter(item => item.selected);
    setAuditType(selectedButton[0].value);
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
      <Text style={styles.headerText}>{getLanguage('selectAuditType')}</Text>
      {radioButtonValues.map((item, index) => (
        <RadioButton item={item} key={index} index={index} />
      ))}

      <CustomButton
        title={getLanguage('nextText')}
        style={styles.nextButtonStyle}
        onPress={() => selectAuditType()}
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

const mapDispatchToProps = ({homeModel: {setAuditType}}) => ({
  setAuditType,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerTypeComponent);
