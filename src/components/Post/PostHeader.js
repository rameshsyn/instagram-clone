import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from '../Icon';

const PostHeader = ({username, place, profileImage}) => {
  return (
    <View style={styles.postHeader}>
      <View style={styles.detail}>
        <Image
          source={{
            uri: profileImage,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text>{place}</Text>
        </View>
      </View>
      <View>
        <Icon name="options" component={SimpleLineIcons} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
  },
  detail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  username: {
    fontWeight: 'bold',
  },
});

export default PostHeader;
