import React, {useEffect, useState} from 'react';
import {
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView,
} from 'react-native';
import theme from '../config/theme';
import Icon from '../components/Icon';
import CameraRoll from '@react-native-community/cameraroll';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const getPhotos = async () => {
    try {
      const hasPermission = await hasAndroidPermission();
      if (hasPermission) {
        const response = await CameraRoll.getPhotos({first: 20});
        const images = response.edges.map((edge) => {
          return edge.node?.image?.uri;
        });
        setImages(images);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <View>
      <ScrollView>
        <View>
          {images[0] && (
            <Image
              source={{uri: images[0]}}
              style={{height: 300, width: '100%'}}
            />
          )}
        </View>
        <View>
          {images.map((img, i) => (
            <Image
              key={i}
              source={{uri: img}}
              style={{height: 200, width: 200}}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const AddMediaModal = ({triggerComponent}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const handleModalToggle = () => {
    setModalVisible((visible) => !visible);
  };
  return (
    <>
      <Modal visible={modalVisible}>
        <View style={styles.modalTop}>
          <TouchableHighlight onPress={handleModalToggle}>
            <Icon name="close" />
          </TouchableHighlight>
          <TouchableHighlight>
            <Text>Next</Text>
          </TouchableHighlight>
        </View>

        <Gallery />
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <Text>GALLERY</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Text>PHOTO</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Text>VIDEO</Text>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      <TouchableHighlight onPress={handleModalToggle}>
        {triggerComponent}
      </TouchableHighlight>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: theme.colors.white,
  },
  modalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default AddMediaModal;
