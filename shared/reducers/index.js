import { combineReducers } from 'redux'
import settings from './settings'
import navigation from './navigation'

const rootReducer = combineReducers({
  navigation,
  settings
})

export default rootReducer
