import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import DeckItem from './DeckItem';
import { fetchDecks } from '../utils/api';
import { getDecks } from '../actions';
import { AppLoading } from 'expo';

class DeckList extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { dispatch } = this.props;

    console.log('Calling fetchDecks');
    fetchDecks().then((decks) => dispatch(getDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })));
  }

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        {decks.length > 0 &&
          <FlatList data={decks} keyExtractor={item => item.title}
            renderItem={({ item }) => <DeckItem deck={item}
              navigation={this.props.navigation} />} />}
      </View>
    )
  }
}

function mapStateToProps(decks) {
  const decksArr = [];

  for (let deck in decks) {
    decksArr.push(decks[deck]);
  }

  return {
    decks: decksArr
  };
};

export default connect(mapStateToProps)(DeckList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});