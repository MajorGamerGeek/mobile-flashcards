import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Deck from './Deck';
import { fetchDecks } from '../utils/api';
import { getDecks } from '../actions';
import { AppLoading } from 'expo';

class DeckList extends Component {
  state = {
    ready: false
  };

  componentDidMount () {
    const { dispatch } = this.props;

    console.log('I am here');
    fetchDecks().then((decks) => dispatch(getDecks(decks)))
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state

    console.log(decks);

    console.log(ready);
    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <Deck />
      </View>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
};

export default connect(mapStateToProps)(DeckList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});