import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      correctCount: 0
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
      this.setState(() => ({ correctCount: correctCount++ }));
    } else {
      this.setState({ correctCount: correctCount-- }));
    }

    this.setState(() => ({ questionNumber: questionNumber++ }));
  }

  render() {
    const { deck, navigation } = this.props;
    const { correctCount, questionNumber } = this.state;

    console.log(deck);
    console.log(correctCount);
    console.log(questionNumber);

    return (
      <View style={styles.container}>
        {deck.questions.length > 0 && (<View>
              <Text>{correctCount} - Correct</Text>
              <Text>{deck.questions[questionNumber].question}</Text>
              <Text>{deck.questions[questionNumber].anwser}</Text>
            </View>) }
        <TextButton onPress={this.anwser('correct')}>Correct</TextButton>
        <TextButton onPress={this.anwser('incorrect')}>Incorrect</TextButton>
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