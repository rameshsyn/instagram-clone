import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <Text>Loading....</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Loading;
