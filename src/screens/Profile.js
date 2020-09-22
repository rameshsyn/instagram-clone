import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import Icon from '../components/Icon';
import Octicons from 'react-native-vector-icons/Octicons';
import AppButton from '../components/AppButton';
import {ScrollView} from 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../authContext';
import theme from '../config/theme';
import EditProfile from './EditProfile';
import {
  followUserById,
  subscribeCollectionDocChange,
  unfollowUserById,
  getPostsByUid,
} from '../firebase/auth';
import FollowingScreen from './Following';
import FollowersScreen from './Followers';
import PostsScreen from './PostsScreen';

const Drawer = createDrawerNavigator();
const ProfileStack = createStackNavigator();

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

const ProfileImageSection = ({
  photoUrl,
  postCount,
  followers,
  viewFollowers,
  following,
  viewFollowing,
  viewPosts,
}) => {
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
        <TouchableHighlight onPress={viewPosts}>
          <>
            <Text style={styles.infoValue}>{postCount}</Text>
            <Text>Posts</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight onPress={viewFollowers}>
          <>
            <Text style={styles.infoValue}>{followers.length}</Text>
            <Text>Followers</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight onPress={viewFollowing}>
          <>
            <Text style={styles.infoValue}>{following.length}</Text>
            <Text>Following</Text>
          </>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const ProfileInfoDetails = ({fullName, bio, website}) => {
  return (
    <View style={styles.profileDetails}>
      <Text style={styles.fullName}>{fullName}</Text>
      <Text>{bio}</Text>
      <Text onPress={() => Linking.openURL({website})}>{website}</Text>
    </View>
  );
};

const ProfileAction = ({isOwnProfile, viewUserId, isFollowing}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {user} = useAuth();

  const handleModalToggle = () => {
    setModalVisible((visible) => !visible);
  };

  const handleFollow = async () => {
    try {
      isFollowing
        ? await unfollowUserById(user.uid, viewUserId)
        : await followUserById(user.uid, viewUserId);
    } catch (err) {
      console.error(err);
    }
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
          <AppButton
            title={isFollowing ? 'Following' : 'Follow'}
            color={isFollowing ? 'default' : 'primary'}
            style={{marginRight: 10}}
            onPress={handleFollow}
          />
          <AppButton title="Message" />
        </View>
      )}
    </View>
  );
};

const UserPostsGrid = ({posts, userId}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.gallery}>
      {posts.map((post, i) => (
        <TouchableHighlight
          key={post.pid}
          underlayColor={theme.colors.grey}
          onPress={() =>
            navigation.navigate('PostsScreen', {
              postId: post.pid,
              userId,
            })
          }>
          <Image source={{uri: post.imageUrl}} style={styles.galleryImage} />
        </TouchableHighlight>
      ))}
    </View>
  );
};

const ProfileDetails = ({route}) => {
  const viewUser = route.params?.user;
  const {isLoggedIn, user: loggedUser} = useAuth();
  const user = viewUser ? viewUser : loggedUser;
  const [posts, setPosts] = useState([]);
  console.log('Viewuser 🖤🖤', viewUser, 'User 💘💘💘', user);
  const navigation = useNavigation();

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
        const posts = await getPostsByUid(uid);
        setPosts(posts);
      } catch (err) {
        console.log(err);
      }
    };
    getPostData();
  }, [user]);

  const viewFollowing = () => {
    navigation.navigate('FollowingScreen', {userId: user.uid});
  };
  const viewFollowers = () => {
    navigation.navigate('FollowersScreen', {userId: user.uid});
  };

  const viewPosts = () => {
    navigation.navigate('PostsScreen', {
      userId: user.uid,
    });
  };
  const isOwnProfile = isLoggedIn && uid === loggedUser.uid;
  const isFollowing = loggedUser.following.includes(viewUser?.uid);

  return (
    <ScrollView>
      <TopSection username={username} />
      <ProfileImageSection
        photoUrl={photoUrl}
        followers={followers}
        following={following}
        postCount={posts.length}
        viewFollowing={viewFollowing}
        viewFollowers={viewFollowers}
        viewPosts={viewPosts}
      />
      <ProfileInfoDetails fullName={fullName} bio={bio} website={website} />
      <ProfileAction
        isOwnProfile={isOwnProfile}
        viewUserId={uid}
        isFollowing={isFollowing}
      />
      <UserPostsGrid posts={posts} userId={uid} />
    </ScrollView>
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

const ProfileDrawer = () => (
  <Drawer.Navigator
    drawerPosition="right"
    drawerType="slide"
    initialRouteName="ProfileDetails"
    drawerContent={(props) => <ProfileDrawerContent {...props} />}>
    <Drawer.Screen name="ProfileDetails" component={ProfileDetails} />
  </Drawer.Navigator>
);

const Profile = ({route}) => {
  const viewUser = route.params.params.user;
  // console.log('Viewuser from profile', route.params.user);
  const {user, setUser} = useAuth();

  const updateUserData = (userData) => {
    setUser(userData);
  };
  useEffect(() => {
    const subscriber = subscribeCollectionDocChange(
      'Users',
      viewUser.uid,
      updateUserData,
    );
    return subscriber;
  }, [viewUser]);

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileDrawer"
        options={{headerShown: false}}
        component={ProfileDrawer}
      />
      <ProfileStack.Screen name="PostsScreen" component={PostsScreen} />
      <ProfileStack.Screen name="FollowingScreen" component={FollowingScreen} />
      <ProfileStack.Screen name="FollowersScreen" component={FollowersScreen} />
    </ProfileStack.Navigator>
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
    flexWrap: 'wrap',
    paddingVertical: 20,
  },
  galleryImage: {
    height: 125,
    width: 125,
    marginLeft: 5,
    marginBottom: 5,
  },
});

export default Profile;
