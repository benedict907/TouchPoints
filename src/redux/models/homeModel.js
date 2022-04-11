import {getState} from '..';
import {
  screenTypes,
  mduQuestions,
  oduQuestions,
  nonOduQuestions,
  subQuestions,
} from '../../constants';
import mime from 'mime';
import crashlytics from '@react-native-firebase/crashlytics';
import {
  authorizationHeader,
  getRequest,
  multipartFileUploadRequest,
  postRequest,
} from '../../utils/API';
import {getConvertedDate} from '../../utils/helpers';
const {
  language,
  serviceRegion,
  subscriber,
  customerType: customerTypeConstant,
  questions,
  thankyouLayout,
} = screenTypes;

export const homeModel = {
  state: {
    appLanguage: null,
    subscriberId: null,
    customerType: null,
    serviceRegions: [],
    userServiceRegion: {},
    currentLayout: language,
    selectedQuestionArray: [],
    selectedQuestion: 0,
    sub_questions: subQuestions,
    mdu_questions: mduQuestions,
    odu_questions: oduQuestions,
    non_odu_questions: nonOduQuestions,
    address: '',
  },
  reducers: {
    setAppLanguage: (state, payload) => {
      return {...state, appLanguage: payload, currentLayout: serviceRegion};
    },
    setUsersServiceRegion: (state, payload) => {
      return {...state, userServiceRegion: payload, currentLayout: subscriber};
    },

    setServiceRegions: (state, payload) => {
      return {...state, serviceRegions: payload};
    },

    setSubscriberId: (state, payload) => {
      return {
        ...state,
        subscriberId: payload,
        currentLayout: customerTypeConstant,
      };
    },
    setCustomerType: (state, payload) => {
      return {...state, customerType: payload, currentLayout: questions};
    },
    setCurrentLayout: (state, payload) => {
      return {...state, currentLayout: payload};
    },
    setSelectedQuestion: (state, payload) => {
      return {...state, selectedQuestion: payload};
    },
    setSelectedQuestionsArray: (state, payload) => {
      return {...state, selectedQuestionArray: payload};
    },
    setAddress: (state, payload) => {
      return {...state, address: payload};
    },
    resetData: (state, payload) => {
      return {
        ...state,
        appLanguage: null,
        subscriberId: null,
        customerType: null,
        userServiceRegion: {},
        currentLayout: language,
        selectedQuestionArray: [],
        selectedQuestion: 0,
        sub_questions: subQuestions,
        mdu_questions: mduQuestions,
        odu_questions: oduQuestions,
        non_odu_questions: nonOduQuestions,
      };
    },

    setSubQuestions: (state, payload) => {
      let {
        mdu_questions,
        odu_questions,
        non_odu_questions,
        sub_questions,
        customerType,
      } = state;
      const customerKey = `${customerType}s`;
      let selectedData = [];
      switch (customerType) {
        case 'mdu_question':
          selectedData = mdu_questions;
          break;
        case 'odu_question':
          selectedData = odu_questions;
          break;
        case 'non_odu_question':
          selectedData = non_odu_questions;
          break;
      }

      return {
        ...state,
        [customerKey]: [...selectedData, ...sub_questions],
        selectedQuestionArray: [...selectedData, ...sub_questions],
      };
    },
    updateImage: (state, payload) => {
      let {customerType, selectedQuestion, selectedQuestionArray} = state;
      const customerKey = `${customerType}s`;
      let tempQuestions = [];
      tempQuestions = selectedQuestionArray;
      tempQuestions[selectedQuestion].capturedImage = payload;
      return {
        ...state,
        [customerKey]: [...tempQuestions],
        selectedQuestionArray: [...tempQuestions],
      };
    },
  },
  effects: dispatch => ({
    getServiceRegions: async requestBody => {
      try {
        await getRequest(
          '/getAllServiceRegion',
          authorizationHeader(),
          null,
          (_err, response) => {
            console.log('errrrrr', _err);
            if (!_err) {
              dispatch.homeModel.setServiceRegions(response.data);
            } else {
              crashlytics().log(`saveSubscriberDetails  ${_err}`);
            }
          },
        );
      } catch (error) {
        crashlytics().log(`getServiceRegions  ${error}`);
        console.log(error);
      }
    },
    saveSubscriberDetails: async requestBody => {
      try {
        console.log('requestBody', requestBody);
        await postRequest(
          '/saveQuestions',
          authorizationHeader(),
          JSON.stringify(requestBody),
          (_err, response) => {
            // dispatch.homeModel.setServiceRegions(response.data);
          },
        );
      } catch (error) {
        crashlytics().log(`saveSubscriberDetails  ${error}`);
        console.log(error);
      }
    },

    saveQuestionDetails: async (requestBody, models) => {
      try {
        dispatch.authModel.setIsLoading(true);
        const {lastQuestion, subArray} = requestBody || {};
        const {
          homeModel: {
            subscriberId,
            customerType,
            selectedQuestion,
            selectedQuestionArray,
          },
        } = getState();
        let formData = new FormData();
        let key = '';
        let locationKey = '';
        let timeKey = '';
        let questionLength = selectedQuestionArray.length;

        const {id, capturedImage} = lastQuestion
          ? lastQuestion
          : selectedQuestionArray[selectedQuestion];
        switch (customerType) {
          case 'mdu_question':
            key = `mdu_question${id}`;
            locationKey = `mdu_location_${id}`;
            timeKey = `mdu_time_${id}`;
            break;
          case 'odu_question':
          case 'non_odu_question':
            key = `non_mdu_question${id}`;
            locationKey = `non_mdu_location_${id}`;
            timeKey = `non_mdu_time_${id}`;
            break;
        }

        formData.append('subscriber_id', subscriberId);
        formData.append('page', key);
        formData.append(locationKey, models.homeModel.address);
        formData.append(timeKey, getConvertedDate(new Date()));

        if (subArray?.length > 0) {
          subArray.map(item => {
            let temp_key = '';
            Object.keys(item).forEach(key_val => {
              temp_key = key_val;
            });
            var filename = item[temp_key].replace(/^.*[\\\/]/, '');

            formData.append(temp_key, {
              name: filename,
              type: mime.getType(item[temp_key]),
              uri: item[temp_key],
            });
          });
        } else {
          var filename = capturedImage.replace(/^.*[\\\/]/, '');

          formData.append(key, {
            name: filename,
            type: mime.getType(capturedImage),
            uri: capturedImage,
          });
        }
        await multipartFileUploadRequest(
          'POST',
          formData,
          '/saveQuestions',
          (error, response) => {
            if (response) {
              console.log('adfs', response);
              dispatch.authModel.setIsLoading(false);
              if (selectedQuestion + 1 === questionLength) {
                dispatch.homeModel.setCurrentLayout(thankyouLayout);
              } else {
                dispatch.homeModel.setSelectedQuestion(selectedQuestion + 1);
              }
            } else if (error) {
              dispatch.authModel.setIsLoading(false);
            }
          },
        );
      } catch (error) {
        dispatch.authModel.setIsLoading(false);
        crashlytics().log(`saveQuestionDetails  ${error}`);
        console.log(error);
      }
    },
  }),
};
