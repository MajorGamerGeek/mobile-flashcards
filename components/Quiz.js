import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      correctCount: 0,
      showAnwser: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: `${navigation.state.params.deckId} - Quiz`
    };
  };

  anwser = (a) => {
    const { correctCount, questionNumber } = this.state;

    if (a === 'correct') {
      this.setState(() => ({ correctCount: correctCount }));
    } else {
      this.setState(() => ({ correctCount: correctCount }));
    }

    this.setState(() => ({ questionNumber: questionNumber }));
  }

  correct = () => {
    const prevState = this.state;

    console.log(prevState.questionNumber);
    console.log(prevState.correctCount);

    this.setState((prevState) => ({ questionNumber: prevState.questionNumber + 1, correctCount: prevState.correctCount + 1, showAnwser: false }));
  }

  incorrect = () => {
    const prevState = this.state;

    this.setState((prevState) => ({ questionNumber: prevState.questionNumber + 1, showAnwser: false }));
  }

  showAnwser = () => {
    this.setState(() => ({ showAnwser: true }));
  }

  startOver = () => {
    this.setState(() => ({
      questionNumber: 0,
      correctCount: 0,
      showAnwser: false
    }));
  };

  render() {
    const { deck, navigation } = this.props;
    const { correctCount, questionNumber, showAnwser } = this.state;

    console.log(deck);
    console.log(correctCount);
    console.log(deck.questions.length);

    return (
      <View style={styles.container}>
      {deck.questions.length > 0 && <View>
        {questionNumber < deck.questions.length ?
          <View>
            <Text>{questionNumber + 1} / {deck.questions.length}</Text>
            <Text>{correctCount} - Correct</Text>
            <Text>{deck.questions[questionNumber].question}</Text>
            <Text>{showAnwser ? deck.questions[questionNumber].anwser : <Text onPress={this.showAnwser}>Show Anwser</Text>}</Text>
            <TextButton onPress={this.correct}>Correct</TextButton>
            <TextButton onPress={this.incorrect}>Incorrect</TextButton>
          </View> :
          <View>
            <Text>Completed Quiz Well DONE!</Text>
            <Text>{Math.round(((correctCount / deck.questions.length) * 100) * 100) / 100}% Correct</Text>
            <TextButton onPress={this.startOver}>Start Over</TextButton>
            <TextButton>Select a Deck</TextButton>
          </View>}
        </View>}
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: state[deckId]
  };
};

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});