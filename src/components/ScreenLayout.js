import React from 'react';
import {View, StyleSheet} from 'react-native';

const ScreenLayout = ({children}) => {
  return (
    <View style={styles.layout}>
      <View style={styles.screen}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  screen: {
    marginBottom: 155,
  },
});

export default ScreenLayout;
