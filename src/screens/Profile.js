import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import Icon from '../components/Icon';
import Octicons from 'react-native-vector-icons/Octicons';
import AppButton from '../components/AppButton';
import {ScrollView} from 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../authContext';
import theme from '../config/theme';
import AntIcons from 'react-native-vector-icons/AntDesign';

const Drawer = createDrawerNavigator();

const TopSection = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.topSection}>
        <View style={styles.usernameWrap}>
          <Text style={styles.username}>rameshsyn </Text>
          <Icon name="chevron-down" />
        </View>
        <View>
          <TouchableWithoutFeedback onPress={navigation.openDrawer}>
            <Icon name="three-bars" component={Octicons} />
          </TouchableWithoutFeedback>
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
    <View style={styles.profileActionContainer}>
      {isLoggedIn ? (
        <AppButton title="Edit Profile" />
      ) : (
        <View style={styles.profileAction}>
          <AppButton title="Follow" color="primary" style={{marginRight: 10}} />
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

const ProfileScreen = () => {
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

const ProfileDrawerContent = (props) => {
  const {user, logOutUser} = useAuth();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}>
      {/* <DrawerItemList {...props} /> */}
      <View style={styles.drawerTopSection}>
        <DrawerItem
          label={user ? user.email : ''}
          style={styles.drawerTopUsername}
          labelStyle={styles.drawerTopUsernameText}
        />
        <DrawerItem
          label="Archive"
          labelStyle={styles.drawerItemText}
          icon={() => <Icon size={30} name="cog-counterclockwise" />}
          onPress={() => console.log('Drawer item clicked')}
        />
        <DrawerItem
          label="Your Activity"
          labelStyle={styles.drawerItemText}
          icon={() => <Icon size={30} name="clock-fast" />}
          onPress={() => console.log('Drawer item clicked')}
        />
        <DrawerItem
          label="QR Code"
          labelStyle={styles.drawerItemText}
          icon={() => <Icon size={30} name="qrcode-scan" />}
          onPress={() => console.log('Drawer item clicked')}
        />
        <DrawerItem
          label="Saved"
          labelStyle={styles.drawerItemText}
          icon={() => <Icon size={30} name="content-save-outline" />}
          onPress={() => console.log('Drawer item clicked')}
        />
        <DrawerItem
          label="Close Friends"
          labelStyle={styles.drawerItemText}
          icon={() => <Icon size={30} name="account-star-outline" />}
          onPress={() => console.log('Drawer item clicked')}
        />
        <DrawerItem
          label="Discover People"
          labelStyle={styles.drawerItemText}
          icon={() => <Icon size={30} name="account-plus-outline" />}
          onPress={() => console.log('Drawer item clicked')}
        />
      </View>
      <DrawerItem
        label="Log Out"
        labelStyle={styles.drawerItemText}
        icon={() => <Icon size={30} name="logout" />}
        onPress={logOutUser}
        style={styles.drawerBottomSection}
      />
    </DrawerContentScrollView>
  );
};
const Profile = () => {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerType="slide"
      initialRouteName="ProfileScreen"
      drawerContent={(props) => <ProfileDrawerContent {...props} />}>
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerItemText: {
    color: theme.colors.black,
    marginLeft: -22,
    fontSize: 17,
  },
  drawerTopSection: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  drawerTopUsername: {
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: 1,
    width: '100%',
  },
  drawerTopUsernameText: {
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  drawerBottomSection: {
    height: 55,
    width: '100%',
    borderTopColor: theme.colors.grey,
    borderTopWidth: 1,
  },
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
  profileActionContainer: {
    paddingHorizontal: 10,
  },

  profileAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingVertical: 20,
  },
  galleryImage: {
    height: 125,
    width: 125,
    margin: 2,
  },
});

export default Profile;
