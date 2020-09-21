import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import AppButton from '../AppButton';
import {RNCamera} from 'react-native-camera';

const Camera = ({onImageSelect}) => {
  const camera = useRef();
  const [image, setImage] = useState(null);

  const handlePress = async () => {
    if (camera.current) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.current.takePictureAsync(options);
      setImage(data.uri);
      onImageSelect(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <RNCamera
          ref={camera}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          ratio="4:5"
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
      </View>
      <View style={styles.bottomSection}>
        {image && <Image source={{uri: image}} style={styles.previewImage} />}
        <AppButton style={{flex: 0}} title="Take " onPress={handlePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  preview: {
    flex: 1,
  },
  topSection: {
    flex: 1,
  },
  previewImage: {
    height: 125,
    width: 100,
    resizeMode: 'cover',
    marginVertical: 15,
    alignSelf: 'center',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Camera;
