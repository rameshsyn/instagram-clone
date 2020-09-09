import React from 'react';
import {View, Text} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';

const Profile = ({navigation}) => {
  return (
    <ScreenLayout navigation={navigation}>
      <View>
        <Text>This is Profile screen.</Text>
      </View>
    </ScreenLayout>
  );
};
export default Profile;
