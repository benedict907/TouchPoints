import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getLanguage} from '../../localization';
import CustomButton from '../common/CustomButton';
import {onRadioButtonSelected} from './helper';
import styles from './styles';

const ServiceRegionComponent = ({serviceRegions, setUsersServiceRegion}) => {
  const [radioButtonValues, setRadioButtonValues] = useState(serviceRegions);

  useEffect(() => {
    if (radioButtonValues) {
      let temp = radioButtonValues;
      temp[0].selected = true;
      setRadioButtonValues([...temp]);
    }
  }, []);

  const validateSubscription = () => {
    let selectedButton = serviceRegions.filter(item => item.selected);
    setUsersServiceRegion(selectedButton[0].id);
  };

  const RadioButton = ({item: {service_region, selected}, index}) => (
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
      <Text style={styles.titleStyle}>{service_region}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Text style={styles.headerText}>{getLanguage('enterServiceRegion')}</Text>
      {radioButtonValues.map((item, index) => (
        <RadioButton item={item} key={item.id} index={index} />
      ))}

      <CustomButton
        title={getLanguage('nextText')}
        style={styles.nextButtonStyle}
        onPress={() => validateSubscription()}
      />
    </>
  );
};

const mapStateToProps = ({homeModel: {serviceRegions}}) => ({
  serviceRegions,
});

const mapDispatchToProps = ({
  homeModel: {setCustomerType, setUsersServiceRegion},
}) => ({
  setCustomerType,
  setUsersServiceRegion,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceRegionComponent);
