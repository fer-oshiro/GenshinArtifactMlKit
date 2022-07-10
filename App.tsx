import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { MyTabs } from './src/navigation/Navigator'
import { ThemeProvider } from 'styled-components'
import theme from './src/global/styles/theme'
import { Provider } from 'react-redux'
import store from './src/store/configureStore'
import { ToastProvider } from 'react-native-toast-notifications'

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ToastProvider>
            <MyTabs />
          </ToastProvider>
        </Provider>
      </ThemeProvider>
    </NavigationContainer>
  )
}
