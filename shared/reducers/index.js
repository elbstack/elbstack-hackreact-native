import { combineReducers } from 'redux'
import channels from './channels'
import navigation from './navigation'
import sendbird from './sendbird'
import settings from './settings'

const rootReducer = combineReducers({
  channels,
  navigation,
  sendbird,
  settings
})

export default rootReducer
