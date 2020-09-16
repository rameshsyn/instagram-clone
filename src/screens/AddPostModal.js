import React, {useState} from 'react';
import {Modal} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import NewPostShare from './NewPostShare';
import MediaBrowser from './MediaBrowser';
import {useNavigation} from '@react-navigation/native';
import {TouchableHighlight} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const AddPostModal = ({triggerComponent}) => {
  const navigation = useNavigation();
  const [base64Image, setBase64Image] = useState('');

  const setImageNewPost = (image) => {
    setBase64Image(image);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const handleClose = () => {
    setModalVisible(false);
  };

  const handleNext = () => {
    navigation.navigate('NewPostShare');
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const MediaBrowserScreen = (props) => (
    <MediaBrowser
      {...props}
      setImageNewPost={setImageNewPost}
      onClose={handleClose}
      onNextPress={handleNext}
    />
  );
  const NewPostShareScreen = (props) => (
    <NewPostShare {...props} base64Image={base64Image} onClose={handleClose} />
  );

  return (
    <>
      <Modal visible={modalVisible}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="MediaBrowser" component={MediaBrowserScreen} />
          <Stack.Screen name="NewPostShare" component={NewPostShareScreen} />
        </Stack.Navigator>
      </Modal>
      <TouchableHighlight onPress={handleModalOpen}>
        {triggerComponent}
      </TouchableHighlight>
    </>
  );
};

export default AddPostModal;
