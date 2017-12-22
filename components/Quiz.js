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
      height: new Animated.Value(0),
      rotate: new Animated.Value(0)
    }
  }

  componentWillMount() {
    const { rotate } = this.state;

    this.frontInterpolate = rotate.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });

    this.backInterpolate = rotate.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });
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

    this.setState((prevState) => ({ questionNumber: prevState.questionNumber + 1, correctCount: prevState.correctCount + 1, rotate: new Animated.Value(0) }));
  }

  incorrect = () => {
    const prevState = this.state;

    this.setState((prevState) => ({ questionNumber: prevState.questionNumber + 1, rotate: new Animated.Value(0) }));
  }

  showAnwser = () => {
    const { rotate } = this.state;

    Animated.spring(rotate, { toValue: 180, friction: 7, tension: 10 }).start();
  }

  showQuestion = () => {
    const { rotate } = this.state;

    Animated.spring(rotate, { toValue: 0, friction: 7, tension: 10 }).start();
  }

  startOver = () => {
    this.setState(() => ({
      questionNumber: 0,
      correctCount: 0,
      rotate: new Animated.Value(0)
    }));
  };

  navigateHome = () => {
    const { navigation } = this.props;
    
    navigation.navigate("Home");
  }

  render() {
    const { deck } = this.props;
    const { correctCount, questionNumber } = this.state;

    console.log(deck);
    console.log(correctCount);
    console.log(deck.questions.length);

    const frontRotateStyle = {
      transform: [
        {
          rotateY: this.frontInterpolate
        }
      ]
    };

    const backRotateStyle = {
      transform: [
        {
          rotateY: this.backInterpolate
        }
      ]
    };

    return (
      <View style={styles.container}>
      {deck.questions.length > 0 && <View>
        {questionNumber < deck.questions.length ?
          <View>
            <Animated.View style={[styles.question, frontRotateStyle]}>
              <Text>{questionNumber + 1} / {deck.questions.length}</Text>
              <Text>{correctCount} - Correct</Text>
              <Text>{deck.questions[questionNumber].question}</Text>
              <Text style={styles.textStyles} onPress={this.showAnwser}>Show Anwser</Text>
              <Animated.View style={[styles.anwser, backRotateStyle]}>
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
    justifyContent: 'center',
  },
  anwser: {
    backgroundColor: 'red',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    top: 0,
  }
});