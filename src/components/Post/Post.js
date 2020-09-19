import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import theme from '../../config/theme';
import {likeUnlikePost} from '../../firebase/auth';
import {useAuth} from '../../authContext';

const Post = ({
  username,
  profileImage,
  postImage,
  description,
  likes,
  comments,
  location,
  pid,
}) => {
  const {user} = useAuth();
  const [liked, setLiked] = useState(() => likes.includes(user.uid));
  const [likeCount, setLikeCount] = useState(likes.length);
  const handleImage = () => {
    // collect user data
    if (!liked) {
      setLiked(true);
      setLikeCount(likeCount + 1);
      likeUnlikePost(true, pid, user.uid);
    }
  };

  const handleHeartPress = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    likeUnlikePost(!liked, pid, user.uid);
  };

  return (
    <View style={styles.post}>
      <PostHeader
        username={username}
        location={location}
        profileImage={profileImage}
      />
      <PostContent postImage={postImage} handleImagePress={handleImage} />
      <PostFooter
        username={username}
        description={description}
        comments={comments}
        liked={liked}
        likeCount={likeCount}
        handleHeartPress={handleHeartPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 10,
    backgroundColor: theme.colors.white,
  },
});

export default Post;
