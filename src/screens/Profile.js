import React from 'react';
import {Image, Linking, StyleSheet, View, Text} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import Icon from '../components/Icon';
import Octicons from 'react-native-vector-icons/Octicons';
import AppButton from '../components/AppButton';
import {ScrollView} from 'react-native-gesture-handler';

const TopSection = () => {
  return (
    <>
      <View style={styles.topSection}>
        <View style={styles.usernameWrap}>
          <Text style={styles.username}>rameshsyn </Text>
          <Icon name="chevron-down" />
        </View>
        <View>
          <Icon name="three-bars" component={Octicons} />
        </View>
      </View>
    </>
  );
};

const ProfileImageSection = () => {
  return (
    <View style={styles.profileImageSection}>
      <Image
        source={{
          uri:
            'https://instagram.fktm8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/53613934_278745363050360_1949360354278506496_n.jpg?_nc_ht=instagram.fktm8-1.fna.fbcdn.net&_nc_ohc=w1Bi5HcR0lQAX_Xp5UF&oh=0f1e91f68a22438d0e33d0244bb5cbb2&oe=5F835D91',
        }}
        style={styles.profileImage}
      />
      <View style={styles.profileStats}>
        <View>
          <Text style={styles.infoValue}>17</Text>
          <Text>Posts</Text>
        </View>
        <View>
          <Text style={styles.infoValue}>242</Text>
          <Text>Followers</Text>
        </View>
        <View>
          <Text style={styles.infoValue}>223</Text>
          <Text>Following</Text>
        </View>
      </View>
    </View>
  );
};

const ProfileDetails = () => {
  return (
    <View style={styles.profileDetails}>
      <Text style={styles.fullName}>Ramesh Syangtan </Text>
      <Text>Developer | Traveler </Text>
      <Text onPress={() => Linking.openURL('http://rameshsyn.codes')}>
        rameshsyn.codes
      </Text>
    </View>
  );
};

const ProfileAction = ({isLoggedIn}) => {
  return (
    <View>
      {isLoggedIn ? (
        <AppButton title="Edit Profile" />
      ) : (
        <View style={styles.profileAction}>
          <AppButton title="Follow" style={{marginRight: 10}} />
          <AppButton title="Message" />
        </View>
      )}
    </View>
  );
};

const Gallery = ({images}) => {
  return (
    <View style={styles.gallery}>
      {images.map((item, i) => (
        <Image key={i} source={{uri: item.image}} style={styles.galleryImage} />
      ))}
    </View>
  );
};

const images = [
  {
    image:
      'https://instagram.fktm8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/53613934_278745363050360_1949360354278506496_n.jpg?_nc_ht=instagram.fktm8-1.fna.fbcdn.net&_nc_ohc=w1Bi5HcR0lQAX_Xp5UF&oh=0f1e91f68a22438d0e33d0244bb5cbb2&oe=5F835D91',
  },
  {
    image:
      'https://instagram.fktm8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/104178885_549712812376841_4953640171997264339_n.jpg?_nc_ht=instagram.fktm8-1.fna.fbcdn.net&_nc_ohc=YQtDrY325UEAX_QGjYx&oh=72f9fd7b82de9f48ea265f37da065b4d&oe=5F831344',
  },
  {
    image:
      'https://images.unsplash.com/photo-1599577180570-74005925b055?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80',
  },
  {
    image:
      'https://instagram.fktm8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/53613934_278745363050360_1949360354278506496_n.jpg?_nc_ht=instagram.fktm8-1.fna.fbcdn.net&_nc_ohc=w1Bi5HcR0lQAX_Xp5UF&oh=0f1e91f68a22438d0e33d0244bb5cbb2&oe=5F835D91',
  },
];
const Profile = () => {
  return (
    <ScreenLayout>
      <ScrollView>
        <TopSection />
        <ProfileImageSection />
        <ProfileDetails />
        <ProfileAction />
        <Gallery images={images} />
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginRight: 30,
  },
  profileImageSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  topSection: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  usernameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
  },
  profileDetails: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  profileAction: {
    flexDirection: 'row',
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoValue: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gallery: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
  },
  galleryImage: {
    height: 130,
    width: 130,
    margin: 2,
  },
});

export default Profile;
