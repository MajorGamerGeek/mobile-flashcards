import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { Constants } from 'expo';
import { MainNavigator } from './utils/navigation';
import { setLocalNotification } from './utils/notifications';
import { white, purple } from './utils/colors';

function FlashCardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer,
        composeEnhancers(applyMiddleware(logger)))}>
        <View style={styles.container}>
          <FlashCardsStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
