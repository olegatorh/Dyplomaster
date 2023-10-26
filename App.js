import React from 'react';
import { View, StatusBar } from 'react-native';
import { Navigation } from './src/components/navigation/navigation';
import { Context, Provider } from './src/components/globalContext/globalContext';

export default function App(props) {
  return(
        <Provider>
           <Navigation />
        </Provider>
  )
}