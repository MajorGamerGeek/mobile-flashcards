import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { addCardToDeck } from '../actions'
import { submitCard } from '../utils/api'
import { black } from '../utils/colors';

class NewCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      anwser: ''
    }
  }

  submit = () => {
    const key = this.state.title
    const card = this.state

    console.log(key);
    console.log(card);

    this.props.dispatch(addCardToDeck(key, card))

    this.setState(() => ({ question: '', anwser: '' }));

    // TODO: Save Card to deck
  }
  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.container}>
          <Text style={styles.question}>Question</Text>
          <TextInput
            style={styles.input}
            onChangeText={(question) => this.setState({ question })}
            value={this.state.question}
          />
          <Text style={styles.question}>Anwser</Text>
          <TextInput
            style={styles.input}
            onChangeText={(anwser) => this.setState({ anwser })}
            value={this.state.anwser}
          />
          <TextButton onPress={this.submit}>
            Add Card
          </TextButton>
        </View>
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
  }
}

export default connect(mapStateToProps)(NewCard);

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 30,
    textAlign: 'center'
  },
  input: {
    height: 35,
    width: 300,
    borderColor: black,
    borderWidth: 1
  }
});