import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';

export const Focus = ({addSubject}) => {
  const [value, setValue] = useState('');

  const handleOnChange = (val) => {
    setValue(val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="What would you like to focus on?"
          value={value}
          onChangeText={handleOnChange}
          style={styles.textInput}
        />
        <View style={styles.button}>
          <RoundedButton title="+" size={50} onPress={() => addSubject(value)}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  inputContainer: {
    padding: theme.spacing.lg,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  button: {
    justifyContent: 'center',
  },
});
