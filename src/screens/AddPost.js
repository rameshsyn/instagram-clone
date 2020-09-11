import React, {useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import ImagePicker from 'react-native-image-picker';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */

const AddPost = () => {
  const [avatar, setAvatar] = useState(null);
  const handleAdd = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setAvatar(source);
      }
    });
  };
  return (
    <ScreenLayout>
      <View>
        <Text>This is AddPost screens.</Text>
        <Button title="Add" onPress={handleAdd} />
        {avatar && <Image source={avatar} style={{height: 100, width: 100}} />}
      </View>
    </ScreenLayout>
  );
};
export default AddPost;
