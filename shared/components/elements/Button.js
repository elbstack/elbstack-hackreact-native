import React, {
  Component,
  PropTypes,
  View,
  TouchableHighlight
} from 'react-native'

import objectAssignDeep from 'object-assign-deep'

import * as colors from '../../constants/Colors'
import Text from './Text'
import globalStyles from '../../constants/GlobalStyles'

export default class Button extends Component {

  static propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    textColor: PropTypes.string,
    outline: PropTypes.bool,
    disabled: PropTypes.bool,
    big: PropTypes.bool,
    primary: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.any
  };

  static defaultProps = {
    text: '',
    outline: false,
    disabled: false,
    big: false,
    primary: false,
    onPress: null,
    style: null
  };

  state = {
    pressIn: false
  };

  _togglePressIn() {
    return this.setState({pressIn: !this.state.pressIn})
  }

  _calculateStyle(style) {
    let computedStyle = Object.assign({}, defaultStyle)

    if (this.props.primary === true) {
      computedStyle.container = defaultStyle.primaryButton
      computedStyle.text = defaultStyle.primaryButtonText
    }

    if (typeof style === 'object') {
      if (style && style.length !== undefined && style.length > 1) {
        style.forEach((s) => {
          computedStyle = objectAssignDeep({}, computedStyle, s)
        })
      } else {
        computedStyle = objectAssignDeep({}, computedStyle, style)
      }
    }

    if (this.props.textColor) {
      computedStyle.text.color = this.props.textColor
    }

    if (this.props.color) {
      if (this.props.outline) {
        computedStyle.container.backgroundColor = 'transparent'
        computedStyle.container.borderColor = this.props.color
        computedStyle.container.borderWidth = 1

        if (!this.props.textColor) {
          computedStyle.text.color = this.props.color
        }
      } else {
        computedStyle.container.backgroundColor = this.props.color
      }
    }

    if (this.props.disabled) {
      computedStyle.container.opacity = 0.4
    }

    if (this.props.big) {
      computedStyle.container = Object.assign({}, computedStyle.container, defaultStyle.big)

      if (this.props.text.length > 0) {
        computedStyle.container = Object.assign({}, computedStyle.container, defaultStyle.bigWithText)
      }
    }

    return computedStyle
  }

  _clickHandler() {
    if (!this.props.disabled && typeof this.props.onPress === 'function') {
      this.props.onPress()
    }
  }

  render() {
    const computedStyle = this._calculateStyle(this.props.style)

    let text = null
    if (this.props.text.length > 0) {
      text = <Text style={computedStyle.text}>{this.props.text}</Text>
    }

    return (
      <TouchableHighlight
        style={computedStyle.container}
        underlayColor={computedStyle.underlayColor}
        activeOpacity={1}
        onPressIn={this._togglePressIn.bind(this)}
        onPressOut={this._togglePressIn.bind(this)}
        onPress={this._clickHandler.bind(this)}>
        <View style={computedStyle.content}>
          {text}
        </View>
      </TouchableHighlight>
    )
  }
}

const defaultStyle = {
  container: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingTop: 3,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 13,
    borderRadius: 13,
    marginRight: 8
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    size: 26,
    marginRight: 0
  },
  text: {
    ...globalStyles.s,
    textAlign: 'center',
    color: colors.DARKGREY
  },
  underlayColor: colors.HIGHLIGHT,
  big: {
    borderRadius: 20,
    margin: 20
  },
  bigWithText: {
    paddingTop: 10,
    paddingBottom: 10
  },
  primaryButton: {
    backgroundColor: colors.HIGHLIGHT,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
    marginHorizontal: 6,
    borderRadius: 23,
    justifyContent: 'center'
  },
  primaryButtonText: {
    height: 26,
    marginTop: 8,
    marginBottom: 10,
    fontSize: 20,
    color: colors.MAIN_COLOR,
    textAlign: 'center'
  }
}
