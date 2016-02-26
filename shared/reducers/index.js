import { combineReducers } from 'redux'
import channels from './channels'
import sendbird from './sendbird'
import settings from './settings'
import navigation from './navigation'

const rootReducer = combineReducers({
  channels,
  navigation,
  sendbird,
  settings
})

export default rootReducer
