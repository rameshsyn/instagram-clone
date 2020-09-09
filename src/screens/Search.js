import React from 'react';
import {View, Text} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';

const Search = ({navigation}) => {
  return (
    <ScreenLayout navigation={navigation}>
      <View>
        <Text>This is Search screen.</Text>
      </View>
    </ScreenLayout>
  );
};
export default Search;
