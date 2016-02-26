import { SENDBIRD_LIST_CHANNELS, SENDBIRD_LIST_CHANNELS_ERROR } from '../constants/ActionTypes'
import sendbird from 'sendbird'

export function listChannels() {
  const page = 1
  const limit = 20

  return dispatch => {
    sendbird.getChannelList({
      page: page,
      limit: limit,
      successFunc: (data) => {
        dispatch({
          type: SENDBIRD_LIST_CHANNELS,
          data: data
        })
      },
      errorFunc: (status, error) => {
        dispatch({
          type: SENDBIRD_LIST_CHANNELS_ERROR,
          status: status,
          error: error
        })
      }
    })
  }
}