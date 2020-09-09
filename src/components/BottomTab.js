import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ProfileImage from '../assets/images/michael-dam.jpg';

const iconSize = 30;
const iconColor = '#333333';
const bgColor = 'white';

const BottomTab = ({navigation}) => {
  return (
    <View style={styles.bottomTab}>
      <Icon
        name="home-outline"
        size={iconSize}
        color={iconColor}
        onPress={() => navigation.navigate('Feed')}
      />
      <MaterialIcon
        name="search"
        size={iconSize}
        color={iconColor}
        onPress={() => navigation.navigate('Search')}
      />
      <Icon
        name="instagram"
        size={iconSize}
        color={iconColor}
        onPress={() => navigation.navigate('Feed')}
      />
      <Icon
        name="heart-outline"
        size={iconSize}
        color={iconColor}
        onPress={() => navigation.navigate('Feed')}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={ProfileImage} style={styles.profileImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    backgroundColor: bgColor,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    height: iconSize,
    width: iconSize,
    borderRadius: 15,
  },
});

export default BottomTab;
