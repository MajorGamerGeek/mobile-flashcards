import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { addCardToDeck } from '../actions';
import { submitCardToDeck } from '../utils/api';
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
    const { deck, deckId, navigation } = this.props;
    const card = this.state;

    if (card && card.question !== '' && card.anwser !== '') {
      this.props.dispatch(addCardToDeck(deckId, card))

      this.setState(() => ({ question: '', anwser: '' }));

      submitCardToDeck(deckId, card);

      Keyboard.dismiss();
      navigation.goBack();
    }
  }

  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.question}>Question</Text>
          <TextInput
            style={styles.input}
            onChangeText={(question) => this.setState({ question })}
            value={this.state.question}
            autoFocus={true}
            blurOnSubmit={false}
            returnKeyType="next"
          />
          <Text style={styles.question}>Anwser</Text>
          <TextInput
            style={styles.input}
            onChangeText={(anwser) => this.setState({ anwser })}
            value={this.state.anwser}
            onSubmitEditing={this.submit}
          />
          <TextButton onPress={this.submit}>
            Add Card
          </TextButton>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: state[deckId],
    deckId
  };
};

export default connect(mapStateToProps)(NewCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
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