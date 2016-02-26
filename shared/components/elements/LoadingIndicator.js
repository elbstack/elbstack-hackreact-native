import React, {
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  Component,
  Image,
  PropTypes,
  View,
  Platform } from 'react-native'

import colors from '../../constants/Colors'

export default class LoadingIndicator extends Component {
  static propTypes = {
    hideSpinner: PropTypes.bool,
    fillWhitespace: PropTypes.bool,
    style: PropTypes.any
  };

  render() {
    let spinner
    if (Platform.OS === 'ios') {
      let basicStyle = styles.loadingIndicatorIOS
      if (this.props.fillWhitespace) {
        basicStyle.flex = 1
        basicStyle.marginTop = -10
      }

      spinner = <ActivityIndicatorIOS {...this.props} animating style={[basicStyle, this.props.style]}/>
    } else {
      let basicStyle = styles.loadingIndicatorAndroid
      if (this.props.fillWhitespace) {
        basicStyle.flex = 1
      }

      spinner = (
        <View style={[basicStyle, this.props.style]}>
          <ProgressBarAndroid {...this.props} indeterminate styleAttr="Small" color={colors.MAIN_COLOR}/>
        </View>
      )
    }

    return this.props.hideSpinner ? <View style={basicLoadingIndicatorStyle}/> : spinner
  }
}

const basicLoadingIndicatorStyle = {
  alignSelf: 'center',
  width: 60,
  height: 60,
  backgroundColor: 'transparent'
}

const styles = {
  loadingIndicatorIOS: basicLoadingIndicatorStyle,
  loadingIndicatorAndroid: {
    ...basicLoadingIndicatorStyle,
    marginTop: 15
  }
}
