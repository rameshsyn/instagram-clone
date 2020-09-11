import React from 'react';
import {StatusBar} from 'react-native';
import {Feed, Profile, Search, AddPost} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AddPost"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="AddPost" component={AddPost} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
