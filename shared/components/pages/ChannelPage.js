import React, {
  Platform,
  Component,
  Dimensions,
  DeviceEventEmitter,
  View,
  ScrollView,
  InteractionManager,
  TextInput
} from 'react-native'
import { connect } from 'react-redux/native'

import globalStyles from '../../constants/GlobalStyles'
import colors from '../../constants/Colors'

import ActionBar from '../container/ActionBar'
import LoadingIndicator from '../atoms/LoadingIndicator'
import Text from '../atoms/Text'
import Button from '../atoms/Button'

class ChannelPage extends Component {
  state = {
    interactionsFinished: false,
    keyboardHeight: 0
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({interactionsFinished: true})
    })
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  keyboardWillShow(e) {
    this.setState({keyboardHeight: e.endCoordinates.height})
  }

  keyboardWillHide(e) {
    this.setState({keyboardHeight: 0})
  }

  _sendMessage() {

  }

  render() {
    let interactionsFinishedMarkup = <LoadingIndicator />

    if (this.state.interactionsFinished) {
      interactionsFinishedMarkup = (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
            <Text>message ....</Text>
          </ScrollView>
          <View style={[styles.messageInputContainer, {marginBottom: this.state.keyboardHeight}]}>
            <TextInput
              value={this.state.text}
              multiline={true}
              autoCorrect={true}
              ref="input"
              onChangeText={(text) => { this.setState({text: text}) }}
              style={styles.input}
              placeholder="Enter comment" />

            <Button
              text="Post"
              color={colors.MAIN_COLOR}
              textColor={colors.WHITE}
              style={{container: {borderRadius: 4 } }}
              onPress={this._sendMessage.bind(this)} />
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ActionBar title={(this.props.channel || {}).name}/>
        {interactionsFinishedMarkup}
      </View>
    )
  }
}

const window = Dimensions.get('window')
const styles = {
  input: {
    ...globalStyles.m,
    width: window.width - 70,
    backgroundColor: colors.INPUT_BG,
    paddingLeft: 10,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 4,
    marginRight: 6
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  commentsHeadline: {
    ...globalStyles.s,
    marginLeft: 15,
    marginVertical: 15
  },
  messageInputContainer: {
    flexDirection: 'row',
    width: window.width,
    height: 59,
    borderColor: colors.LINE,
    borderWidth: 0,
    borderTopWidth: 1,
    padding: 8
  }
}

export default connect(
  null,
  null
)(ChannelPage)
