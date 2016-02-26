import { SENDBIRD_CONNECT, SENDBIRD_CONNECT_ERROR, SENDBIRD_CONNECTED, SENDBIRD_SET_USER } from '../constants/ActionTypes'
import { SENDBIRD_APP_ID } from '../constants/Config'

import sendbird from 'sendbird'

function shouldConnect(state) {
  return !state.sendbird.connected && !state.sendbird.connecting
}

function requestConnect(id, user) {

  return dispatch => {
    dispatch({
      type: SENDBIRD_SET_USER,
      guest_id: id,
      user_name: user
    })

    dispatch({
      type: SENDBIRD_CONNECT
    })

    sendbird.init({
      app_id: SENDBIRD_APP_ID,
      guest_id: id,
      user_name: user,
      image_url: '',
      access_token: '',
      successFunc: (data) => {
        console.log(data)

        dispatch(listChannels())

        dispatch({
          type: SENDBIRD_CONNECTED
        })
      },
      errorFunc: (status, error) => {
        dispatch({
          type: SENDBIRD_CONNECT_ERROR,
          status: status,
          error: error
        })
      }
    })
  }
}

function getGuestId() {
  // sendbird counts guest_ids as monthly active users
  // which we only have 1k to test with,
  // so save the guest id per client
  const now = new Date()
  return now.getTime()
}

export function connectSendbird(user) {

  return (dispatch, getState) => {
    const state = getState()

    if (shouldConnect(state)) {
      return dispatch(requestConnect(getGuestId(), user))
    }
  }
}
