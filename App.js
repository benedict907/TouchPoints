import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {getPersistor} from '@rematch/persist';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import store from './src/redux';
import Navigation from './src/Navigation';

import {SafeAreaProvider} from 'react-native-safe-area-context';

const persistor = getPersistor();

const App: () => React$Node = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
