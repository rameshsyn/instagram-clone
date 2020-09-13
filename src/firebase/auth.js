import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {userSchema} from './schema';

export const authStateChange = (onAuthStateChanged) => {
  const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
  return unsubscribe;
};

export const createUser = async (email, password, username) => {
  const authResponse = await auth().createUserWithEmailAndPassword(
    email,
    password,
  );
  await firestore()
    .collection('Users')
    .doc(authResponse.user.uid)
    .set({
      ...userSchema,
      email: authResponse.user.email,
      username,
      uid: authResponse.user.uid,
    });
  return authResponse;
};

export const loginUser = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const logOutUser = () => {
  return auth().signOut();
};

export const fetchUserByAuthUid = (Uid) => {
  return firestore().collection('Users').doc(Uid).get();
};

export const updateData = (collection, document, data) => {
  return firestore().collection(collection).doc(document).update(data);
};
