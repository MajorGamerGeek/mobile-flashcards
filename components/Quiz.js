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
      cardFront: true,
      cardRotate: new Animated.Value(0)
    }
  }

  componentWillMount() {
    const { cardRotate } = this.state;

    this.frontInterpolate = cardRotate.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });

    this.backInterpolate = cardRotate.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });

    this.frontOpacity = cardRotate.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });

    this.backOpacity = cardRotate.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
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

  showCardFront = () => {
    const { cardFront, cardRotate } = this.state;

    if (!cardFront) {
      Animated.spring(cardRotate, { toValue: 0, friction: 7, tension: 10, useNativeDriver: true }).start();

      this.setState(() => { cardFront: true });
    }
  }

  correct = () => {
    const prevState = this.state;
    
    this.showCardFront();
    this.setState((prevState) => ({ questionNumber: prevState.questionNumber + 1, correctCount: prevState.correctCount + 1 }));
  }

  incorrect = () => {
    const prevState = this.state;

    this.showCardFront();
    this.setState((prevState) => ({ questionNumber: prevState.questionNumber + 1 }));
  }

  showAnwser = () => {
    const { cardRotate } = this.state;

    Animated.spring(cardRotate, { toValue: 180, friction: 7, tension: 10, useNativeDriver: true }).start();
    this.setState(() => ({ cardFront: false }));
  }

  showQuestion = () => {
    const { cardRotate } = this.state;

    Animated.spring(cardRotate, { toValue: 0, friction: 7, tension: 10, useNativeDriver: true }).start();
    this.setState(() => ({ cardFront: true }));
  }

  startOver = () => {
    this.setState(() => ({
      questionNumber: 0,
      correctCount: 0,
      cardFront: true
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
            <Animated.View style={[styles.card, frontRotateStyle, { opacity: this.frontOpacity }]}>
              <Text>{questionNumber + 1} / {deck.questions.length}</Text>
              <Text>{correctCount} - Correct</Text>
              <Text>{deck.questions[questionNumber].question}</Text>
              <Text style={styles.textStyles} onPress={this.showAnwser}>Show Anwser</Text>
            </Animated.View>
            <Animated.View style={[styles.card, styles.anwser, backRotateStyle, { opacity: this.backOpacity }]}>
              <Text>{deck.questions[questionNumber].anwser}</Text>
              <Text style={styles.textStyles} onPress={this.showQuestion}>Question</Text>
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
    alignItems: 'center',
  },
  textStyles: {
    color: '#aef',
    fontSize: 20
  },
  card: {
    height: 400,
    width: 300,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden'
  },
  anwser: {
    height: 200,
    width: 150,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0
  }
});