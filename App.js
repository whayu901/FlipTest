import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Search from './src/component/search'

export default function App() {
  return (
    <PaperProvider>
      <Search />
    </PaperProvider>
  );
}

