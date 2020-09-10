import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from './Icon';
const TopTab = () => {
  return (
    <View style={styles.topTab}>
      <Icon name="camera-outline" />
      <Image
        source={{
          uri:
            'https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png',
        }}
        style={styles.logo}
      />
      <Icon name="send" component={FeatherIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 30,
    width: '50%',
    resizeMode: 'contain',
  },
  topTab: {
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    elevation: 2,
  },
  text: {},
});

export default TopTab;
