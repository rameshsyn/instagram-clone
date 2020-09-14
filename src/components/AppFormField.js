import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import AppTextInput from './AppTextInput';
import theme from '../config/theme';

const AppFormField = ({label, name, hideAppTextInput, ...rest}) => {
  return (
    <View style={styles.formField}>
      <Text style={styles.labelText}>{label}</Text>
      {!hideAppTextInput && (
        <AppTextInput style={styles.input} name={name} {...rest} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formField: {
    marginVertical: 10,
  },
  labelText: {
    fontSize: 13,
    color: theme.colors.grey,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
    fontSize: 17,
  },
});

export default AppFormField;
