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
import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const setUserState = async (authUser) => {
    const response = await auth.fetchUserByAuthUid(authUser.uid);
    setUser(response._data);
  };

  const onAuthStateChanged = async (authUser) => {
    try {
      if (authUser) {
        await setUserState(authUser); // Goes to firestore and fetches user data for the logged user and sets to App's state.
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (isLoading) setIsLoading(false);
    }
  };

  const logOutUser = async () => {
    await auth.logOutUser();
  };

  useEffect(() => {
    const unsubscribe = auth.authStateChange(onAuthStateChanged);
    if (user) {
      const subscriber = firestore()
        .collection('Users')
        .doc(user.uid)
        .onSnapshot((documentSnapshot) => {
          const data = documentSnapshot.data();
          console.log(data);
          setUser(data);
        });
      return () => {
        unsubscribe();
        subscriber();
      };
    }
    return unsubscribe;
  }, []);

  if (isLoading) return <Text>Loading...</Text>;
  const isLoggedIn = !!user;
  return (
    <AuthProvider value={{user, isLoggedIn, ...auth, setUserState, logOutUser}}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {isLoggedIn ? (
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
