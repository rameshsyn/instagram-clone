import auth from '@react-native-firebase/auth';

export const authStateChange = (onAuthStateChanged) => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber;
};

export const createUser = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const loginUser = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const logOutUser = () => {
  return auth().signOut();
};
