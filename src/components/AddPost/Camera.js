import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import AppButton from '../AppButton';
import {RNCamera} from 'react-native-camera';

const Camera = () => {
  const camera = useRef();

  const handlePress = () => {
    console.log('press');
    // takePicture = async () => {
    //   if (this.camera) {
    //     const options = { quality: 0.5, base64: true };
    //     const data = await this.camera.takePictureAsync(options);
    //     console.log(data.uri);
    //   }
    // };
  };
  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
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
      <View>
        <AppButton title="Take pic" onPress={handlePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    height: '100%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
export default Camera;
