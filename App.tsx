import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { MyTabs } from './src/navigation/Navigator'
import { ThemeProvider } from 'styled-components'
import theme from './src/global/styles/theme'
import { Provider } from 'react-redux'
import store from './src/store/configureStore'
import { ToastProvider } from 'react-native-toast-notifications'
import { LogBox } from 'react-native'

export default function App() {
  LogBox.ignoreLogs(['Warning: ...'])
  LogBox.ignoreAllLogs()
  const message =
    'It appears that you are using old version of react-navigation library. Please update @react-navigation/bottom-tabs, @react-navigation/stack and @react-navigation/drawer to version 5.10.0 or above to take full advantage of new functionality added to react-native-screens'
  console.warn = (message?: any, ...optionalParams: any[]) => {
    if (message) return
    console.log(message, ...optionalParams)
  }
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
