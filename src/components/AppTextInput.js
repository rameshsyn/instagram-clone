import React from 'react';
import {TextInput, Text, StyleSheet} from 'react-native';
import {useField, useFormikContext} from 'formik';

const AppTextInput = ({name, ...rest}) => {
  const [field, meta] = useField({name});
  const {handleChange, handleBlur} = useFormikContext();
  const {value} = field;

  return (
    <>
      <TextInput
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={value}
        {...rest}
      />
      {meta.touched && meta.error && (
        <Text style={styles.error}>{meta.error}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    paddingBottom: 10,
  },
});

export default AppTextInput;
