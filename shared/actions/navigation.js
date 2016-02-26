import navigatorManager from '../managers/navigatorManager'

import CustomSceneConfig from '../navigator/CustomNavigatorSceneConfig'
import NavigatorNoTransitionConfig from '../navigator/NavigatorNoTransitionConfig'

import {
  RESET_TO,
  NAVIGATED_TO,
  NAVIGATED_TO_WITH_HISTORY,
  NAVIGATED_BACK,
  NAVIGATED_TO_WITH_HISTORY_NO_BACK_GESTURE,
  SIDE_MENU_GESTURES_DISABLED,
  SIDE_MENU_GESTURES_ENABLED,
  SIDE_MENU_TOGGLED,
  SIDE_MENU_OPENED,
  SIDE_MENU_CLOSED
} from '../constants/ActionTypes'

const routesWithoutSideMenuGestures = [
  'welcome'
]

function getSideMenuGestureState(route) {
  if (typeof route === 'object' && typeof route.name !== 'undefined') {
    route = route.name
  }

  return routesWithoutSideMenuGestures.indexOf(route) === -1
}

export function resetTo(route, params) {
  return (dispatch) => {
    const transformedParams = {}
    transformedParams[route] = params

    navigatorManager.navigator.immediatelyResetRouteStack([{name: route, params: params}])

    dispatch({
      type: RESET_TO,
      route: route,
      params: transformedParams,
      sideMenuGesturesEnabled: getSideMenuGestureState(route)
    })
  }
}

export function navigateTo(route, params) {
  return (dispatch) => {
    const currentRoutes = navigatorManager.navigator.getCurrentRoutes()
    let alreadyInCurrentRoutesIndex = -1

    let index = 0
    currentRoutes.forEach((existingRoute) => {
      if (existingRoute.name === route) {
        alreadyInCurrentRoutesIndex = index
      }
      index++
    })

    const transformedParams = {}
    transformedParams[route] = params

    if (alreadyInCurrentRoutesIndex >= 0) {
      navigatorManager.navigator._jumpN(alreadyInCurrentRoutesIndex - navigatorManager.navigator.state.presentedIndex)
    } else {
      navigatorManager.navigator.push({
        name: route,
        sceneConfig: NavigatorNoTransitionConfig,
        params: params
      })
    }

    dispatch({
      type: NAVIGATED_TO,
      route: route,
      params: transformedParams,
      sideMenuGesturesEnabled: getSideMenuGestureState(route)
    })
  }
}

export function navigateToWithHistory(route, params) {
  return (dispatch) => {
    const transformedParams = {}
    transformedParams[route] = params

    navigatorManager.navigator.push({
      name: route,
      params: params,
      sceneConfig: CustomSceneConfig
    })

    dispatch({
      type: NAVIGATED_TO_WITH_HISTORY,
      route: route,
      sideMenuGesturesEnabled: getSideMenuGestureState(route),
      params: transformedParams
    })
  }
}

export function navigateToWithHistoryNoBackGesture(route, params) {
  return (dispatch) => {
    const transformedParams = {}
    transformedParams[route] = params

    navigatorManager.navigator.push({
      name: route,
      params: params,
      sceneConfig: Object.assign({}, CustomSceneConfig, {gestures: null})
    })

    dispatch({
      type: NAVIGATED_TO_WITH_HISTORY_NO_BACK_GESTURE,
      route: route,
      sideMenuGesturesEnabled: getSideMenuGestureState(route),
      params: transformedParams
    })
  }
}

export function navigateBack() {
  return (dispatch) => {
    const currentRoutes = navigatorManager.navigator.getCurrentRoutes()

    let currentRouteIndex = navigatorManager.navigator.state.presentedIndex

    let sideMenuGesturesEnabled = false
    if (typeof currentRoutes[currentRouteIndex - 1] !== 'undefined') {
      sideMenuGesturesEnabled = getSideMenuGestureState(currentRoutes[currentRouteIndex - 1])
    }

    navigatorManager.navigator.pop()

    dispatch({
      type: NAVIGATED_BACK,
      sideMenuGesturesEnabled: sideMenuGesturesEnabled
    })
  }
}

export function toggleSideMenu() {
  return (dispatch) => {
    dispatch({
      type: SIDE_MENU_TOGGLED
    })
  }
}

export function closeSideMenu(updateView = true) {
  return (dispatch) => {
    dispatch({
      type: SIDE_MENU_CLOSED,
      updateView: updateView
    })
  }
}

export function openSideMenu(updateView = true) {
  return (dispatch) => {
    dispatch({
      type: SIDE_MENU_OPENED,
      updateView: updateView
    })
  }
}
