import React from 'react';
import StoryCard from './StoryCard';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useAuth} from '../../authContext';

const Stories = ({stories}) => {
  const {
    user: {photoUrl},
  } = useAuth();
  const storiesEl = stories.map((story, i) => (
    <StoryCard key={i} image={story.image} username={story.username} />
  ));
  return (
    <View style={styles.stories}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <StoryCard image={photoUrl} username="Your Story" isAddNew />
        {storiesEl}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  stories: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingVertical: 15,
  },
});

export default Stories;
