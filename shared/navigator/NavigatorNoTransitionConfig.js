import { Navigator } from 'react-native'
import buildStyleInterpolator from 'react-native/Libraries/Utilities/buildStyleInterpolator'

const FadeIn = {
  opacity: {
    from: 0.9,
    to: 1,
    min: 0.5,
    max: 1,
    type: 'linear',
    extrapolate: false,
    round: 100
  }
}

var FadeOut = {
  opacity: {
    from: 1,
    to: 0.9,
    min: 0,
    max: 0.5,
    type: 'linear',
    extrapolate: false,
    round: 100
  }
}

export default {
  ...Navigator.SceneConfigs.FloatFromLeft,
  gestures: null,
  defaultTransitionVelocity: 100,
  animationInterpolators: {
    into: buildStyleInterpolator(FadeIn),
    out: buildStyleInterpolator(FadeOut)
  }
}
