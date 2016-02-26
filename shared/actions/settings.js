import { InteractionManager } from 'react-native'

import {
  SETTINGS_TOGGLE_LOADING,
  SETTINGS_TOGGLE_SUCCESS,
  SETTINGS_TOGGLE_ERROR
} from '../constants/ActionTypes'

export function toggleSettings(key, newValue = false) {
  return (dispatch) => {
    dispatch({type: SETTINGS_TOGGLE_LOADING})

    InteractionManager.runAfterInteractions(() => {

      // interaction with out backend here
      dispatch({
        type: SETTINGS_TOGGLE_SUCCESS,
        key: key,
        value: newValue
      })
    })
  }
}
