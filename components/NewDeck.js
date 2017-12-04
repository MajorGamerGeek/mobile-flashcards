import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { addDeck } from '../actions'
import { submitDeck } from '../utils/api'
import { black } from '../utils/colors';

class NewDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Best Title Ever!',
      questions: []
    }
  }

  submit = () => {
    const key = this.state.title    
    const deck = this.state

    console.log(key);
    console.log(deck);

    this.props.dispatch(addDeck({
      [key]: deck
    }))

    this.setState(() => ({ title: 'ResetState' }));

    submitDeck({ key, deck });

    //TODO GO TO new deck
  }
  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.container}>
          <Text style={styles.question}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
          />
          <TextButton onPress={this.submit}>
            Add Deck
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

export default connect(mapStateToProps)(NewDeck);

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
