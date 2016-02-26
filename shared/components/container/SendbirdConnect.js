import React, {
  Component,
  Platform,
  View,
  Image,
  TextInput,
  PropTypes,
  InteractionManager,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'

import { resetTo } from '../../actions/navigation'
import { connectSendbird } from '../../actions/sendbird'

import Button from '../elements/Button'

class SendbirdConnect extends Component {

  state = {
    userName: ''
  };

  onConnect() {
    if (this.state && this.state.userName) {
      this.props.connect(this.state.userName)
      this.props.goToChat()
    }
  }

  onChange(name) {
    this.setState({
      userName: name
    })
  }

  render() {
    return (
      <View >
        <TextInput
          ref="inputNickname"
          disabled={this.props.sendbird.connecting}
          style={styles.input}
          autoCorrect={false}
          placeholder="nickname"
          placeholderTextColor="#bbbbbb"
          keyboardType="default"
          autoCapitalize="none"
          multiline={false}
          value={this.state.userName}
          onChangeText={(text) => this.onChange(text) }
          returnKeyType="next"
        />

        <Button
          onPress={this.onConnect.bind(this)}
          color="#32c5e6"
          textColor="#fff"
          text="Enter"
          style={styles.button}
        />
      </View>
    )
  }
}

const styles = {
  input: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 2,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 4,
    marginBottom: 10,
    backgroundColor: '#eee',
    width: 200
  },
  button: {
    container: {
      width: 200,
      marginLeft: 15,
      marginRight: 15,
    }
  }
}

if (Platform.OS === 'ios') {
  styles.input.height = 30
}

export default connect(
  state => ({
    sendbird: state.sendbird
  }),
  dispatch => ({
    connect: (id, user) => dispatch(connectSendbird(id, user)),
    goToChat: () => dispatch(resetTo('messenger'))
  })
)(SendbirdConnect)