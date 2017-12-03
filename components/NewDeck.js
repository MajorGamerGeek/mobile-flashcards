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
      title: 'Best Title Ever!'
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
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>What is the title of your new deck?</Text>
        <TextInput
          style={{height: 35, width: 300, borderColor: black, borderWidth: 1}}
          onChangeText={(title) => this.setState({ title })}
          value={this.state.title}
        />
        <TextButton onPress={this.submit}>
          Add Deck
        </TextButton>
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
    flex: 1,
    justifyContent: 'center',
  },
  question: {
    fontSize: 30,
    justifyContent: 'center',
  }
});
