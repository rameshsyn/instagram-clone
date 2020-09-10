import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Icon from './Icon';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ProfileImage from '../assets/images/michael-dam.jpg';
import {useNavigation} from '@react-navigation/native';
import theme from '../config/theme';

const BottomTab = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.bottomTab}>
      <Icon name="home-outline" onPress={() => navigation.navigate('Feed')} />
      <Icon
        component={MaterialIcon}
        name="search"
        onPress={() => navigation.navigate('Search')}
      />
      <Icon name="instagram" onPress={() => navigation.navigate('Feed')} />
      <Icon name="heart-outline" onPress={() => navigation.navigate('Feed')} />

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={ProfileImage} style={styles.profileImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    backgroundColor: theme.colors.white,
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
    height: theme.sizes.icon,
    width: theme.sizes.icon,
    borderRadius: 15,
  },
});

export default BottomTab;
