import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Icon from './Icon';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ProfileImage from '../assets/images/michael-dam.jpg';
import {useNavigation} from '@react-navigation/native';
import theme from '../config/theme';
import AddPostModal from '../screens/AddPostModal';

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
      <AddPostModal
        triggerComponent={<Icon name="plus-square" component={FeatherIcon} />}
      />

      <Icon
        name="heart-outline"
        onPress={() => navigation.navigate('Notification')}
      />

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
    height: 55,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopColor: theme.colors.grey,
    borderTopWidth: 1,
  },
  profileImage: {
    height: theme.sizes.icon,
    width: theme.sizes.icon,
    borderRadius: 15,
  },
});

export default BottomTab;
