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

export const subscribeCollectionDocChange = (collection, document, cb) => {
  return firestore()
    .collection(collection)
    .doc(document)
    .onSnapshot((documentSnapshot) => {
      cb(documentSnapshot.data());
    });
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
      createdAt: Date.now(),
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
  const postDocRef = firestore().collection('Posts').doc();
  const pid = postDocRef.id;
  await firestore()
    .collection('Posts')
    .add({
      ...postSchema,
      imageUrl: url,
      caption,
      postedBy: uid,
      createdAt: Date.now(),
      pid,
    });
};

export const readDocument = async (collection, document) => {
  const data = await firestore().collection(collection).doc(document).get();
  return data._data;
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

export const followUserById = (loggedInUserId, userId) => {
  const updateLoggedInUser = updateData('Users', loggedInUserId, {
    following: firestore.FieldValue.arrayUnion(userId),
  });

  const updateUser = updateData('Users', userId, {
    followers: firestore.FieldValue.arrayUnion(loggedInUserId),
  });
  return Promise.all([updateLoggedInUser, updateUser]);
};

export const unfollowUserById = (loggedInUserId, userId) => {
  const updateLoggedInUser = updateData('Users', loggedInUserId, {
    following: firestore.FieldValue.arrayRemove(userId),
  });

  const updateUser = updateData('Users', userId, {
    followers: firestore.FieldValue.arrayRemove(loggedInUserId),
  });
  return Promise.all([updateLoggedInUser, updateUser]);
};

export const getFollowingByUserId = async (userId) => {
  const response = await firestore().collection('Users').doc(userId).get();
  const following = response._data.following;
  const followingUserDetailsReqs = following.map((id) =>
    firestore().collection('Users').doc(id).get(),
  );
  const followingUserDetailsRes = await Promise.all(followingUserDetailsReqs);
  return followingUserDetailsRes.map((res) => res._data);
};

export const getFollowersByUserId = async (userId) => {
  const response = await firestore().collection('Users').doc(userId).get();
  const followers = response._data.followers;
  const followersUserDetailsReqs = followers.map((id) =>
    firestore().collection('Users').doc(id).get(),
  );
  const followersUserDetailsRes = await Promise.all(followersUserDetailsReqs);
  return followersUserDetailsRes.map((res) => res._data);
};

// Get posts by uid
export const getPostsByUid = async (uid) => {
  const userData = await readDocument('Users', uid);
  const postDocs = (
    await firestore().collection('Posts').where('postedBy', '==', uid).get()
  )._docs;

  return postDocs.map((postDoc) => ({
    ...postDoc._data,
    postedBy: userData,
  }));
};

// Get posts posted by following users for logged in user.
export const getFeedPosts = async (userId) => {
  const followingIds = (await readDocument('Users', userId)).following;
  return (
    await Promise.all(followingIds.map((fid) => getPostsByUid(fid)))
  ).flat();
};

export const likeUnlikePost = async (liked, postId, userId) => {
  if (liked) {
    return await updateData('Posts', postId, {
      likes: firestore.FieldValue.arrayUnion(userId),
    });
  } else {
    return await updateData('Posts', postId, {
      likes: firestore.FieldValue.arrayRemove(userId),
    });
  }
};
