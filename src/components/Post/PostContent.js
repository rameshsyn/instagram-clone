import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableHighlight} from 'react-native';

const PostContent = ({postImage, handleImagePress}) => {
  return (
    <TouchableHighlight onPress={handleImagePress}>
      <View>
        <Image
          source={{
            uri: postImage,
          }}
          style={styles.image}
        />
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});
export default PostContent;
