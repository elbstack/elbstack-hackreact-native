import React, {
  Platform,
  Component,
  View,
  ScrollView,
  InteractionManager,
  Switch
} from 'react-native'
import { connect } from 'react-redux/native'

import { listChannels } from '../../actions/channels'

import ActionBar from '../container/ActionBar'
import LoadingIndicator from '../elements/LoadingIndicator'
import Text from '../elements/Text'
import IntroText from '../elements/IntroText'

class ChannelsPage extends Component {
  state = {
    interactionsFinished: false
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({interactionsFinished: true})

      this.props.listChannels()
    })
  }

  render() {
    let interactionsFinishedMarkup = <LoadingIndicator/>

    if (this.state.interactionsFinished) {
      interactionsFinishedMarkup = <Text>Lade Channels</Text>
    }

    return (
      <View style={styles.container}>
        <ActionBar title="Available Channels"/>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={true}>
          {interactionsFinishedMarkup}
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f7f8fc'
  }
}


export default connect(
  null,
  (dispatch) => {
    return {
      listChannels: () => dispatch(listChannels())
    }
  }
)(ChannelsPage)
