import React, {
  Component,
  Dimensions,
  View,
  PropTypes
} from 'react-native'

import colors from '../../constants/Colors'

export default class Separator extends Component {
  static propTypes = {
    style: PropTypes.any
  };

  render() {
    return (
      <View style={[defaultStyles.line, this.props.style]}/>
    )
  }
}

const defaultStyles = {
  line: {
    backgroundColor: colors.LINE,
    height: 1,
    width: Dimensions.get('window').width
  }
}

