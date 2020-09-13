import React from 'react';
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
import {updateData} from '../firebase/auth';

const EditProfile = ({modalVisible, onModalToggle}) => {
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
  const handleEditProfile = async (data) => {
    try {
      await updateData('Users', uid, data);
      onModalToggle();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Modal visible={modalVisible}>
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
                  <TouchableHighlight onPress={onModalToggle}>
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
                <TouchableWithoutFeedback
                  onPress={() => console.log('Change profile photo clicked')}>
                  <View style={styles.changeProfilePhotoContainer}>
                    <Image
                      source={{
                        uri:
                          'https://instagram.fktm8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/53613934_278745363050360_1949360354278506496_n.jpg?_nc_ht=instagram.fktm8-1.fna.fbcdn.net&_nc_ohc=w1Bi5HcR0lQAX_Xp5UF&oh=0f1e91f68a22438d0e33d0244bb5cbb2&oe=5F835D91',
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
                  <Text style={styles.profileInfoText}>
                    Profile Information
                  </Text>
                  <AppFormField label="E-mail Address" name="email" />
                  <AppFormField
                    label="Phone Number"
                    name="phone"
                    keyboardType="numeric"
                  />
                  <AppFormField label="Gender" name="gender" />
                </View>
              </ScrollView>
            </>
          )}
        </Formik>
      </Modal>
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
