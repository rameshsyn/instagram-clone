import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const PostContent = ({postImage}) => {
  return (
    <View>
      <Image
        source={{
          uri: postImage,
        }}
        style={styles.image}
      />
    </View>
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
