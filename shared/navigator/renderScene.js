import React, { Text, View } from 'react-native'

import InitialView from '../components/pages/InitialView'
import SettingsPage from '../components/pages/SettingsPage'

export default function renderScene(route) {
  let currentView
  switch (route.name) {
    case 'welcome':
      currentView = <InitialView />
      break
    case 'settings':
      currentView = <SettingsPage />
      break
    default:
      currentView = <View style={{flex: 1, backgroundColor: '#fff'}}><Text>404</Text></View>
  }

  return currentView
}
