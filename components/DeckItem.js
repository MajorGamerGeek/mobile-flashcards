import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { gray } from "../utils/colors";

class DeckItem extends Component {
  
  render() {
    const { deck, navigation } = this.props;

    return (
      <TouchableOpacity style={styles.deck} onPress={() => navigation.navigate("Deck", { title: deck.title })}>
        <Text style={styles.deckTitle}>{deck.title}</Text>
        <Text style={styles.cards}>{deck.questions && deck.questions.length } Cards</Text>
      </TouchableOpacity>
    )
  }
}

export default DeckItem;

const styles = StyleSheet.create({
  deck: {
    padding: 20,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: gray,
    justifyContent: "center",
  },
  deckTitle: {
    fontSize: 20,
    textAlign: 'center'
  },
  cards: {
    textAlign: 'center'
  }
});