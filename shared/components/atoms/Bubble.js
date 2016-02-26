import React, {
  Platform,
  Component,
  PropTypes,
  View
} from 'react-native'

import objectAssignDeep from 'object-assign-deep'
import * as colors from '../../constants/Colors'
import globalStyles from '../../constants/GlobalStyles'
import Text from './Text'

let topMargin = -3
if (Platform.OS === 'android') {
  topMargin = -1
}

export default class Bubble extends Component {

  static propTypes = {
    number: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    numberColor: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    outline: PropTypes.bool,
    style: PropTypes.any
  };

  static defaultProps = {
    outline: false,
    style: null
  };

  _calculateStyle(style) {
    let computedStyle = Object.assign({}, defaultStyle)

    if (typeof style === 'object') {
      if (style && style.length !== undefined && style.length > 1) {
        style.forEach((s) => {
          computedStyle = objectAssignDeep({}, computedStyle, s)
        })
      } else {
        computedStyle = objectAssignDeep({}, computedStyle, style)
      }
    }

    if (this.props.numberColor) {
      computedStyle.number.color = this.props.numberColor
    }

    if (this.props.color) {
      if (this.props.outline) {
        computedStyle.container.backgroundColor = 'transparent'
        computedStyle.container.borderColor = this.props.color
        computedStyle.container.borderWidth = 1

        if (!this.props.numberColor) {
          computedStyle.number.color = this.props.color
        }
      } else {
        computedStyle.container.backgroundColor = this.props.color
      }
    }

    if (this.props.backgroundColor) {
      computedStyle.container.backgroundColor = this.props.backgroundColor
    }

    if (this.props.outline) {
      computedStyle.container.borderColor = colors.WHITE
    }

    return computedStyle
  }

  render() {
    const computedStyle = this._calculateStyle(this.props.style)

    let text = null

    if (this.props.number) {
      text = <Text style={computedStyle.number}>{this.props.number}</Text>
    }

    return (
      <View style={computedStyle.container}>
        {text}
      </View>
    )
  }
}

const defaultStyle = {
  container: {
    flexDirection: 'row',
    backgroundColor: colors.MAIN_COLOR,
    justifyContent: 'center',
    position: 'relative',
    top: -7,
    height: 17,
    borderRadius: 9,
    borderColor: 'transparent',
    borderWidth: 1,
    marginLeft: 1,
    paddingHorizontal:4
  },
  number: {
    ...globalStyles.s,
    color: colors.WHITE,
    top: topMargin,
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
}