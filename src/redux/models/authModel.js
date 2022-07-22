import API, {authorizationHeader, postRequest} from '../../utils/API';
import {API_SUCCESS, API_FAILURE} from '../../constants';

export const authModel = {
  state: {userData: null, token: null, isConnected: true, isLoading: false},
  reducers: {
    setUserData: (state, payload) => {
      return {...state, userData: payload};
    },

    setIsConnected: (state, payload) => {
      return {...state, isConnected: payload};
    },

    setIsLoading: (state, payload) => {
      return {...state, isLoading: payload};
    },
  },
  effects: dispatch => ({
    login: async ({mobile, password, callback}) => {
      try {
        await postRequest(
          '/login',
          authorizationHeader(),
          JSON.stringify({mobile, password}),
          (_err, response) => {
            const {response_code, data, errors} = response;
            if (response_code === '1') {
              dispatch.authModel.setUserData(data);
              callback('success');
            } else {
              callback('failed', errors[0]);
            }
          },
        );
      } catch (error) {
        console.log(error);
      }
    },
  }),
};
