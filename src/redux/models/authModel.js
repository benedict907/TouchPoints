import API from '../../utils/API';
import {API_SUCCESS, API_FAILURE} from '../../constants';
import {Alert} from 'react-native';

export const authModel = {
  state: {userData: null, token: null, isConnected: true, isLoading: false},
  reducers: {
    setIsConnected: (state, payload) => {
      return {...state, isConnected: payload};
    },

    setIsLoading: (state, payload) => {
      return {...state, isLoading: payload};
    },
  },
  effects: dispatch => ({
    sendOtp: async requestBody => {
      try {
        const response = await API.post('/sendOtp', requestBody);
        const {
          data: {data = null, status = null, errors},
        } = response;
        if (status === API_SUCCESS) {
          return {status, data};
          // dispatch.authModel.setUserData(data);
        } else if (status === API_FAILURE) {
          return {status, errors};
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    verifyOtp: async requestBody => {
      try {
        const response = await API.post('/verifyOtp', requestBody);
        const {
          data: {data = null, status = null, message, errors},
        } = response;
        if (status === '1') {
          dispatch.authModel.setUserData(data);
        } else if (status === '0') {
        }
        return {status: data.action_status, data, errors};
      } catch (error) {
        console.log(error);
      }
    },
    resentOtp: async requestBody => {
      try {
        const response = await API.post('/reSentOtp', requestBody);
        const {
          data: {
            data: {message, resent_option},
            status = null,
            errors,
          },
        } = response;
        if (status === '1') {
          Alert.alert('', message);
          // dispatch.authModel.setUserData(data);
        } else if (status === '0') {
        }
        // return {status: data.action_status, data, errors};
      } catch (error) {
        console.log(error);
      }
    },
    setProfile: async requestBody => {
      try {
        const response = await API.post('/user/setProfile', requestBody);
        const {
          data: {data = null, status = null, errors = ''},
        } = response;
        if (status === '1') {
          dispatch.authModel.setUserProfile(data);
          return {status};
        } else if (status === '0') {
          return {status, message: errors};
        }
      } catch (error) {
        console.log(error);
      }
    },
  }),
};
