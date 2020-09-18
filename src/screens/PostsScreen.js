import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import Posts from '../components/Post';
import Post from '../components/Post/Post';
import {fetchUserByAuthUid} from '../firebase/auth';
import BottomTab from '../components/BottomTab';

const PostsScreen = ({route}) => {
  const [user, setUser] = useState([]);
  const [remainingPosts, setRemainingPosts] = useState([]);
  const {post, posts} = route.params;
  const {imageUrl, caption, postedBy, location, likes, comments} = post;

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUserByAuthUid(postedBy);
      setUser(userData._data);
      setRemainingPosts(
        posts
          .filter((fetchedPost) => fetchedPost.imageUrl !== post.imageUrl)
          .map(({imageUrl, caption, location, likes, comments}) => ({
            postImage: imageUrl,
            description: caption,
            place: location,
            likes: likes.length,
            comments: comments.length,
            username: userData._data.username,
            profileImage: userData._data.photoUrl,
          })),
      );
    };
    fetchUserData();
  }, []);

  return (
    <>
      <ScrollView>
        <Post
          postImage={imageUrl}
          description={caption}
          place={location}
          likes={likes.length}
          comments={comments.length}
          username={user?.username}
          profileImage={user?.photoUrl}
        />
        <Posts posts={remainingPosts} />
      </ScrollView>
      <BottomTab />
    </>
  );
};

export default PostsScreen;
