import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
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
        <Icon name="dots-three-vertical" component={Entypo} size={17} />
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
