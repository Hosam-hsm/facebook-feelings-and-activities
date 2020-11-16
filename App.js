import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import MainNavigator from './src';
import Store, { StoreProvider } from './src/store/Store';

const store = new Store()
export default function App() {
  return (
    <StoreProvider store={store}>
      <MainNavigator />
    </StoreProvider>
  );
}

