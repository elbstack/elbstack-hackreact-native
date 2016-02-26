import React, { Text, View } from 'react-native'

import InitialView from '../components/pages/InitialView'
import SettingsPage from '../components/pages/SettingsPage'
import ChannelPage from '../components/pages/ChannelPage'

export default function renderScene(route) {
  let currentView
  switch (route.name) {
    case 'welcome':
      currentView = <InitialView />
      break
    case 'settings':
      currentView = <SettingsPage />
      break
    case 'channel':
      currentView = <ChannelPage {...route.params} />
      break
    default:
      currentView = <View style={{flex: 1, backgroundColor: '#fff'}}><Text>404</Text></View>
  }

  return currentView
}
