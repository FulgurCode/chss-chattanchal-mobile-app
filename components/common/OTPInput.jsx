import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = (props) => {
  console.log(props)
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

  // const handlePaste = async () => {
  //   const clipboardContent = await ExpoClipboard.getStringAsync();
  //   const otpArray = clipboardContent
  //     .slice(0, props.numInputs)
  //     .split('')
  //     .map((char) => (isNaN(parseInt(char)) ? '' : char));

  //   const updatedOTPValues = [...props.value];
  //   otpArray.forEach((otpValue, index) => {
  //     if (index < props.numInputs) {
  //       updatedOTPValues[index] = otpValue;
  //     }
  //   });

  //   props.onChange(updatedOTPValues);
  // };

  const handleTextInputRef = (ref, index) => {
    inputRefs.current[index] = ref;
  };

  // const handleSelectionChange = (event) => {
  //   const { start, end } = event.nativeEvent.selection;
  //   if (start !== end && start === 0 && end > 0) {
  //     // User has made a selection and it starts from index 0, indicating a paste event
  //     const pastedText = text.slice(start, end);
  //     // Handle the pasted text as needed
  //     console.log('Pasted Text:', pastedText);
  //   }
  // };

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
            // onSelectionChange={handleSelectionChange}
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
