import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { addDeck } from '../actions'
import { submitDeck } from '../utils/api'
import { black } from '../utils/colors';

class NewDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      questions: []
    }
  }

  submit = () => {
    const { navigation } = this.props;
    const key = this.state.title;
    const deck = this.state;

    if (deck && deck.title !== '') {
      this.props.dispatch(addDeck({ [key]: deck }));

      this.setState(() => ({ title: '', questions: [] }));

      submitDeck({ key, deck });

      Keyboard.dismiss();
      navigation.navigate("Deck", { title: key });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.questionText}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
            onSubmitEditing={this.submit}
          />
          <TextButton onPress={this.submit}>
            Add Deck
          </TextButton>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default connect()(NewDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  questionText: {
    fontSize: 30,
    textAlign: 'center'
  },
  input: {
    height: 35,
    width: 300,
    borderColor: black,
    borderWidth: 1,
    flexDirection: 'column',
    margin: 5
  }
});
