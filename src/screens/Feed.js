import React from 'react';
import {View, Text} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';

const Feed = ({navigation}) => {
  return (
    <ScreenLayout navigation={navigation}>
      <View>
        <Text>This is Feed screen.</Text>
      </View>
    </ScreenLayout>
  );
};
export default Feed;
