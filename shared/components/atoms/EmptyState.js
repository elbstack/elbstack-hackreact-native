import React, { Component, PropTypes } from 'react-native'

import Text from './Text'
import colors from '../../constants/Colors'
import globalStyles from '../../constants/GlobalStyles'

export default class EmptyState extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  render() {
    return <Text style={style}>{this.props.text}</Text>
  }
}

const style = {
  ...globalStyles.m,
  color: colors.LIGHTGREY,
  marginTop: 50,
  alignSelf: 'center',
  flex: 1
}
