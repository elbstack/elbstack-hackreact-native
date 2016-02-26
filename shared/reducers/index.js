import { combineReducers } from 'redux'
import navigation from './navigation'
import sendbird from './sendbird'
import settings from './settings'

const rootReducer = combineReducers({
  navigation,
  sendbird,
  settings
})

export default rootReducer
