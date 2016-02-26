import { Platform, StatusBarIOS, AppState } from 'react-native'

export default (dispatch, store) => {

  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      // some update actions on app state active
    }
  })

  if (Platform.OS === 'ios') {
    StatusBarIOS.setStyle('light-content')
  }
}
