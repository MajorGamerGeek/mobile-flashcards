import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title
    }
  }

  render() {
    const { deck, navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.textStyles}>{deck.questions && deck.questions.length} Card(s) in Deck</Text>
        <Text style={styles.textStyles}>{deck.title}</Text>
        <TextButton onPress={() => navigation.navigate("NewCard", { deckId: deck.title })}>Add Card</TextButton>
        {deck.questions.length > 0 && <TextButton onPress={() => navigation.navigate("Quiz", { deckId: deck.title })}>Start Quiz</TextButton>}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textStyles: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    margin: 5
  },
});