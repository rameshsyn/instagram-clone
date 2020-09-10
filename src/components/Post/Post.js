import React from 'react';
import {StyleSheet, View} from 'react-native';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';

const Post = ({
  username,
  profileImage,
  postImage,
  description,
  likes,
  comments,
  place,
}) => {
  return (
    <View style={styles.post}>
      <PostHeader
        username={username}
        place={place}
        profileImage={profileImage}
      />
      <PostContent postImage={postImage} />
      <PostFooter
        username={username}
        likes={likes}
        description={description}
        comments={comments}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 10,
  },
});

export default Post;
