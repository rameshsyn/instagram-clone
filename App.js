import React, {useState, useEffect} from 'react';
import {StatusBar, Text} from 'react-native';
import {
  Feed,
  Profile,
  Search,
  Notification,
  Login,
  Signup,
} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthProvider} from './src/authContext';
import * as auth from './src/firebase/auth';


const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = (user) => {
    console.log(user);
    setUser(user);
    if (isLoading) setIsLoading(false);
  };

  useEffect(() => {
    const subscriber = auth.authStateChange(onAuthStateChanged);
    return subscriber;
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <AuthProvider value={{user, ...auth}}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {user ? (
            <>
              <Stack.Screen name="Feed" component={Feed} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="Notification" component={Notification} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
