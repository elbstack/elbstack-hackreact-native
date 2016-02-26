import React, {
  Component,
  TouchableHighlight,
  PropTypes,
  Platform,
  View
} from 'react-native'

import { connect } from 'react-redux/native'
import { toggleSideMenu, navigateToWithHistory, navigateBack } from '../../actions/navigation'

import globalStyles from '../../constants/GlobalStyles'
import colors from '../../constants/Colors'

import Text from '../elements/Text'
import Bubble from '../elements/Bubble'


class ActionBar extends Component {
  static propTypes = {
    leftButtonBack: PropTypes.bool,
    leftButtonBackCallback: PropTypes.func,
    rightButtonCallback: PropTypes.func
  };

  _handleLeft(e) {
    if (this.props.leftButtonBack && this.props.leftButtonBack === true) {
      if (typeof this.props.leftButtonBackCallback === 'function') {
        this.props.leftButtonBackCallback()
      }
      this.props.navigateBack()
    } else {
      this.props.toggleSideMenu()

      if (this.props.onPress) {
        this.props.onPress(e)
      }
    }
  }

  _handleRight() {
    if (this.props.rightButtonCallback) {
      this.props.rightButtonCallback()
    } else {
      this.props.navigateToWithHistory(this.props.navTarget)
    }
  }

  _leftIcon() {
    let marginTop = 0
    if (Platform.OS === 'ios') {
      marginTop = -5
    }

    return (<Text style={styles.icon} marginTop={marginTop} paddingRight={18}>Menü</Text>)
  }

  render() {
    return (
      <View>
        <View style={styles.statusBar}/>
        <View style={styles.actionBar}>
          <TouchableHighlight activeOpacity={0.2} underlayColor="transparent" onPress={this._handleLeft.bind(this)}>
            {this._leftIcon()}
          </TouchableHighlight>
          <Text style={styles.title}>{this.props.title ? this.props.title : "HACKREACT"}</Text>
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'row'
  },
  textButton: {
    ...globalStyles.navigationBarButton,
    paddingTop: 1,
    color: '#fff'
  },
  title: {
    ...globalStyles.navigationBarTitle,
    flex: 1,
    color: '#fff',
    textAlign: 'center'
  },
  icon: {
    ...globalStyles.navigationBarIcon
  },
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: colors.MAIN_COLOR
  },
  actionBar: {
    paddingTop: 10,
    paddingRight: 8,
    paddingLeft: 8,
    height: 44,
    flexDirection: 'row',
    backgroundColor: colors.MAIN_COLOR,
    justifyContent: 'space-between'
  },
  bubble: {
    position: 'relative',
    top: 6
  }
}

export default connect(
  null,
  (dispatch) => {
    return {
      toggleSideMenu: () => {
        dispatch(toggleSideMenu())
      },
      navigateBack: () => {
        dispatch(navigateBack())
      },
      navigateToWithHistory: (view) => {
        dispatch(navigateToWithHistory(view))
      }
    }
  }
)(ActionBar)

