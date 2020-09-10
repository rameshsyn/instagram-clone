import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from '../Icon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

const PostFooter = ({likes, username, description}) => {
  return (
    <View style={styles.postFooter}>
      <View style={styles.icons}>
        <View style={styles.leftIcons}>
          <Icon name="heart-outline" />
          <Icon name="comment-o" component={FontAwesome} />
          <Icon name="send" component={FeatherIcon} />
        </View>
        <View>
          <Icon name="bookmark-outline" />
        </View>
      </View>
      <View style={styles.footerBottom}>
        {likes && <Text style={styles.likes}>{likes} likes</Text>}
        <Text>
          <Text style={styles.username}>{username}</Text>
          {description}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  postFooter: {},
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftIcons: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: '700',
    marginRight: 20,
  },
  likes: {
    fontWeight: 'bold',
  },
  footerBottom: {
    paddingLeft: 15,
  },
});
export default PostFooter;
