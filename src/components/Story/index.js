import React from 'react';
import StoryCard from './StoryCard';
import {ScrollView, StyleSheet, View} from 'react-native';

const Stories = ({stories}) => {
  const storiesEl = stories.map((story, i) => (
    <StoryCard key={i} image={story.image} username={story.username} />
  ));
  return (
    <View style={styles.stories}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <StoryCard
          image="https://images.unsplash.com/photo-1599651533235-49858dacc602?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
          username="Your Story"
          isAddNew
        />
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
