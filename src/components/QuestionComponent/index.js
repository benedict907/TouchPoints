import React, {useCallback, useEffect} from 'react';
import {Image, Text, View, FlatList, Alert} from 'react-native';
import {connect} from 'react-redux';
import CustomButton from '../common/CustomButton';
import styles from './styles';
import {IMAGE_PREVIEW_SCREEN, VIDEO_CAPTURE_SCREEN} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {getLanguage} from '../../localization';
import {getQuestionType} from './helper';
import Video from 'react-native-video';
import Loader from '../common/Loader';

const list = [
  {id: 'header'},
  {id: 'orginalImage'},
  {id: 'capturedImage'},
  {id: 'buttons'},
];

const QuestionComponent = ({
  customerType,
  selectedQuestion,
  saveQuestionDetails,
  selectedQuestionArray,
  setSubQuestions,
  appLanguage,
  isLoading,
  setIsLoading,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const validateSubscription = useCallback(async () => {
    if (selectedQuestion + 1 === selectedQuestionArray.length) {
      if (selectedQuestionValue.capturedImage !== '') {
        saveQuestionDetails({lastQuestion: selectedQuestionValue});
      } else {
        Alert.alert('', 'Please select an image');
      }
    } else {
      if (selectedQuestionValue.capturedImage !== '') {
        saveQuestionDetails();
      } else {
        Alert.alert('', 'Please select an image');
      }
    }
  }, [
    selectedQuestion,
    selectedQuestionArray.length,
    saveQuestionDetails,
    selectedQuestionValue,
  ]);

  const selectedQuestionValue = getQuestionType({
    selectedQuestionArray,
    selectedQuestion,
  });

  const renderRow = ({item}) => {
    const {id} = item;
    switch (id) {
      case 'header':
        return !isLoading ? (
          <Text style={styles.headerText}>
            {appLanguage === 'en'
              ? selectedQuestionValue.questionHeader
              : selectedQuestionValue.questionHeaderTamil}
          </Text>
        ) : null;
      case 'orginalImage':
        return !isLoading ? (
          !selectedQuestionValue.isQuestion ? (
            <Image
              style={styles.imageStyle}
              source={selectedQuestionValue.image}
              resizeMode="center"
            />
          ) : (
            <View style={styles.questionContainer}>
              <CustomButton
                showLoader={true}
                title={getLanguage('yesText')}
                onPress={() => {
                  saveQuestionDetails();
                  setSubQuestions();
                }}
              />
              <CustomButton
                showLoader={false}
                title={getLanguage('noText')}
                onPress={async () =>
                  saveQuestionDetails({
                    lastQuestion: selectedQuestionValue,
                    isNoPressed: true,
                  })
                }
              />
            </View>
          )
        ) : (
          <View style={styles.loaderContainer}>
            <Text style={styles.loadingText}>
              {getLanguage('pleaseWaitText')}
            </Text>
            <Loader />
          </View>
        );

      case 'capturedImage':
        return !isLoading ? (
          selectedQuestionValue.capturedImage ? (
            selectedQuestionValue.isVideo ? (
              <Video
                source={{
                  uri: selectedQuestionValue.capturedImage,
                }} // Can be a URL or a local file.
                // ref={playerRef} // Store reference
                controls={false}
                autoplay={true}
                repeat={true}
                fullscreen={false}
                onBuffer={console.log('buffering')} // Callback when remote video is buffering
                onError={err => console.warn(err)} // Callback when video cannot be loaded
                style={styles.capturedVideoStyle}
              />
            ) : (
              <Image
                style={styles.capturedImageStyle}
                source={{
                  uri: selectedQuestionValue.capturedImage,
                }}
                resizeMode="stretch"
              />
            )
          ) : null
        ) : null;
      case 'buttons':
        return !isLoading ? (
          !selectedQuestionValue.isQuestion ? (
            <>
              <CustomButton
                showLoader={true}
                title={
                  selectedQuestionValue.capturedImage
                    ? getLanguage('nextText')
                    : selectedQuestionValue.isVideo
                    ? getLanguage('takeVideo')
                    : getLanguage('takeSnapShot')
                }
                style={styles.snapShotStyle}
                onPress={() =>
                  selectedQuestionValue.capturedImage
                    ? validateSubscription()
                    : navigation.navigate(
                        selectedQuestionValue.isVideo
                          ? VIDEO_CAPTURE_SCREEN
                          : IMAGE_PREVIEW_SCREEN,
                        {
                          customerType,
                          selectedQuestion,
                        },
                      )
                }
              />
              {selectedQuestionValue.capturedImage ? (
                <CustomButton
                  title={getLanguage('retryText')}
                  showLoader={false}
                  style={styles.snapShotStyle}
                  onPress={() =>
                    navigation.navigate(
                      selectedQuestionValue.isVideo
                        ? VIDEO_CAPTURE_SCREEN
                        : IMAGE_PREVIEW_SCREEN,
                      {
                        customerType,
                        selectedQuestion,
                      },
                    )
                  }
                />
              ) : null}
            </>
          ) : null
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
    requestData,
    customerType,
    selectedQuestion,
    appLanguage,
    selectedQuestionArray,
  },
}) => ({
  isLoading,
  requestData,
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
    submitQuestion,
  },
}) => ({
  setIsLoading,
  setCustomerType,
  setSubQuestions,
  setSelectedQuestion,
  saveQuestionDetails,
  setCurrentLayout,
  submitQuestion,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionComponent);
