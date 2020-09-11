import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from '../Icon';
import Camera from './Camera';
import Gallery from './Gallery';
import theme from '../../config/theme';

const Tab = {
  GALLERY: 'gallery',
  PHOTO: 'photo',
  VIDEO: 'video',
};

const Photo = () => {
  return <Camera />;
};

const Video = () => {
  return <Camera />;
};
const AddMediaModal = ({triggerComponent}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(Tab.GALLERY);
  const handleModalToggle = () => {
    setModalVisible((visible) => !visible);
  };
  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
  };
  const capitalize = (str) => str && str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <>
      <Modal visible={modalVisible}>
        <View style={styles.modalTop}>
          <View style={styles.modalTopLabel}>
            <TouchableHighlight onPress={handleModalToggle}>
              <Icon name="close" size={20} />
            </TouchableHighlight>
            <Text style={styles.modalTopLabelText}>
              {capitalize(activeTab)}
            </Text>
          </View>
          <TouchableHighlight>
            <Text style={styles.modalTopNext}>Next</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.featureContainer}>
          {activeTab === Tab.GALLERY && <Gallery />}
          {activeTab === Tab.PHOTO && <Photo />}
          {activeTab === Tab.VIDEO && <Video />}
        </View>
        <View style={styles.modalBottom}>
          <TouchableWithoutFeedback
            onPress={() => handleActiveTabChange(Tab.GALLERY)}>
            <Text
              style={[
                styles.tab,
                activeTab === Tab.GALLERY ? styles.activeTab : {},
              ]}>
              GALLERY
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => handleActiveTabChange(Tab.PHOTO)}>
            <Text
              style={[
                styles.tab,
                activeTab === Tab.PHOTO ? styles.activeTab : {},
              ]}>
              PHOTO
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => handleActiveTabChange(Tab.VIDEO)}>
            <Text
              style={[
                styles.tab,
                activeTab === Tab.VIDEO ? styles.activeTab : {},
              ]}>
              VIDEO
            </Text>
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
  modalBottom: {
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
    zIndex: 10,
  },
  modalTop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: theme.colors.white,
    zIndex: 10,
  },
  modalTopLabel: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTopLabelText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalTopNext: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'skyblue',
  },
  featureContainer: {
    // marginTop: 200,
    // marginBottom: 50,
  },
  tab: {
    color: 'gray',
  },
  activeTab: {
    color: theme.colors.charcoal,
    fontWeight: 'bold',
    borderBottomColor: theme.colors.charcoal,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
});

export default AddMediaModal;
