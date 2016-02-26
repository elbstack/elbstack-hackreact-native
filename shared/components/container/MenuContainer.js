import React, {
  Component,
  Platform,
  ScrollView,
  Image,
  View,
  Dimensions
} from 'react-native'

import { connect } from 'react-redux/native'
import { navigateTo, resetTo } from '../../actions/navigation'

import globalStyles from '../../constants/GlobalStyles'

import MenuGroupLabel from './../atoms/MenuGroupLabel'
import MenuItemContainer from './MenuItemContainer'

const window = Dimensions.get('window')

class MenuContainer extends Component {
  render() {

    const publicChannels = []

    let publicChannelsDummy = ['General', 'Random']
    publicChannelsDummy.forEach((channelName) => {
      publicChannels.push(
        <MenuItemContainer key={'MenuChannel' + channelName} text={channelName} navTarget='messaging'/>
      )
    })

    return (
      <Image source={require('../../../assets/Images/drawer_background.jpg')} style={styles.backgroundImage}>
        <View style={styles.statusbar}></View>
        <View style={styles.container}>
          <ScrollView style={styles.scrollContainer}>
            <MenuGroupLabel text='Public Channels'/>
            {publicChannels}

            <MenuGroupLabel text='Private Chats'/>

            <MenuGroupLabel text='More'/>
            <MenuItemContainer text='Settings' navTarget='settings'/>
            <MenuItemContainer text='About us' navTarget='aboutUs'/>
            {Platform.OS === 'android' ?
              <View style={{height: 100, width: window.width}}/> : null
            }
          </ScrollView>
        </View>
      </Image>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'row'
  },
  scrollContainer: {
    flex: 1,
    width: window.width * 0.8,
    height: window.height - 20,
    backgroundColor: 'transparent'
  },
  profileInfoContainer: {
    padding: 15,
    flex: 1,
    alignItems: 'center'
  },
  profileInfoText: {
    ...globalStyles.userName,
    color: '#fff',
    marginTop: 5,
    marginBottom: 3
  },
  subProfileInfoText: {
    ...globalStyles.s,
    color: '#fff',
    marginBottom: 8
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#fff'
  },
  statusbar: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: 0,
    width: window.width * 0.8,
    flex: 1
  }
}

if (Platform.OS === 'ios') {
  styles.statusbar.height = 20
}

export default connect(
  (state) => {
    return {
      login: state.login,
      notifications: state.notifications
    }
  },
  (dispatch) => {
    return {
      resetTo: (view) => {
        dispatch(resetTo(view))
      },
      navigateTo: (view) => {
        dispatch(navigateTo(view));
      },
      logout: () => {
        dispatch(logout())
      },
      getUnreadMessageCount: (userId) => {
        dispatch(getUnreadMessageCount(userId))
      }
    }
  }
)(MenuContainer)
