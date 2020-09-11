import React from 'react';
import BottomTab from './BottomTab';
import {View, StyleSheet} from 'react-native';

const ScreenLayout = ({children}) => {
  return (
    <View style={styles.layout}>
      <View style={styles.screen}>{children}</View>
      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  screen: {},
});

export default ScreenLayout;
