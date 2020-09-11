import React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import theme from '../config/theme';

const AppButton = ({title, style, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.button, style]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

AppButton.defaultProps = {
  style: {},
  onPress: () => {},
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AppButton;
