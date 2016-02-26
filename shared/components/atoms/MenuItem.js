import React, {
  Component,
  View,
  PropTypes,
  TouchableHighlight
} from 'react-native'

import { connect } from 'react-redux/native'
import { navigateTo, closeSideMenu } from '../../actions/navigation'

import globalStyles from '../../constants/GlobalStyles'
import colors from '../../constants/Colors'

import Bubble from '../atoms/Bubble'
import Text from '../atoms/Text'


export default class MenuItem extends Component {
  static propTypes = {
    text: PropTypes.string,
    selected: PropTypes.bool,
    handlePress: PropTypes.func,
    notificationCounter: PropTypes.number
  };

  _handlePress() {
    if (this.props.handlePress) {
      this.props.handlePress()
    }
  }

  render() {
    let notificationCounterMarkup = (this.props.notificationCounter || 0) > 0 ? (
      <Bubble outline={true} number={this.props.notificationCounter > 99 ? '99+' : this.props.notificationCounter}/>
    ) : null

    return (
      <TouchableHighlight onPress={this._handlePress.bind(this)} activeOpacity={0.6} underlayColor="transparent">
        <View style={this.props.selected ? [styles.container, styles.active] : styles.container}>
          <Text style={styles.text}>{this.props.text}</Text>
          {notificationCounterMarkup}
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingVertical: 10
  },
  active: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  icon: {
    position: 'relative',
    fontSize: 26,
    color: 'white'
  },
  text: {
    ...globalStyles.navigation,
    paddingLeft: 2
  }
}
