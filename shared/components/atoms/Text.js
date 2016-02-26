import React, {
  Component,
  PixelRatio,
  Platform,
  PropTypes,
  Dimensions,
  Text
} from 'react-native'

import colors from '../../constants/Colors'
import objectAssignDeep from 'object-assign-deep'

export default class CustomText extends Component {
  static propTypes = {
    style: PropTypes.any
  };

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  getRecalculatedStyles(style) {
    let size = 12
    let factor = 1

    if (style && style.fontSize) {
      size = style.fontSize
    }

    if (Platform.OS === 'android') {
      size = PixelRatio.getPixelSizeForLayoutSize(size) / PixelRatio.get()
    }

    return {
      fontSize: size
    }
  }

  render() {
    const { style, ...furtherProps } = this.props
    let computedStyle = {}

    if (typeof style === 'object') {
      if (style.length !== undefined && style.length > 1) {
        style.forEach((s) => {
          if (typeof s === 'object') {
            computedStyle = objectAssignDeep({}, computedStyle, s)
          }
        })
      } else {
        computedStyle = style
      }
    }

    return (
      <Text
        ref={component => this._root = component}
        allowFontScaling={false}
        style={[computedStyle, this.getRecalculatedStyles(computedStyle)]}
        {...furtherProps}>
        {this.props.children || ''}
      </Text>
    )
  }
}
