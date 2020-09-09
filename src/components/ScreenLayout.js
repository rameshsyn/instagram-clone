import React from 'react';
import BottomTab from './BottomTab';
import {View, StyleSheet} from 'react-native';

const ScreenLayout = ({children, navigation}) => {
  return (
    <View style={styles.layout}>
      <View style={styles.screen}>{children}</View>
      <BottomTab navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  screen: {
    padding: 20,
  },
});

export default ScreenLayout;
