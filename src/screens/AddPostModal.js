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

  return (
    <>
      <Modal visible={modalVisible}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="MediaBrowser">
            {(props) => (
              <MediaBrowser
                {...props}
                setImageNewPost={setImageNewPost}
                onClose={handleClose}
                onNextPress={handleNext}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="NewPostShare">
            {(props) => (
              <NewPostShare
                {...props}
                base64Image={base64Image}
                onClose={handleClose}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </Modal>
      <TouchableHighlight onPress={handleModalOpen}>
        {triggerComponent}
      </TouchableHighlight>
    </>
  );
};

export default AddPostModal;
