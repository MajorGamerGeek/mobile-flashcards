import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { black } from '../utils/colors';

export default class TextBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'test'
    };
  }

  render() {
    return (
      <TextInput
        style={{ height: 35, width: 300, borderColor: black, borderWidth: 1 }}
        onChangeText={(text) => this.setState({ text })}
        value={this.state.text}
      />
    );
  }
}