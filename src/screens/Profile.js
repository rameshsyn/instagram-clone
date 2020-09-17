import React, {useEffect, useState} from 'react';
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
import EditProfile from './EditProfile';
import {readCollectionPostedBy} from '../firebase/auth';

const Drawer = createDrawerNavigator();

const TopSection = ({username}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.topSection}>
        <View style={styles.usernameWrap}>
          <Text style={styles.username}>{username}</Text>
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

const ProfileImageSection = ({photoUrl, postCount, followers, following}) => {
  return (
    <View style={styles.profileImageSection}>
      <View>
        <Image
          source={{
            uri: photoUrl,
          }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.profileStats}>
        <View>
          <Text style={styles.infoValue}>{postCount}</Text>
          <Text>Posts</Text>
        </View>
        <View>
          <Text style={styles.infoValue}>{followers.length}</Text>
          <Text>Followers</Text>
        </View>
        <View>
          <Text style={styles.infoValue}>{following.length}</Text>
          <Text>Following</Text>
        </View>
      </View>
    </View>
  );
};

const ProfileDetails = ({fullName, bio, website}) => {
  return (
    <View style={styles.profileDetails}>
      <Text style={styles.fullName}>{fullName}</Text>
      <Text>{bio}</Text>
      <Text onPress={() => Linking.openURL({website})}>{website}</Text>
    </View>
  );
};

const ProfileAction = ({isOwnProfile}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => {
    setModalVisible((visible) => !visible);
  };

  return (
    <View style={styles.profileActionContainer}>
      {isOwnProfile ? (
        <>
          <AppButton title="Edit Profile" onPress={handleModalToggle} />
          <EditProfile
            modalVisible={modalVisible}
            onModalToggle={handleModalToggle}
          />
        </>
      ) : (
        <View style={styles.profileAction}>
          <AppButton title="Follow" color="primary" style={{marginRight: 10}} />
          <AppButton title="Message" />
        </View>
      )}
    </View>
  );
};

const Gallery = ({posts}) => {
  return (
    <View style={styles.gallery}>
      {posts.map((post, i) => (
        <Image
          key={i}
          source={{uri: post.imageUrl}}
          style={styles.galleryImage}
        />
      ))}
    </View>
  );
};

const ProfileScreen = ({route}) => {
  const viewUser = route.params?.user;
  const {isLoggedIn, user: loggedUser} = useAuth();
  const user = viewUser ? viewUser : loggedUser;
  const [posts, setPosts] = useState([]);

  const {
    username,
    fullName,
    bio,
    website,
    photoUrl,
    followers,
    following,
    uid,
  } = user;

  useEffect(() => {
    const getPostData = async () => {
      try {
        const postData = await readCollectionPostedBy('Posts', uid);
        const postDocs = postData._docs;
        const posts = postDocs.map((doc) => doc._data);
        setPosts(posts);
      } catch (err) {
        console.log(err);
      }
    };
    getPostData();
  }, [user]);

  const isOwnProfile = isLoggedIn && uid === loggedUser.uid;

  return (
    <ScreenLayout>
      <ScrollView>
        <TopSection username={username} />
        <ProfileImageSection
          photoUrl={photoUrl}
          followers={followers}
          following={following}
          postCount={posts.length}
        />
        <ProfileDetails fullName={fullName} bio={bio} website={website} />
        <ProfileAction isOwnProfile={isOwnProfile} />
        <Gallery posts={posts} />
      </ScrollView>
    </ScreenLayout>
  );
};

const ProfileDrawerContent = (props) => {
  const {user, logOutUser} = useAuth();
  const username = user ? user.username : '';

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}>
      {/* <DrawerItemList {...props} /> */}
      <View style={styles.drawerTopSection}>
        <DrawerItem
          label={username}
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

const Profile = ({}) => {
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
    fontSize: 18,
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
