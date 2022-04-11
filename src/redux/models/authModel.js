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
};
