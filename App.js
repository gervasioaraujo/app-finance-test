import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';

import theme from './theme';
import AppNavigation from './src/navigation';

import configStore from './src/store';
const { store, persistor } = configStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <AppNavigation />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
