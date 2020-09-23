import React from 'react';
import MediaPicker from '../components/MediaPicker';

const MediaBrowser = (props) => {
  const handleClose = () => {
    props.navigation.goBack();
  };

  const handleNextPress = (selectedImageFilePath) => {
    if (props.editProfilePic) {
      props.navigation.navigate('EditProfile', {
        imageFilePath: selectedImageFilePath,
      });
    } else {
      props.navigation.navigate('NewPostShare', {
        imageFilePath: selectedImageFilePath,
      });
    }
  };

  return (
    <MediaPicker
      {...props}
      onClose={handleClose}
      onNextPress={handleNextPress}
    />
  );
};

export default MediaBrowser;
