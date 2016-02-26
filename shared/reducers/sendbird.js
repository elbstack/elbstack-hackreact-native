import { SENDBIRD_CONNECT, SENDBIRD_CONNECTED, SENDBIRD_SET_USER, SENDBIRD_CONNECT_ERROR } from '../constants/ActionTypes'

export default function sendbird(state = {}, action) {
  switch (action.type) {
    case SENDBIRD_SET_USER:
      return {
        ...state,
        guest_id: action.guest_id,
        user_name: action.user_name
      }
    case SENDBIRD_CONNECT:
      return {
        ...state,
        connecting: true
      }
    case SENDBIRD_CONNECTED:
      return {
        ...state,
        connected: true,
        connecting: false
      }
    case SENDBIRD_CONNECT_ERROR:
      return {
        ...state,
        error: action.error,
        connecting: false,
        status: action.status
      }
    default:
      return state
  }
}