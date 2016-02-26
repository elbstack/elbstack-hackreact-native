import React, {
  Component,
  PropTypes,
  View,
  TouchableHighlight
} from 'react-native'

import Text from './Text'

export default class IntroText extends Component {

  render() {
    return (
      <View style={styles.intro}>
        <Text style={styles.heading}>Messenger</Text>

        <View>
          <View>
            <Text style={styles.instructions}>
              Exercises:
            </Text>
          </View>
          <View><Text style={styles.instructions}>1. Add the team logo</Text></View>
          <View><Text style={styles.instructions}>2. Display the username</Text></View>
          <View><Text style={styles.instructions}>3. Toggle and display the channel list</Text></View>
          <View><Text style={styles.instructions}>4. Join a channel by clicking on it</Text></View>
          <View><Text style={styles.instructions}>5. Open and show a messenger-channel</Text></View>
          <View><Text style={styles.instructions}>6. Send and display messages</Text></View>
        </View>
      </View>
    )
  }
}

const styles = {
  intro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#abb8c4',
    marginBottom: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 14
  }
}