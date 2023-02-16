import {getState} from '..';
import {
  screenTypes,
  mduQuestions,
  oduQuestions,
  nonOduQuestions,
  subQuestions,
  LOGIN_SCREEN,
} from '../../constants';
import {isEmpty} from 'lodash';
import crashlytics from '@react-native-firebase/crashlytics';
import {
  authorizationHeader,
  getHeadersWithToken,
  getRequest,
  postRequest,
  multipartFileUploadRequest,
} from '../../utils/API';
import {getConvertedDate} from '../../utils/helpers';
import {uploadPhoto} from '../../utils/aws';
import {getKey} from '../../components/QuestionComponent/helper';
import {Alert, Linking} from 'react-native';
import {getVersion} from 'react-native-device-info';
import isNetworkAvailable from '../../HOC/useNetInfo';
import {navigateAndSimpleReset} from '../../Navigation/Root';

const {
  language,
  subscriber,
  customerType: customerTypeConstant,
  auditType,
  questions,
  thankyouLayout,
} = screenTypes;

export const homeModel = {
  state: {
    appLanguage: null,
    subscriberId: null,
    customerType: null,
    auditType: 1,
    refNumber: '',
    serviceRegions: [],
    userServiceRegion: {},
    currentLayout: language,
    previousLayout: null,
    selectedQuestionArray: [],
    selectedQuestion: 0,
    sub_questions: JSON.parse(JSON.stringify(subQuestions)),
    mdu_questions: JSON.parse(JSON.stringify(mduQuestions)),
    odu_questions: JSON.parse(JSON.stringify(oduQuestions)),
    non_odu_questions: JSON.parse(JSON.stringify(nonOduQuestions)),
    address: '',
    requestData: [],
    subRequestData: [],
    offlineData: [],
  },
  reducers: {
    setCredentials: (state, payload) => {
      return {...state, credentials: payload};
    },

    setOfflineData: (state, payload) => {
      const {offlineData} = state;
      return {...state, offlineData: [...offlineData, payload]};
    },

    setRequestData: (state, payload) => {
      return {...state, requestData: [...state.requestData, payload]};
    },
    setReferenceNumber: (state, payload) => {
      return {...state, refNumber: payload};
    },
    setSubRequestData: (state, payload) => {
      return {
        ...state,
        subRequestData: [...state.subRequestData, payload],
      };
    },
    setAppLanguage: (state, payload) => {
      return {
        ...state,
        appLanguage: payload,
        previousLayout: language,
        currentLayout: subscriber,
      };
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
        previousLayout: subscriber,
        currentLayout: auditType,
      };
    },
    setAuditType: (state, payload) => {
      return {
        ...state,
        auditType: payload,
        previousLayout: auditType,
        currentLayout: customerTypeConstant,
      };
    },
    setCustomerType: (state, payload) => {
      return {...state, customerType: payload};
    },

    setCurrentLayout: (state, payload) => {
      return {
        ...state,
        previousLayout: state.currentLayout,
        currentLayout: payload,
      };
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
        refNumber: '',
        customerType: null,
        userServiceRegion: {},
        currentLayout: language,
        selectedQuestionArray: [],
        selectedQuestion: 0,
        sub_questions: JSON.parse(JSON.stringify(subQuestions)),
        mdu_questions: JSON.parse(JSON.stringify(mduQuestions)),
        odu_questions: JSON.parse(JSON.stringify(oduQuestions)),
        non_odu_questions: JSON.parse(JSON.stringify(nonOduQuestions)),
        requestData: [],
        subRequestData: [],
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
      tempQuestions[selectedQuestion].compressedImage = payload;
      return {
        ...state,
        [customerKey]: [...tempQuestions],
        selectedQuestionArray: [...tempQuestions],
      };
    },
  },
  effects: dispatch => ({
    getCurrentVersion: async requestBody => {
      console.log('sdfsdf', 'getCurrentVersion');
      try {
        await getRequest(
          '/getApiVersion',
          authorizationHeader(),
          null,
          (_err, response) => {
            const currentVersion = getVersion();
            // if (currentVersion !== response.data.current_app_version) {
            //   Alert.alert(
            //     '',
            //     'Please update app to the newest version',
            //     [
            //       {
            //         text: 'OK',
            //         onPress: () => {
            //           Linking.openURL(
            //             'https://play.google.com/store/apps/details?id=com.questionsapp',
            //           );
            //         },
            //       },
            //     ],
            //     {cancelable: false},
            //   );
            // }
          },
        );
      } catch (error) {
        console.log('getCurrentVersion', error);
      }
    },
    getServiceRegions: async requestBody => {
      console.log('getAllServiceRegion');
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
        console.log('getAllServiceRegion', error);
      }
    },
    saveSubscriberDetails: async requestBody => {
      const {
        subscriber_id,
        page,
        customer_type,
        language: appLanguage,
        champion_audit,
        navigation,
      } = requestBody;

      try {
        await postRequest(
          '/saveQuestions',
          getHeadersWithToken(),
          JSON.stringify({
            subscriber_id,
            page,
            customer_type,
            language: appLanguage,
            champion_audit,
          }),
          (_err, response) => {
            const {response_code, data, errors} = response;
            if (response_code === 1 || response_code === '1') {
              dispatch.homeModel.setCurrentLayout(questions);
              dispatch.homeModel.setCredentials(data);
            } else if (response_code === '-1') {
              Alert.alert('', errors);
              navigation.navigate(LOGIN_SCREEN);
              dispatch.homeModel.setCurrentLayout(language);
            } else {
              Alert.alert('', errors);
              dispatch.homeModel.setCurrentLayout(subscriber);
            }
          },
        );
      } catch (error) {
        crashlytics().log(`saveSubscriberDetails  ${error}`);
        console.log('saveSubscriberDetails', error);
      }
    },

    saveQuestionDetails: async (requestBody, models) => {
      try {
        const {lastQuestion, isNoPressed} = requestBody || {};
        if (!(await isNetworkAvailable()) && !isEmpty(lastQuestion)) {
          Alert.alert('', 'No internet connection');
          return;
        }
        dispatch.authModel.setIsLoading(true);
        const {
          homeModel: {
            subscriberId,
            customerType,
            selectedQuestion,
            selectedQuestionArray,
          },
        } = getState();
        const {id, capturedImage, isSubQuestion, compressedImage} = lastQuestion
          ? lastQuestion || {}
          : selectedQuestionArray[selectedQuestion] || {};

        let body = {};
        let questionLength = selectedQuestionArray.length;

        body.subscriber_id = subscriberId;
        body.page = getKey({id, customerType});
        body.location = models.homeModel.address;
        body.time = getConvertedDate(new Date());
        body.file = capturedImage;
        body.compressedImage = compressedImage;
        if (isSubQuestion) {
          dispatch.homeModel.setSubRequestData(body);
        } else {
          dispatch.homeModel.setRequestData(body);
        }

        if (lastQuestion) {
          const length = models.homeModel.requestData.length;
          let data = models.homeModel.requestData;

          if (isNoPressed) {
            // navigateAndSimpleReset(LOGIN_SCREEN);
            // dispatch.homeModel.setCurrentLayout(language);

            data.push({
              subscriber_id: subscriberId,
              page: body.page,
              location: models.homeModel.address,
              time: getConvertedDate(new Date()),
              option: models.homeModel.subRequestData.length > 0 ? 1 : 0,
              option_values:
                models.homeModel.subRequestData.length > 0
                  ? [...models.homeModel.subRequestData, body]
                  : [],
            });
          } else {
            let formdata = new FormData();
            const tempKey = data[length - 1].page;
            data[length - 1] = {
              subscriber_id: subscriberId,
              page: tempKey,
              location: models.homeModel.address,
              file: formdata.append('file', await uploadPhoto(body.file)),
              time: getConvertedDate(new Date()),
              option: models.homeModel.subRequestData.length > 0 ? 1 : 0,
              option_values:
                models.homeModel.subRequestData.length > 0
                  ? [...models.homeModel.subRequestData, body]
                  : [],
            };
          }
          let mainFormData = new FormData();
          mainFormData.append('subscriber_id', subscriberId);
          // mainFormData.append('mdu_question1_page', 'mdu_question1');
          // mainFormData.append('mdu_question1_location', '');
          // mainFormData.append('mdu_question1_time', '');
          // mainFormData.append(
          //   'mdu_question1_file',
          //   await uploadPhoto(data[0].file),
          // );

          await Promise.all(
            data.map(async item => {
              console.log('itemm', item);
              // let formdata = new FormData();

              mainFormData.append(`${item.page}_page`, item.page);
              mainFormData.append(
                `${item.page}_location`,
                models.homeModel.address,
              );
              mainFormData.append(
                `${item.page}_time`,
                getConvertedDate(new Date()),
              );

              if (item.file && item.file !== '') {
                mainFormData.append(
                  `${item.page}_file`,
                  await uploadPhoto(item.file),
                );
              }
              // if (item.option === 1) {
              //   item.option_values = await Promise.all(
              //     item.option_values.map(async values => {
              //       if (values.file) {
              //         formData.append(values.page, await uploadPhoto(values.file));
              //         // values.file = await uploadPhoto(values.file);
              //       }
              //       // return values;
              //     }),
              //   );
              // }

              // mainFormData.append(item.page, JSON.stringify(formdata));
            }),
          );

          // const hgch = await uploadPhoto(data[0].file);
          // let formData = new FormData();
          // formData.append('subscriber_id', subscriberId);
          // await Promise.all(
          //   data.map(async item => {
          //     if (item.file && item.file !== '') {
          //       formData.append(item.page, await uploadPhoto(item.file));
          //       // item.file = await uploadPhoto(item.file);
          //     }

          //     // console.log('itemm', formData);
          //     if (item.option === 1) {
          //       item.option_values = await Promise.all(
          //         item.option_values.map(async values => {
          //           if (values.file) {
          //             formData.append(
          //               values.page,
          //               await uploadPhoto(values.file),
          //             );
          //             // values.file = await uploadPhoto(values.file);
          //           }
          //           // return values;
          //         }),
          //       );
          //     }

          //     return formData;
          //   }),
          // );

          console.log('requestData!!!', JSON.stringify(mainFormData));

          await multipartFileUploadRequest(
            'POST',
            mainFormData,
            '/saveInnerQuestions',
            (error, response) => {
              console.log('multipart', {error, response});
              if (response) {
                const {
                  response_code,
                  data: {ref_number},
                  errors,
                } = response;

                if (response_code === '1') {
                  dispatch.authModel.setIsLoading(false);
                  dispatch.homeModel.setReferenceNumber(ref_number);
                  dispatch.homeModel.setCurrentLayout(thankyouLayout);
                  dispatch.homeModel.setSelectedQuestion(0);
                } else if (response_code === '-1') {
                  navigateAndSimpleReset(LOGIN_SCREEN);
                  dispatch.homeModel.setCurrentLayout(language);
                } else if (error) {
                  Alert.alert('', errors);
                  dispatch.authModel.setIsLoading(false);
                }

                // );
              } else if (error) {
                // onFailure(error);
              }
            },
          );

          // await postRequest(
          //   '/saveInnerQuestions',
          //   getHeadersWithToken(),
          //   JSON.stringify(hgch),
          //   (error, response) => {
          //     const {
          //       response_code,
          //       data: {ref_number},
          //       errors,
          //     } = response;

          //     if (response_code === '1') {
          //       dispatch.authModel.setIsLoading(false);
          //       dispatch.homeModel.setReferenceNumber(ref_number);
          //       dispatch.homeModel.setCurrentLayout(thankyouLayout);
          //       dispatch.homeModel.setSelectedQuestion(0);
          //     } else if (response_code === '-1') {
          //       navigateAndSimpleReset(LOGIN_SCREEN);
          //       dispatch.homeModel.setCurrentLayout(language);
          //     } else if (error) {
          //       Alert.alert('', errors);
          //       dispatch.authModel.setIsLoading(false);
          //     }
          //   },
          // );
        } else {
          dispatch.authModel.setIsLoading(false);

          if (selectedQuestion + 1 === questionLength) {
            dispatch.homeModel.setCurrentLayout(thankyouLayout);
          } else {
            dispatch.homeModel.setSelectedQuestion(selectedQuestion + 1);
          }
        }
        // });
      } catch (error) {
        dispatch.authModel.setIsLoading(false);
        dispatch.homeModel.setReferenceNumber('ref_number');
        dispatch.homeModel.setCurrentLayout(thankyouLayout);
        dispatch.homeModel.setSelectedQuestion(0);

        dispatch.authModel.setIsLoading(false);
        console.log(error);
        crashlytics().log(`saveInnerQuestions  ${error}`);
      }
    },
  }),
};
