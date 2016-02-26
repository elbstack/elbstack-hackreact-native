import React, {
  Platform,
  Component,
  View,
  ScrollView,
  InteractionManager,
  Switch
} from 'react-native'
import { connect } from 'react-redux/native'

import { toggleSettings } from '../../actions/settings'

import ActionBar from '../container/ActionBar'
import LoadingIndicator from '../atoms/LoadingIndicator'
import Text from '../atoms/Text'
import Separator from '../atoms/Separator'

import globalStyles from '../../constants/GlobalStyles'
import colors from '../../constants/Colors'

const availableSettings = [
  {
    title: 'General',
    items: [
      {
        key: 'sendTyping',
        label: 'Ich tippe Information senden'
      },
      {
        key: 'publicAvailable',
        label: 'Findbar in der öffentlichen Suche'
      }
    ]
  }
]

class SettingsPage extends Component {
  state = {
    interactionsFinished: false
  };

  _onValueChange(key, value) {
    this.props.toggleSettings(key, value)
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({interactionsFinished: true})
    })
  }

  render() {
    let interactionsFinishedMarkup = <LoadingIndicator/>

    if (this.state.interactionsFinished) {

      let rightMargin = 0
      if (Platform.OS === 'android') {
        rightMargin = 20
      }

      interactionsFinishedMarkup = []
      interactionsFinishedMarkup.push(<Separator key='separatorFirst'/>)
      availableSettings.forEach((category) => {
        interactionsFinishedMarkup.push(
            <View key={'headline' + category.title}
                  style={styles.listLabelWrapper}>
            <Text style={styles.listLabel}>{category.title}</Text>
          </View>)
        interactionsFinishedMarkup.push(<Separator key={'separator' + category.title}/>)

        category.items.forEach((item) => {
          interactionsFinishedMarkup.push(
            <View key={'item' + item.key} style={styles.settingsItem}>
              <Text style={styles.settingsItemLabel}>{item.label}</Text>
              <Switch
                style={[styles.settingsSwitch, {marginRight: rightMargin}]}
                onValueChange={(value) => { this._onValueChange(item.key, value) }}
                value={this.props.settings[item.key]}
              />
            </View>
          )
          interactionsFinishedMarkup.push(<Separator key={'separator' + item.key}/>)
        })
      })

      interactionsFinishedMarkup.push(
        <View key="footer" style={styles.footer}>
          <Text style={styles.footerContent}>Made with love in Hamburg.</Text>
        </View>
      )

    }

    return (
      <View style={styles.container}>
        <ActionBar title="Settings"/>
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
    backgroundColor: '#fff'
  },
  listLabelWrapper: {
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: colors.INPUT_BG
  },
  listLabel: {
    ...globalStyles.listLabel
  },
  settingsItem: {
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  settingsItemLabel: {
    ...globalStyles.m,
    flex: 8,
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 12
  },
  settingsSwitch: {
    flex: 2
  },
  footer: {
    margin: 50,
    justifyContent: 'center'
  },
  footerContent: {
    ...globalStyles.xs,
    color: colors.DARKGREY,
    textAlign: 'center'
  }
}


export default connect(
  (state) => {
    return {
      settings: state.settings
    }
  },
  (dispatch) => {
    return {
      toggleSettings: (key, value) => dispatch(toggleSettings(key, value))
    }
  }
)(SettingsPage)
