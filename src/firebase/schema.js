// Firestore collection schema

export const userSchema = {
  uid: '',
  username: '',
  fullName: '',
  website: '',
  bio: '',
  email: '',
  gender: '',
  phone: '',
  photoUrl: '',
  followers: [
    // {
    //   userId: '',
    //   date: new Date()
    // }
  ],
  following: [
    // {
    //   userId: '',
    //   date: new Date()
    // }
  ],
  createdAt: Date.now(),
};

export const postSchema = {
  pid: '',
  imageUrl: '',
  caption: {
    text: '',
    hashTags: [],
    mentions: [],
  },
  likes: [], // UserId
  comments: [], // CommentId
  postedBy: null, // UserId,
  tagged: [],
  location: '',
  createdAt: Date.now(),
};

export const storySchema = {};

export const commentSchema = {};
