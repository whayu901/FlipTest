import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Search from './src/component/search'

export default function App() {
  return (
    <PaperProvider>
      <Search />
    </PaperProvider>
  );
}

