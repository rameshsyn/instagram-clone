import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import Posts from '../components/Post';
import {getPostsByUid} from '../firebase/auth';

const PostsScreen = ({route}) => {
  const [posts, setPosts] = useState([]);
  const {userId} = route.params;
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPostsByUid(userId);
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  return (
    <ScrollView>
      <Posts posts={posts} />
    </ScrollView>
  );
};

export default PostsScreen;
