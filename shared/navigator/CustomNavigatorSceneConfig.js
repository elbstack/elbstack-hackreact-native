import { Dimensions, Navigator, PixelRatio } from 'react-native'
import buildStyleInterpolator from 'react-native/Libraries/Utilities/buildStyleInterpolator'

const BaseNavigatorConfig = Navigator.SceneConfigs.FloatFromRight

var FadeToTheLeft = {
  // Rotate *requires* you to break out each individual component of
  // rotation (x, y, z, w)
  transformTranslate: {
    from: {x: 0, y: 0, z: 0},
    to: {x: -Math.round(Dimensions.get('window').width * 0.3), y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get()
  },
  transformScale: {
    from: {x: 1, y: 1, z: 1},
    to: {x: 0.95, y: 1, z: 1},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true
  },
  opacity: {
    from: 1,
    to: 1,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: false,
    round: 100
  },
  translateX: {
    from: 0,
    to: -Math.round(Dimensions.get('window').width * 0.3),
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get()
  },
  scaleX: {
    from: 1,
    to: 0.95,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true
  },
  scaleY: {
    from: 1,
    to: 1,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true
  }
}

var FromTheRight = {
  opacity: {
    value: 1.0,
    type: 'constant'
  },

  shadowColor: {
    value: '#000000',
    type: 'constant'
  },

  shadowOpacity: {
    from: 0.1,
    to: 0.8,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: false,
    round: 100
  },

  shadowRadius: {
    from: 2,
    to: 10,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true
  },

  transformTranslate: {
    from: {x: Dimensions.get('window').width, y: 0, z: 0},
    to: {x: 0, y: 0, z: 0},
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get()
  },

  translateX: {
    from: Dimensions.get('window').width,
    to: 0,
    min: 0,
    max: 1,
    type: 'linear',
    extrapolate: true,
    round: PixelRatio.get()
  },

  scaleX: {
    value: 1,
    type: 'constant'
  },
  scaleY: {
    value: 1,
    type: 'constant'
  }
}

const CustomLeftToRightGesture = Object.assign({}, BaseNavigatorConfig.gestures.pop, {
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: Dimensions.get('window').width * 0.8
})

export default CustomSceneConfig = {
  ...BaseNavigatorConfig,
  gestures: {
    pop: CustomLeftToRightGesture
  },
  defaultTransitionVelocity: 1.5,
  animationInterpolators: {
    into: buildStyleInterpolator(FromTheRight),
    out: buildStyleInterpolator(FadeToTheLeft)
  }
}

