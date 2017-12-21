import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      correctCount: 0,
      opacity: new Animated.Value(0),
      width: new Animated.Value(0),
      height: new Animated.Value(0)
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
    
    this.setState((prevState) => ({ questionNumber: prevState.questionNumber + 1, correctCount: prevState.correctCount + 1, opacity: new Animated.Value(0), width: new Animated.Value(0), height: new Animated.Value(0) }));
  }

  incorrect = () => {
    const prevState = this.state;

    this.setState((prevState) => ({ questionNumber: prevState.questionNumber + 1, opacity: new Animated.Value(0), width: new Animated.Value(0), height: new Animated.Value(0) }));
  }

  showAnwser = () => {
    const { opacity, width, height, frontInterpolate } = this.state;

    Animated.sequence([
      Animated.spring(width, { toValue: 350, speed: 3}),
      Animated.spring(height, { toValue: 350, speed: 3}),
      Animated.timing(opacity, { toValue: 1, duration: 500 })
    ]).start();
  }

  showQuestion = () => {
    const { opacity, width, height, frontInterpolate } = this.state;

    Animated.timing(opacity, { toValue: 0, duration: 1000 }).start();

    Animated.spring(width, { toValue: 0, speed: 3 }).start();
    Animated.spring(height, { toValue: 0, speed: 3 }).start();
  }

  startOver = () => {
    this.setState(() => ({
      questionNumber: 0,
      correctCount: 0,
      opacity: new Animated.Value(0),
      width: new Animated.Value(0),
      height: new Animated.Value(0),
      interpolate: new Animated.Value(0),
    }));
  };

  navigateHome = () => {
    const { navigation } = this.props;
    
    navigation.navigate("Home");
  }

  render() {
    const { deck,  } = this.props;
    const { correctCount, questionNumber, opacity, width, height } = this.state;

    console.log(deck);
    console.log(correctCount);
    console.log(deck.questions.length);

    return (
      <View style={styles.container}>
      {deck.questions.length > 0 && <View>
        {questionNumber < deck.questions.length ?
          <View>
            <Animated.View style={[styles.question]}>
              <Text>{questionNumber + 1} / {deck.questions.length}</Text>
              <Text>{correctCount} - Correct</Text>
              <Text>{deck.questions[questionNumber].question}</Text>
              <Text style={styles.textStyles} onPress={this.showAnwser}>Show Anwser</Text>
              <Animated.View style={[styles.anwser, {opacity, width, height}]}>
                <Text>{deck.questions[questionNumber].anwser}</Text>
                <Text style={styles.textStyles} onPress={this.showQuestion}>Question</Text>
              </Animated.View> 
            </Animated.View>
            <TextButton onPress={this.correct}>Correct</TextButton>
            <TextButton onPress={this.incorrect}>Incorrect</TextButton>
          </View> :
          <View>
            <Text>Completed Quiz Well DONE!</Text>
            <Text>{Math.round(((correctCount / deck.questions.length) * 100) * 100) / 100}% Correct</Text>
            <TextButton onPress={this.startOver}>Start Over</TextButton>
            <TextButton onPress={this.navigateHome}>Select a Deck</TextButton>
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
  textStyles: {
    color: '#aef',
    fontSize: 20
  },
  question: {
    height: 400,
    width: 400,
    backgroundColor: 'green',
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  anwser: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0
  }
});