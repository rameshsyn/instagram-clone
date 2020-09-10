import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import theme from '../../config/theme';
import Icon from '../Icon';

const MAX_CHAR = 10;

const StoryCard = ({image, username, onPress, isAddNew}) => {
  const newUsername = username.slice(0, MAX_CHAR);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.story}>
        <View
          style={[styles.imageContainer, isAddNew ? styles.borderless : {}]}>
          <Image source={{uri: image}} style={styles.image} />
          {isAddNew && (
            <Icon
              name="plus-circle"
              color="#83CBFB"
              size={23}
              style={styles.plusIcon}
            />
          )}
        </View>
        <Text style={styles.text}>
          {newUsername}
          {username.length > 10 && '...'}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  borderless: {
    borderColor: theme.colors.white,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: theme.colors.white,
    borderWidth: 2,
  },
  imageContainer: {
    borderRadius: 40,
    borderColor: 'tomato',
    borderWidth: 3,
    position: 'relative',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: -8,
    zIndex: 3,
  },
  story: {
    display: 'flex',
    width: 90,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '200',
  },
});

StoryCard.defaultProps = {
  onPress: () => {},
};

export default StoryCard;
