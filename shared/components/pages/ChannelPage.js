import React, {
  Platform,
  Component,
  View,
  ScrollView,
  InteractionManager,
  Switch
} from 'react-native'
import { connect } from 'react-redux/native'

import ActionBar from '../container/ActionBar'
import LoadingIndicator from '../atoms/LoadingIndicator'
import Text from '../atoms/Text'

class ChannelPage extends Component {
  state = {
    interactionsFinished: false
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({interactionsFinished: true})
    })
  }

  render() {
    let interactionsFinishedMarkup = <LoadingIndicator/>

    if (this.state.interactionsFinished) {
      interactionsFinishedMarkup = []
      interactionsFinishedMarkup.push(
        <Text>message ....</Text>
      )
    }

    return (
      <View style={styles.container}>
        <ActionBar title={this.props.channel.name}/>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
          {interactionsFinishedMarkup}
        </ScrollView>
      </View>
    )
  }
}


export default connect(
  null,
  null
)(ChannelPage)
