import React, {useEffect, useState} from 'react';
import ScreenLayout from '../components/ScreenLayout';
import Stories from '../components/Story/index';
import Posts from '../components/Post';
import {View, ScrollView, StyleSheet} from 'react-native';
import TopTab from '../components/TopTab';
import theme from '../config/theme';
import {getFeedPosts} from '../firebase/auth';
import {useAuth} from '../authContext';

const stories = [
  {
    image:
      'https://instagram.fktm8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/53613934_278745363050360_1949360354278506496_n.jpg?_nc_ht=instagram.fktm8-1.fna.fbcdn.net&_nc_ohc=w1Bi5HcR0lQAX_Xp5UF&oh=0f1e91f68a22438d0e33d0244bb5cbb2&oe=5F835D91',
    username: 'rameshsyn',
  },
  {
    image:
      'https://instagram.fktm8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/104178885_549712812376841_4953640171997264339_n.jpg?_nc_ht=instagram.fktm8-1.fna.fbcdn.net&_nc_ohc=YQtDrY325UEAX_QGjYx&oh=72f9fd7b82de9f48ea265f37da065b4d&oe=5F831344',
    username: 'baladnes',
  },
  {
    image:
      'https://images.unsplash.com/photo-1599577180570-74005925b055?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80',
    username: 'raitingtong',
  },
  {
    image:
      'https://images.unsplash.com/photo-1599526449314-12d6ca2dde92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    username: 'david',
  },
  {
    image:
      'https://images.unsplash.com/photo-1599651533235-49858dacc602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80',
    username: 'janedoejanedoe',
  },
  {
    image:
      'https://images.unsplash.com/photo-1599651533235-49858dacc602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80',
    username: 'janedoejanedoe',
  },
  {
    image:
      'https://images.unsplash.com/photo-1599651533235-49858dacc602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80',
    username: 'janedoejanedoe',
  },
];

const Feed = () => {
  const {user} = useAuth();
  const [posts, setPosts] = useState([]);

  const fetchFeedPosts = async () => {
    try {
      const posts = await getFeedPosts(user.uid);
      const _posts = posts.map(
        ({
          imageUrl,
          caption,
          location,
          likes,
          comments,
          postedBy,
          ...rest
        }) => ({
          postImage: imageUrl,
          description: caption,
          location,
          likes: likes,
          comments: comments,
          username: postedBy.username,
          profileImage: postedBy.photoUrl,
          ...rest,
        }),
      );
      setPosts(_posts);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchFeedPosts();
  }, []);
  return (
    <ScreenLayout>
      <View style={styles.feedScreen}>
        <TopTab />
        <ScrollView>
          <Stories stories={stories} />
          <Posts posts={posts} />
        </ScrollView>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  feedScreen: {
    backgroundColor: theme.colors.white,
  },
});

export default Feed;
