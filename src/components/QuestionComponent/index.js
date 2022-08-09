import React, {useCallback, useState} from 'react';
import {Image, Text, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import CustomButton from '../common/CustomButton';

import styles from './styles';
import {IMAGE_PREVIEW_SCREEN, screenTypes} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {getLanguage} from '../../localization';
import {getKeyValue, getQuestionType} from './helper';

const list = [
  {id: 'header'},
  {id: 'orginalImage'},
  {id: 'capturedImage'},
  {id: 'buttons'},
];

const QuestionComponent = ({
  customerType,
  selectedQuestion,
  setSelectedQuestion,
  saveQuestionDetails,
  selectedQuestionArray,
  setSubQuestions,
  appLanguage,
  setCurrentLayout,
}) => {
  const {thankyouLayout} = screenTypes;
  const [subArray, setSubArray] = useState([]);
  const [lastQuestion, setLastQuestion] = useState({});
  const navigation = useNavigation();

  const validateSubscription = useCallback(() => {
    if (!selectedQuestionValue.isSubQuestion) {
      saveQuestionDetails();
    } else {
      const {id, capturedImage} = selectedQuestionValue;
      let tempArray = subArray;
      tempArray.push({[getKeyValue({customerType, id: id})]: capturedImage});
      setSubArray(tempArray);

      if (selectedQuestion + 1 === selectedQuestionArray.length) {
        saveQuestionDetails({lastQuestion, subArray});
      } else {
        setSelectedQuestion(selectedQuestion + 1);
      }
    }
  }, [
    customerType,
    lastQuestion,
    saveQuestionDetails,
    selectedQuestion,
    selectedQuestionArray.length,
    selectedQuestionValue,
    setSelectedQuestion,
    subArray,
  ]);

  const selectedQuestionValue = getQuestionType({
    selectedQuestionArray,
    selectedQuestion,
  });

  const renderRow = ({item}) => {
    const {id} = item;
    switch (id) {
      case 'header':
        return (
          <Text style={styles.headerText}>
            {appLanguage === 'en'
              ? selectedQuestionValue.questionHeader
              : selectedQuestionValue.questionHeaderTamil}
          </Text>
        );
      case 'orginalImage':
        return !selectedQuestionValue.isQuestion ? (
          <Image
            style={styles.imageStyle}
            source={selectedQuestionValue.image}
            resizeMode="center"
          />
        ) : (
          <View style={styles.questionContainer}>
            <CustomButton
              title={getLanguage('yesText')}
              onPress={() => {
                setLastQuestion(selectedQuestionValue);
                setSubQuestions();
                setSelectedQuestion(selectedQuestion + 1);
              }}
            />
            <CustomButton
              title={getLanguage('noText')}
              onPress={() => {
                saveQuestionDetails({isNoPressed: true});
                setCurrentLayout(thankyouLayout);
              }}
            />
          </View>
        );
      case 'capturedImage':
        return selectedQuestionValue.capturedImage ? (
          <Image
            style={styles.capturedImageStyle}
            source={{
              uri: selectedQuestionValue.capturedImage,
            }}
            resizeMode="stretch"
          />
        ) : null;
      case 'buttons':
        return !selectedQuestionValue.isQuestion ? (
          <>
            <CustomButton
              showLoader={true}
              title={
                selectedQuestionValue.capturedImage
                  ? getLanguage('nextText')
                  : getLanguage('takeSnapShot')
              }
              style={styles.snapShotStyle}
              onPress={() =>
                selectedQuestionValue.capturedImage
                  ? validateSubscription()
                  : navigation.navigate(IMAGE_PREVIEW_SCREEN, {
                      customerType,
                      selectedQuestion,
                    })
              }
            />
            {selectedQuestionValue.capturedImage ? (
              <CustomButton
                title={getLanguage('retryText')}
                showLoader={false}
                style={styles.snapShotStyle}
                onPress={() =>
                  navigation.navigate(IMAGE_PREVIEW_SCREEN, {
                    customerType,
                    selectedQuestion,
                  })
                }
              />
            ) : null}
          </>
        ) : null;
    }
  };

  return (
    <View>
      <FlatList renderItem={renderRow} data={list} />
    </View>
  );
};

const mapStateToProps = ({
  authModel: {isLoading},
  homeModel: {
    customerType,
    selectedQuestion,
    appLanguage,
    selectedQuestionArray,
  },
}) => ({
  isLoading,
  customerType,
  selectedQuestion,
  appLanguage,
  selectedQuestionArray,
});

const mapDispatchToProps = ({
  authModel: {setIsLoading},
  homeModel: {
    setCustomerType,
    setSelectedQuestion,
    setSubQuestions,
    saveQuestionDetails,
    setCurrentLayout,
  },
}) => ({
  setIsLoading,
  setCustomerType,
  setSubQuestions,
  setSelectedQuestion,
  saveQuestionDetails,
  setCurrentLayout,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionComponent);
