import React from 'react'
import { Text, View } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'

import * as routes from './routes'

import { SelectImageScreen } from '../screens/SelectImageScreen'
import { ProcessImageScreen } from '../screens/ProcessImageScreen'
import { HomeScreen } from '../screens/Home'
import { Inventory } from '../screens/Inventory'

type RootStackParamList = {
  [routes.MAIN_SCREEN]: undefined
  [routes.SELECT_SCREEN]: {
    selected: string
  }
  [routes.PROCESS_IMAGE_SCREEN]: {
    uri: string
  }
}

const Stack = createStackNavigator<RootStackParamList>()

export type SelectScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  typeof routes.SELECT_SCREEN
>

export type ProcessImageNavigationProps = StackNavigationProp<
  RootStackParamList,
  typeof routes.PROCESS_IMAGE_SCREEN
>

export type ProcessImageRouteProps = RouteProp<
  RootStackParamList,
  typeof routes.PROCESS_IMAGE_SCREEN
>

export const Navigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: 'black',
    }}
  >
    <Stack.Screen name={routes.MAIN_SCREEN} component={Inventory} />
    <Stack.Screen name={routes.SELECT_SCREEN} component={SelectImageScreen} />
    <Stack.Screen
      name={routes.PROCESS_IMAGE_SCREEN}
      component={ProcessImageScreen}
    />
  </Stack.Navigator>
)

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator()

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Inventory" component={Navigator} />
      <Tab.Screen name="Characters" component={SettingsScreen} />
    </Tab.Navigator>
  )
}
