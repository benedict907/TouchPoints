import NetInfo from '@react-native-community/netinfo';
import {API_SUCCESS, API_URL} from '../constants';
import {Alert} from 'react-native';
import {getState} from '../redux';
import isNetworkAvailable from '../HOC/useNetInfo';
import crashlytics from '@react-native-firebase/crashlytics';
const API_CONNECTION_TIMEOUT = 10000;
const SERVER_ERROR_KEY = 500;
/**
 * Invokes a network request to backend and return with a response or error based on
 * the request method.
 *
 * TODO:// Passing the public key in a format `sha256/<key>` to handle
 * public key pinning recommanded by `react-native-ssl-pinning`. Once done remove `TODO://`
 *
 * @param {*} url api URL to be hit
 * @param {*} method request method (one of `GET`, `POST`, or `PUT`)
 * @param {*} headers request headers
 * @param {*} params data to be send to api
 * @param {*} completion completion handler which will invoke either success or failure
 *                       and retrun the response or error to the called function
 */

const invokeNetworkRequest = async (
  url,
  method,
  headers,
  params,
  completion,
) => {
  const {
    authModel: {isConnected},
  } = getState();

  try {
    console.log('REQUEST', {url, method, headers, params});
    let response = null;
    if (method !== 'GET') {
      response = await fetch(url, {
        method: method,
        headers: headers,
        body: params,
        disableAllSecurity: true,
        timeoutInterval: 60000,
      });
    } else {
      response = await fetch(url, {
        method: method,
        headers: headers,
        disableAllSecurity: true,
        timeoutInterval: API_CONNECTION_TIMEOUT,
      });
    }

    if (response) {
      if (response.status === 204) {
        completion(null, '');
        return '';
      } else {
        let jsonResponse = await response.json();
        console.log('RESPONSE', jsonResponse);
        completion && completion(null, jsonResponse);
        return jsonResponse;
      }
    }
  } catch (err) {
    try {
      console.log('err', err);
      crashlytics().log(`API_ERROR  ${err}`);
      if (!(await isNetworkAvailable())) {
        Alert.alert('', 'No Internet Connection');
      } else {
        Alert.alert('', 'Server Error');
        const error = err.json ? await err.json() : err;
        const {message} = error;
      }
    } catch (error) {
      crashlytics().log(`API_ERROR  ${error}`);
      if (!(await isNetworkAvailable())) {
        Alert.alert('', 'No Internet Connection');
      }
      const exception = {
        key: 500,
        message: 'No Internet Connection',
      };
      completion && completion(exception, null);
    }
  }
};

/**
 * Invokes a `GET` request and fetches response from api and return to caller function
 * via `completion` function
 * @param {*} endPoint API end point to be hit
 * @param {*} headers request headers for API request
 * @param {*} params data to be send via API
 * @param {*} completion completion handler which will invoke either success or failure
 *                       and retrun the response or error to the called function
 */
const getRequest = (endPoint, headers, params, completion) => {
  const url = API_URL + endPoint;
  return invokeNetworkRequest(url, 'GET', headers, params, completion);
};

/**
 * Invokes a `POST` request and fetches response from api and return to caller function
 * via `completion` function
 * @param {*} endPoint API end point to be hit
 * @param {*} headers request headers for API request
 * @param {*} params data to be send via API
 * @param {*} completion completion handler which will invoke either success or failure
 *                       and retrun the response or error to the called function
 */
const postRequest = (endPoint, headers, params, completion) => {
  const url = API_URL + endPoint;
  return invokeNetworkRequest(url, 'POST', headers, params, completion);
};

/**
 * Invokes a `PUT` request and fetches response from api and return to caller function
 * via `completion` function
 * @param {*} endPoint API end point to be hit
 * @param {*} headers request headers for API request
 * @param {*} params data to be send via API
 * @param {*} completion completion handler which will invoke either success or failure
 *                       and retrun the response or error to the called function
 */
const putRequest = (endPoint, headers, params, completion) => {
  const url = API_URL + endPoint;
  return invokeNetworkRequest(url, 'PUT', headers, params, completion);
};

const deleteRequest = (endPoint, headers, params, completion) => {
  const url = API_URL + endPoint;
  return invokeNetworkRequest(url, 'DELETE', headers, params, completion);
};

/**
 * fetch from ssl pinning liabrary has some known issues with file upload on ios,
 *  Thats's why creating this function which uses normal react native fetch,  to upload files.
 * Invokes a `MULTIPORT POST` request and fetches response from api and return to caller function
 * via `completion` function
 * @param {*} endPoint API end point to be hit
 * @param {*} formData data to be send via API
 * @param {*} completion completion handler which will invoke either success or failure
 *                       and retrun the response or error to the called function
 */

/**
 * fetch from ssl pinning liabrary has some known issues with file upload on ios,
 *  Thats's why creating this function which uses normal react native fetch,  to upload files.
 * Invokes a `MULTIPART POST` request and fetches response from api and return to caller function
 * via `completion` function
 * @param {*} formData data to be send via API
 * @param {*} endPoint API end point to be hit
 * @param {*} completion completion handler which will invoke either success or failure
 *                       and retrun the response or error to the called function
 */

const multipartFileUploadRequest = async (
  methodType,
  formData,
  endPoint,
  completion,
) => {
  NetInfo.fetch().then(async net_state => {
    if (net_state.isConnected) {
      try {
        console.log('REQUEST', formData);
        const apiUrl = API_URL + endPoint;
        const response = await fetch(apiUrl, {
          method: methodType,
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response) {
          // let jsonRespose = await response.json();

          // console.log('sdfs', response);
          if (response.status === API_SUCCESS) {
            let jsonResponse = await response.json();
            console.log('RESPONSE', jsonResponse);
            completion && completion(null, jsonResponse);
          } else {
            completion && completion(response, null);
          }
          return response;
        } else {
          // const exception = serverException('');
          // completion && completion(exception, null);
          // return exception;
        }
      } catch (err) {
        console.log('Error', err);
        const exception = {
          key: 500,
          message: 'No Internet Connection',
        };
        completion && completion(exception, null);
      }
    } else {
      crashlytics().log('API_ERROR No Internet Connection(Media)');
      Alert.alert('', 'No Internet Connection');
      const exception = {
        key: 500,
        message: 'No Internet Connection',
      };
      completion && completion(exception, null);
    }
  });
};

/**
 * Creates an `Authorization` header object using the `token` parameter
 * @param {*} token user token to be used for `Authorization`
 */
const authorizationHeader = token => ({
  Authorization: 'Bearer ' + token,
  'Content-Type': 'application/json',
  Accept: '*/*',
  'Access-Control-Allow-Origin': '*',
});

const authorizationHeaderForBackgroundApis = token => ({
  Authorization: 'Bearer ' + token,
});
const getHeadersWithToken = (isLogout = false) => {
  const {
    authModel: {
      userData: {access_token},
    },
  } = getState();

  return authorizationHeader(access_token);
};
const getRequestAsync = (endPoint, headers, params) =>
  new Promise((resolve, reject) =>
    getRequest(endPoint, headers, params, (err, response) => {
      if (err) {
        reject(err);
      } else if (response) {
        resolve(response);
      }
    }),
  );

export {
  getRequest,
  getRequestAsync,
  postRequest,
  putRequest,
  getHeadersWithToken,
  deleteRequest,
  authorizationHeader,
  invokeNetworkRequest,
  authorizationHeaderForBackgroundApis,
  multipartFileUploadRequest,
};
