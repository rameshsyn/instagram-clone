import React, {useState} from 'react';
import {
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

const Photo = (props) => {
  return <Camera {...props} />;
};

const Video = () => {
  return <Camera />;
};

const MediaPicker = ({onNextPress, onClose, setImageNewPost}) => {
  const [activeTab, setActiveTab] = useState(Tab.GALLERY);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
  };
  const capitalize = (str) => str && str.charAt(0).toUpperCase() + str.slice(1);

  const handleNext = () => {
    onNextPress(selectedImage);
  };

  return (
    <>
      <View style={styles.modalTop}>
        <View style={styles.modalTopLabel}>
          <TouchableHighlight onPress={onClose}>
            <Icon name="close" size={20} />
          </TouchableHighlight>
          <Text style={styles.modalTopLabelText}>{capitalize(activeTab)}</Text>
        </View>
        <TouchableHighlight onPress={handleNext}>
          <Text style={styles.modalTopNext}>Next</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.featureContainer}>
        {activeTab === Tab.GALLERY && (
          <Gallery
            setImageNewPost={setImageNewPost}
            onImageSelect={setSelectedImage}
          />
        )}
        {activeTab === Tab.PHOTO && <Photo onImageSelect={setSelectedImage} />}
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
    </>
  );
};

MediaPicker.defaultProps = {
  onNextPress: () => {},
  onClose: () => {},
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
    paddingLeft: 8,
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalTopNext: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.colors.btnColor,
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

export default MediaPicker;
