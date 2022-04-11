import {init} from '@rematch/core';
import * as models from './models';
import createLoading from '@rematch/loading';
import createRematchPersist from '@rematch/persist';
import AsyncStorage from '@react-native-community/async-storage';

const loading = createLoading({name: 'loading'});
const persistPlugin = createRematchPersist({
  key: 'primary',
  whitelist: ['authModel'],
  storage: AsyncStorage,
});

const store = init({
  models,
  plugins: [loading, persistPlugin],
});

export const {dispatch, getState} = store;
export default store;
