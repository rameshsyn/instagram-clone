import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import {Formik} from 'formik';
import Icon from '../components/Icon';
import theme from '../config/theme';
import AppFormField from '../components/AppFormField';
import {useAuth} from '../authContext';
import {Picker} from '@react-native-community/picker';
import {useNavigation} from '@react-navigation/native';
import {updateUser} from '../firebase/auth';

const EditProfile = ({route}) => {
  const navigation = useNavigation();
  const profileImageUrl = route?.params?.imageFilePath;

  const [personGender, setPersonGender] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const {user} = useAuth();
  const {
    uid,
    bio,
    email,
    fullName,
    gender,
    phone,
    photoUrl,
    username,
    website,
  } = user;

  useEffect(() => {
    if (profileImageUrl) {
      setProfilePicUrl(profileImageUrl);
    }
  }, [profileImageUrl]);

  const editProfilePic = () => {
    navigation.navigate('AddPost', {editProfilePic: true});
  };

  const handleEditProfile = async (data) => {
    const tempData = {...data};
    tempData.gender = personGender;
    if (profilePicUrl !== '') tempData.photoUrl = profilePicUrl;

    try {
      await updateUser(tempData, user);
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleEditProfile}
        initialValues={{
          fullName,
          username,
          website,
          bio,
          email,
          phone,
          gender,
        }}>
        {({handleSubmit}) => (
          <>
            <View style={styles.topBar}>
              <View style={styles.topBarLabel}>
                <TouchableHighlight onPress={() => navigation.goBack()}>
                  <Icon name="close" size={20} />
                </TouchableHighlight>
                <Text style={styles.topBarLabelText}>Edit Profile</Text>
              </View>
              <TouchableHighlight
                onPress={handleSubmit}
                underlayColor={theme.colors.white}>
                <Icon name="check" style={styles.topBarTick} />
              </TouchableHighlight>
            </View>
            <ScrollView style={styles.editProfileContainer}>
              <TouchableWithoutFeedback onPress={() => editProfilePic()}>
                <View style={styles.changeProfilePhotoContainer}>
                  <Image
                    source={{
                      uri: profilePicUrl || photoUrl,
                    }}
                    style={styles.profileImage}
                  />
                  <Text style={styles.changeProfilePhotoText}>
                    Change Profile Photo
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.formContainer}>
                <AppFormField label="Name" name="fullName" />
                <AppFormField label="Username" name="username" />
                <AppFormField label="Website" name="website" />
                <AppFormField label="Bio" name="bio" />
                <Text style={styles.profileInfoText}>Profile Information</Text>
                <AppFormField label="E-mail Address" name="email" />
                <AppFormField
                  label="Phone Number"
                  name="phone"
                  keyboardType="numeric"
                />
                <AppFormField label="Gender" name="gender" hideAppTextInput />
                <Picker
                  selectedValue={personGender}
                  mode="dropdown"
                  style={styles.genderDropdown}
                  onValueChange={(itemValue, itemIndex) =>
                    setPersonGender(itemValue)
                  }>
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  changeProfilePhotoContainer: {},

  changeProfilePhotoText: {
    alignSelf: 'center',
    color: theme.colors.btnColor,
    fontSize: 20,
    marginVertical: 10,
  },
  editProfileContainer: {
    backgroundColor: theme.colors.white,
  },
  formContainer: {
    paddingHorizontal: 10,
  },
  genderDropdown: {height: 50, width: '100%'},
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 60,
  },
  profileInfoText: {
    fontSize: 18,
    marginTop: 25,
    marginBottom: 10,
  },
  topBar: {
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
  topBarLabel: {
    flexDirection: 'row',
    width: '35%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBarLabelText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  topBarTick: {
    color: theme.colors.btnColor,
  },
});

export default EditProfile;
