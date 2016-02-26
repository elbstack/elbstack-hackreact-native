import { SENDBIRD_LIST_CHANNELS } from '../constants/ActionTypes'

export default function channels(state = {}, action) {
  switch (action.type) {
    case SENDBIRD_LIST_CHANNELS:
      return Object.assign(
        {},
        state,
        {
          page: action.data.page,
          next: action.data.next,
          list: action.data.channels.reduce((memo, channel)=> ({
            ...memo,
            [channel.id]: channel
          }), {})
        }
      )
    default:
      return state
  }
}