import React, {
  Component,
  PropTypes,
} from 'react-native'

import { connect } from 'react-redux/native'
import { navigateTo, closeSideMenu } from '../../actions/navigation'

import MenuItem from '../atoms/MenuItem'

class MenuItemContainer extends Component {
  static propTypes = {
    navTarget: PropTypes.string,
    channel: PropTypes.object,
    text: PropTypes.string,
    handlePress: PropTypes.func,
    notificationCounter: PropTypes.number
  };

  shouldComponentUpdate(nextProps) {
    const counterChanged = this.props.notificationCounter !== nextProps.notificationCounter
    // change active state
    const routeChanged = this.props.route !== nextProps.route &&
      (this.props.route === this.props.navTarget || nextProps.route === this.props.navTarget)

    return counterChanged || routeChanged
  }

  _handlePress() {
    if (this.props.handlePress) {
      this.props.handlePress()
    } else if (this.props.route !== this.props.navTarget) {
      this.props.navigateTo(this.props.navTarget, { channel: this.props.channel })
    } else {
      this.props.closeSideMenu()
    }
  }

  render() {
    return (
      <MenuItem
        text={this.props.text}
        selected={this.props.navTarget === this.props.route}
        handlePress={this._handlePress.bind(this)}
        notificationCounter={this.props.notificationCounter}
        channel={this.props.chnnel}
      />
    )
  }
}

export default connect(
  (state) => {
    return {
      route: state.navigation.route
    }
  },
  (dispatch) => {
    return {
      closeSideMenu: () => {
        dispatch(closeSideMenu())
      },
      navigateTo: (route) => {
        dispatch(navigateTo(route))
      }
    }
  }
)(MenuItemContainer)
