import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewPostShare from './NewPostShare';
import MediaBrowser from './MediaBrowser';

const Stack = createStackNavigator();

const AddPost = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MediaBrowser" mode="modal" component={MediaBrowser} />
      <Stack.Screen name="NewPostShare" component={NewPostShare} />
    </Stack.Navigator>
  );
};

export default AddPost;
