import {
  SETTINGS_TOGGLE_LOADING,
  SETTINGS_TOGGLE_SUCCESS,
  SETTINGS_TOGGLE_ERROR
} from '../constants/ActionTypes'

const initialState = {
  loading: [],
  sendTyping: true,
  publicAvailable: true
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_TOGGLE_LOADING:
      return {
        ...state,
        loading: [].concat(state.loading).concat(action.key)
      }
    case SETTINGS_TOGGLE_SUCCESS:
      console.log(state.loading)
      const newState = {
        ...state,
        loading: state.loading.filter((settingsKey) => {
          return settingsKey != action.key
        })
      }
      newState[action.key] = action.value
      return newState
    case SETTINGS_TOGGLE_ERROR:
      return {
        ...state,
        loading: state.loading.filter((settingsKey) => {
          return settingsKey !== action.key
        })
      }
    default:
      return state
  }
}
