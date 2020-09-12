import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import theme from '../config/theme';

const AppButton = ({title, style, onPress, color}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, color === 'primary' ? styles.primary : {}, style]}
      underlayColor={
        color === 'primary' ? theme.colors.btnColor : theme.colors.white
      }
      activeOpacity={0.7}>
      <Text
        style={[styles.text, color === 'primary' ? styles.primaryText : {}]}>
        {title}
      </Text>
    </TouchableHighlight>
  );
};

AppButton.defaultProps = {
  style: {},
  onPress: () => {},
  color: 'default',
};

AppButton.propTypes = {
  color: PropTypes.oneOf(['default', 'primary']),
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.background,
    padding: 15,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  primaryText: {
    color: theme.colors.white,
  },
  primary: {
    backgroundColor: theme.colors.btnColor,
  },
});

export default AppButton;
