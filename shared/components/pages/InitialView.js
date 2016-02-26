import React, {
  Component,
  Platform,
  View,
  Image,
  PropTypes,
  InteractionManager,
  TouchableHighlight
} from 'react-native'

import { connect } from 'react-redux/native'
import { navigateTo, resetTo, navigateToWithHistory } from '../../actions/navigation'

import TimerMixin from 'react-timer-mixin'

import Dimensions from 'Dimensions'

import Button from '../atoms/Button'
import Text from '../atoms/Text'
import LoadingIndicator from '../atoms/LoadingIndicator'

import ActionBar from '../container/ActionBar'

import colors, { MAIN_COLOR } from '../../constants/Colors'
import globalStyles from '../../constants/GlobalStyles'

class InitialView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ActionBar title="HackReact" />
        <View style={styles.content}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            Enjoy coding with elbstack :)
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>
      </View>
    )
  }
}

const window = Dimensions.get('window')

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
}

export default connect(
  (state) => {
    return {
      login: state.login
    }
  },
  (dispatch) => {
    return {
      resetTo: (view) => {
        dispatch(resetTo(view))
      },
      navigateTo: (view) => {
        dispatch(navigateTo(view))
      },
      navigateToWithHistory: (route) => {
        dispatch(navigateToWithHistory(route))
      },
      loadCurrentUser: () => {
        dispatch(loadCurrentUser())
      }
    }
  }
)(InitialView)
