import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import theme from '../config/theme';
import Icon from '../components/Icon';
// import AppTextInput from '../components/AppTextInput';
import Feather from 'react-native-vector-icons/Feather';

const TopBar = () => {
  const navigation = useNavigation();
  const handleArrowClick = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.addpost}>
        <TouchableWithoutFeedback
          style={styles.arrowtext}
          onPress={handleArrowClick}>
          <Icon name="arrow-left" component={Feather} />
        </TouchableWithoutFeedback>
        <Text style={styles.textnew}>New Post</Text>
        <View>
          <Text style={styles.share}>Share</Text>
        </View>
      </View>
    </>
  );
};

const NewPostShare = ({base64Image}) => {
  return (
    <>
      <TopBar />
      <View style={styles.captionContainer}>
        {/* Put selected image here */}
        <Image
          source={{
            uri: base64Image,
          }}
          style={styles.profilePhoto}
        />

        <TextInput name="caption" placeholder="Write a caption..." multiline />
      </View>
      <Text style={styles.tagPeopleText}>Tag People</Text>
      <Text style={styles.addLocText}>Add Location</Text>
    </>
  );
};
const styles = StyleSheet.create({
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  addpost: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: 2,
  },
  arrowtext: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textnew: {
    marginLeft: 7,
  },
  share: {
    fontWeight: 'bold',
    color: theme.colors.btnColor,
    fontSize: 15,
  },
  tagPeopleText: {
    fontSize: 16,
    padding: 12,
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: 1,
    borderTopColor: theme.colors.grey,
    borderTopWidth: 1,
    width: '100%',
  },
  addLocText: {
    fontSize: 16,
    padding: 12,
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: 1,
    width: '100%',
  },
  profilePhoto: {
    height: 60,
    width: 60,
    marginRight: 10,
  },
});

export default NewPostShare;
