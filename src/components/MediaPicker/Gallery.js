import React, {useState, useEffect} from 'react';
import {
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

// TODO: Fetch next photos when scroll ends.

const Gallery = ({setImageNewPost, onImageSelect}) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const handleImageSelect = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  useEffect(() => {
    onImageSelect(selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    let isUnmounted = false;
    const getPhotos = async () => {
      try {
        const hasPermission = await hasAndroidPermission();
        if (hasPermission) {
          const response = await CameraRoll.getPhotos({first: 20});
          const images = response.edges.map((edge) => {
            return edge.node?.image?.uri;
          });

          if (!isUnmounted) {
            setImages(images);
            setSelectedImage(images[0]);
            onImageSelect(images[0]);
            setSelectedIndex(0);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    getPhotos();

    return () => {
      isUnmounted = true;
    };
  }, []);

  return (
    <View>
      <ScrollView>
        <View>
          {selectedImage && (
            <Image
              source={{uri: selectedImage}}
              style={styles.selectedImageLarge}
            />
          )}
        </View>
        <View style={styles.galleryGrid}>
          {images.map((img, i) => (
            <TouchableOpacity key={i} onPress={() => handleImageSelect(img, i)}>
              <Image
                source={{uri: img}}
                style={[
                  styles.galleryImage,
                  i === selectedIndex ? styles.selectedImage : {},
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  galleryGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  selectedImageLarge: {
    height: 300,
    width: '100%',
    marginBottom: 3,
  },
  galleryImage: {
    height: 90,
    width: 96,
    margin: 1,
  },
  selectedImage: {
    opacity: 0.4,
  },
});

export default Gallery;
