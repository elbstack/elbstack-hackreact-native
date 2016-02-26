import React, {
  Component,
  View
} from 'react-native'

import Text from './Text'
import globalStyles from '../../constants/GlobalStyles'

export default class NavListHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = {
  text: {
    ...globalStyles.navigationHeader,
    color: '#fff',
    letterSpacing: 1
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 16,
    paddingVertical: 8
  }
}
