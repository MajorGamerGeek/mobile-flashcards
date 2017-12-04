import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';

class Deck extends Component {
  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text style={styles.cards}>{deck.questions && deck.questions.length } Cards</Text>
        <TextButton>Add Card</TextButton>
        <TextButton>Start Quiz</TextButton>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;

  return {
    deck: state[title]
  };
};

export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});