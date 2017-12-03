import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextButton from './TextButton';

class Deck extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text>I am a DECK!</Text>
        <TextButton>Add Card</TextButton>
        <TextButton>Start Quiz</TextButton>
      </View>
    )
  }
}

export default Deck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});