import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = (props) => {
  const inputRefs = useRef([]);

  const handleChangeText = (text, index) => {
    const updatedOTPValues = [...props.value];
    updatedOTPValues[index] = text;
    props.onChange(updatedOTPValues);

    if (text !== '' && index < props.numInputs - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInputFocus = (index) => {
    const updatedOTPValues = [...props.value];
    updatedOTPValues[index] = '';
    props.onChange(updatedOTPValues);
  };


  const handleTextInputRef = (ref, index) => {
    inputRefs.current[index] = ref;
  };


  return (
    <View style={styles.container}>
      {Array(props.numInputs)
        .fill()
        .map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            onFocus={() => handleInputFocus(index)}
            ref={(ref) => handleTextInputRef(ref, index)}
            value={props.value[index]}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OTPInput;
