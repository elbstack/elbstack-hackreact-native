import React, {
  Platform,
  Dimensions
} from 'react-native'

import * as colors from '../constants/Colors'

let fontSize = 16 // based on iPhone 6
let factor = 1
let lineSpacing = 1.3 // 130% line spacing

// Dimensions.get('window').width

if (Platform.OS === 'android') {
  fontSize = 14
  factor = 1
  lineSpacing = 1.3
}

/*
 pt/px     factor
 -----------------
 12        0.75
 14        0.87
 16        1.0
 18        1.1
 22        1.4
 26        1.6
 32        2.0
 36        2.2

 lineheight: only int values are supported on android

 */

export const xxs = {
  fontSize: parseInt(fontSize * (factor * 0.75)),
  lineHeight: parseInt(fontSize * lineSpacing * (factor * 0.75)),
  color: colors.LIGHTGREY
}
export const xs = {
  fontSize: parseInt(fontSize * (factor * 0.87)),
  lineHeight: parseInt(fontSize * lineSpacing * (factor * 0.87)),
  color: colors.BLACK
}
export const s = {
  fontSize: parseInt(fontSize * (factor * 0.95)),
  lineHeight: parseInt(fontSize * lineSpacing * (factor * 0.95)),
  color: colors.BLACK
}
export const m = {
  fontSize: parseInt(fontSize * factor),
  lineHeight: parseInt(fontSize * lineSpacing * factor),
  color: colors.BLACK
}
export const l = {
  fontSize: parseInt(fontSize * (factor * 1.4)),
  lineHeight: parseInt(fontSize * (factor * 1.4) * lineSpacing),
  color: colors.BLACK
}
export const xl = {
  fontSize: parseInt(fontSize * (factor * 1.6)),
  lineHeight: parseInt(fontSize * lineSpacing * (factor * 1.6)),
  color: colors.BLACK
}
export const xxl = {
  fontSize: parseInt(fontSize * (factor * 2)),
  lineHeight: parseInt(fontSize * lineSpacing * (factor * 2)),
  color: colors.BLACK
}
export const xxxl = {
  fontSize: parseInt(fontSize * (factor * 2.2)),
  color: colors.BLACK
}

export default {
  xxs : xxs,
  xs: xs,
  s: s,
  m: m,
  l: l,
  xl: xl,
  xxl: xxl,
  xxxl: xxxl
}