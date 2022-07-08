import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { MyTabs } from './src/navigation/Navigator'
import { ThemeProvider } from 'styled-components'
import theme from './src/global/styles/theme'
import { Provider } from 'react-redux'
import store from './src/store/configureStore'

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <MyTabs />
        </Provider>
      </ThemeProvider>
    </NavigationContainer>
  )
}
