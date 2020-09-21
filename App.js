import React, {useState, useEffect} from 'react';
import {StatusBar, Text} from 'react-native';
import {
  Feed,
  Profile,
  Search,
  Notification,
  Login,
  Signup,
  AddPost,
} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthProvider} from './src/authContext';
import * as auth from './src/firebase/auth';
import BottomTab from './src/components/BottomTab';

const Tab = createBottomTabNavigator();

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
    return unsubscribe;
  }, []);

  if (isLoading) return <Text>Loading...</Text>;
  const isLoggedIn = !!user;
  return (
    <AuthProvider
      value={{user, isLoggedIn, ...auth, setUser, setUserState, logOutUser}}>
      <StatusBar />
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <BottomTab {...props} />}>
          {isLoggedIn ? (
            <>
              <Tab.Screen name="Feed" component={Feed} />
              <Tab.Screen name="Search" component={Search} />
              <Tab.Screen
                name="AddPost"
                component={AddPost}
                options={{tabBarVisible: false}}
              />
              <Tab.Screen name="Notification" component={Notification} />
              <Tab.Screen name="Profile" component={Profile} />
            </>
          ) : (
            <>
              <Tab.Screen
                name="Login"
                component={Login}
                options={{tabBarVisible: false}}
              />
              <Tab.Screen
                name="Signup"
                component={Signup}
                options={{tabBarVisible: false}}
              />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
