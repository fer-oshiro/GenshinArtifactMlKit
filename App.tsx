import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MyTabs } from './src/navigation/Navigator';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <MyTabs />
      </ThemeProvider>
    </NavigationContainer>
  );
}

