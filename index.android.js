import React from 'react-native'
import { Provider } from 'react-redux/native'

import initializeApp from './shared/initializeApp'
import configureStore from './shared/configureStore'

import RootComponent from './shared/components/RootComponent'

const store = configureStore()

const HackReact = React.createClass({
  componentWillMount: () => {
    initializeApp(store.dispatch, store)
  },

  render: () => {
    return (
      <Provider store={store}>
        {() => <RootComponent />}
      </Provider>
    )
  }
})

React.AppRegistry.registerComponent('HackReact', () => HackReact)
