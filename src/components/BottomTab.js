import React from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import Icon from './Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import theme from '../config/theme';
import {useAuth} from '../authContext';

const BottomTab = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const {user} = useAuth();

  const photoUrl = user?.photoUrl;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.bottomTab}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'AddPost') {
            navigation.navigate(route.name, {editProfilePic: false});
          } else {
            navigation.navigate(route.name);
          }
          {
            /* const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          } */
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let icon = null;

        if (route.name === 'Feed') {
          icon = <Icon name={isFocused ? 'home' : 'home-outline'} />;
        } else if (route.name === 'Search') {
          icon = (
            <Icon
              component={Ionicons}
              name={isFocused ? 'search' : 'search-outline'}
            />
          );
        } else if (route.name === 'AddPost') {
          icon = <Icon name="plus-square" component={FeatherIcon} />;
        } else if (route.name === 'Notification') {
          icon = <Icon name={isFocused ? 'heart' : 'heart-outline'} />;
        } else if (route.name === 'Profile') {
          icon = isFocused ? (
            <View style={styles.profileImageContainer}>
              <Image
                source={{uri: photoUrl}}
                style={[styles.profileImage, styles.profileImageFocused]}
              />
            </View>
          ) : (
            <Image source={{uri: photoUrl}} style={styles.profileImage} />
          );
        } else {
          icon = null;
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            {icon}
          </TouchableOpacity>
        );
      })}
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
  profileImageContainer: {
    padding: 2,
    borderColor: theme.colors.charcoal,
    borderWidth: 1,
    borderRadius: 18,
  },
  profileImageFocused: {
    borderWidth: 2,
    height: theme.sizes.icon - 6,
    width: theme.sizes.icon - 6,
  },
});

export default BottomTab;
