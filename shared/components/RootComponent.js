import React, {
  Animated,
  Component,
  Dimensions,
  Navigator,
  View,
  BackAndroid
} from 'react-native'

import SideMenu from 'react-native-side-menu'
import Popup from 'react-native-popup'

import { connect } from 'react-redux/native'

import { navigateTo, navigateBack, closeSideMenu, openSideMenu } from '../actions/navigation'

import renderScene from '../navigator/renderScene'
import popupManager from '../managers/popupManager'
import navigatorManager from '../managers/navigatorManager'

import MenuContainer from './container/MenuContainer'

class RootComponent extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.navigation.sideMenu.gesturesEnabled !== nextProps.navigation.sideMenu.gesturesEnabled ||
      (this.props.navigation.sideMenu.isOpen !== nextProps.navigation.sideMenu.isOpen && nextProps.navigation.sideMenu.updateView)
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.navigateBack()
      return true
    })
  }

  render() {
    return (
      <SideMenu
        onChange={(isOpen) => { isOpen ? this.props.openSideMenu(false) : this.props.closeSideMenu(false) }}
        menu={<MenuContainer navigator={navigatorManager.navigator}/>}
        edgeHitWidth={Dimensions.get('window').width * 0.8}
        openMenuOffset={Dimensions.get('window').width * 0.8}
        bounceBackOnOverdraw={false}
        touchToClose={true}
        isOpen={this.props.navigation.sideMenu.isOpen}
        disableGestures={!this.props.navigation.sideMenu.gesturesEnabled}
        animationFunction={(prop, value) => {
          return Animated.timing(
            prop,
            {
              toValue: value,
              duration: 250
            }
          )
        }}>
        <View style={styles.contentWrapper}>
          <Navigator
            sceneStyle={{ overflow: 'visible' }}
            ref={(navigator) => { navigatorManager.navigator = navigator }}
            edgeHitWidth={Dimensions.get('window').width * 0.8}
            initialRoute={{name: this.props.navigation.route}}
            configureScene={(route) => { return route.sceneConfig }}
            renderScene={renderScene.bind(this)}/>
          <Popup ref={(popup) => { popupManager.popup = popup }}/>
        </View>
      </SideMenu>
    )
  }
}

const styles = {
  contentWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'visible',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 20
  }
}

export default connect(
  (state) => {
    return {
      login: state.login,
      push: state.push,
      navigation: state.navigation
    }
  },
  (dispatch) => {
    return {
      navigateTo: (route) => dispatch(navigateTo(route)),
      openSideMenu: (updateView) => dispatch(openSideMenu(updateView)),
      closeSideMenu: (updateView) => dispatch(closeSideMenu(updateView)),
      navigateBack: () => dispatch(navigateBack())
    }
  }
)(RootComponent)
