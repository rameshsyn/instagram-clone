import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from '../Icon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import theme from '../../config/theme';

const PostFooter = ({
  username,
  description,
  liked,
  likeCount,
  handleHeartPress,
}) => {
  return (
    <View style={styles.postFooter}>
      <View style={styles.icons}>
        <View style={styles.leftIcons}>
          <Icon
            name={liked ? 'heart' : 'heart-outline'}
            color={liked ? theme.colors.heart : theme.colors.charcoal}
            onPress={handleHeartPress}
          />
          <Icon name="comment-o" component={FontAwesome} />
          <Icon name="send" component={FeatherIcon} />
        </View>
        <View>
          <Icon name="bookmark-outline" />
        </View>
      </View>
      <View style={styles.footerBottom}>
        <Text style={styles.likes}>
          {likeCount} {likeCount > 1 ? 'likes' : 'like'}
        </Text>
        <Text>
          <Text style={styles.username}>{username}</Text>
          <Text>{description}</Text>
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
  outline: {
    backgroundColor: 'red',
  },
});
export default PostFooter;
