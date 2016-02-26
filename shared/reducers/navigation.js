import {
  SIDE_MENU_OPENED,
  SIDE_MENU_CLOSED,
  SIDE_MENU_TOGGLED,
  RESET_TO,
  NAVIGATED_TO,
  NAVIGATED_TO_WITH_HISTORY,
  NAVIGATED_BACK,
  NAVIGATED_TO_WITH_HISTORY_NO_BACK_GESTURE
} from '../constants/ActionTypes'

import CustomSceneConfig from '../navigator/CustomNavigatorSceneConfig'
import NavigatorNoTransitionConfig from '../navigator/NavigatorNoTransitionConfig'

const initialState = {
  route: 'welcome',
  sceneConfig: NavigatorNoTransitionConfig,
  sideMenu: {
    isOpen: false,
    gesturesEnabled: false
  }
}

export default function location(state = initialState, action) {
  const newParams = Object.assign({}, state.params, action.params)
  switch (action.type) {
    case SIDE_MENU_CLOSED:
      return Object.assign({}, state, {sideMenu: Object.assign({}, state.sideMenu, {isOpen: false, updateView: action.updateView})})
    case SIDE_MENU_OPENED:
      return Object.assign({}, state, {sideMenu: Object.assign({}, state.sideMenu, {isOpen: true, updateView: action.updateView})})
    case SIDE_MENU_TOGGLED:
      return Object.assign({}, state, {sideMenu: Object.assign({}, state.sideMenu, {isOpen: !state.sideMenu.isOpen, updateView: true})})
    case NAVIGATED_BACK:
      return {
        ...state,
        sideMenu: {
          ...state.sideMenu,
          gesturesEnabled: action.sideMenuGesturesEnabled,
          updateView: true
        }
      }
    case RESET_TO:
    case NAVIGATED_TO:
    case NAVIGATED_TO_WITH_HISTORY:
    case NAVIGATED_TO_WITH_HISTORY_NO_BACK_GESTURE:
      return Object.assign(
        {},
        state,
        {
          route: action.route,
          params: newParams,
          sideMenu: {
            ...state.sideMenu,
            isOpen: false,
            gesturesEnabled: action.sideMenuGesturesEnabled,
            updateView: true
          }
        })
    default:
      return state
  }
}
