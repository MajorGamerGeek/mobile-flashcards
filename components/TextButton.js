import React from 'react';
import { Platform, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { purple, white, blue } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn } onPress={onPress}>
        <Text style={styles.btn}>{children}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue
  },
  btn: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
    height: 45,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iosBtn: {
    backgroundColor: purple,
    borderColor: white,
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
    height: 45
  },
})