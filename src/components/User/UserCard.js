import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableHighlight, StyleSheet, View, Image, Text} from 'react-native';
import theme from '../../config/theme';

const UserCard = ({photoUrl, username, fullName, user}) => {
  const navigation = useNavigation();
  const viewProfile = (user) => {
    navigation.navigate('Profile', {screen: 'ProfileScreen', params: {user}});
  };

  return (
    <TouchableHighlight
      key={username}
      underlayColor={theme.colors.grey}
      onPress={() => viewProfile(user)}>
      <View style={styles.userContainer}>
        <View style={styles.profilePhotoContainer}>
          <Image source={{uri: photoUrl}} style={styles.profilePhoto} />
        </View>
        <View style={styles.userNames}>
          <Text style={styles.usernameText}>{username}</Text>
          <Text style={styles.fullNameText}>{fullName}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  profilePhotoContainer: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'tomato',
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  fullNameText: {
    color: theme.colors.grey,
    fontSize: 16,
  },
  userNames: {
    marginLeft: 15,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default UserCard;
