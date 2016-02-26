import React, {
  Component,
  Image,
  View
} from 'react-native'

import Text from './Text'

export default class Profile extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Username</Text>
      </View>
    )
  }
}

const styles = {
  container: {
    margin: 20
  }
}