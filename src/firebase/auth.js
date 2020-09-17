import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {userSchema, postSchema} from './schema';
import storage from '@react-native-firebase/storage';

// Listen for authentication state change
export const authStateChange = (onAuthStateChanged) => {
  // State Change situation
  // Sign in
  // Sign out
  const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
  return unsubscribe;
};

// Create user in firebase auth & firestore
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

// Upload post image to firebase storage and save image url with
// other post info to firestore Posts collection.
export const createPost = async (imageFilePath, caption, uid) => {
  const randomFileName = Math.random().toString(36).slice(-9);
  const STORAGE_PATH = `/images/${uid}/${randomFileName}`;

  // Get the storage reference
  const reference = storage().ref(STORAGE_PATH);

  // Upload to firebase storage
  await reference.putFile(imageFilePath);

  // get download url from firebase storage
  const url = await storage().ref(STORAGE_PATH).getDownloadURL();

  // save download url and other post info to firestore.
  await firestore()
    .collection('Posts')
    .add({
      ...postSchema,
      imageUrl: url,
      caption,
      postedBy: uid,
    });
};

// export const getImageFromStorage = async (uid) => {
//   const STORAGE_PATH = `/images/${uid}/`;

//   const imgReference = storage().ref(STORAGE_PATH);

// };

export const readCollectionPostedBy = async (collection, uid) => {
  return await firestore()
    .collection(collection)
    .where('postedBy', '==', uid)
    .get();
};

export const readDocument = async (collection, document) => {
  const data = await firestore().collection(collection).doc(document).get();
  return data;
};

export const loginUser = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const logOutUser = () => {
  return auth().signOut();
};

export const fetchAllUsers = () => {
  return firestore().collection('Users').get();
};

export const fetchUserByAuthUid = (Uid) => {
  return firestore().collection('Users').doc(Uid).get();
};

export const updateData = (collection, document, data) => {
  return firestore().collection(collection).doc(document).update(data);
};
