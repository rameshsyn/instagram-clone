import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import AppTextInput from '../components/AppTextInput';
import Icon from '../components/Icon';
import theme from '../config/theme';
import AppFormField from '../components/AppFormField';

const EditProfile = () => {
  return (
    <>
      <View style={styles.topBar}>
        <View style={styles.topBarLabel}>
          <TouchableHighlight>
            <Icon name="close" size={20} />
          </TouchableHighlight>
          <Text style={styles.topBarLabelText}>Edit Profile</Text>
        </View>
        <TouchableHighlight>
          <Icon name="check" style={styles.topBarTick} />
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.editProfileContainer}>
        <TouchableWithoutFeedback
          onPress={() => console.log('Change profile photo clicked')}>
          <View>
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
        <Formik
          onSubmit={(values) => console.log(values)}
          initialValues={{
            name: '',
            username: '',
            website: '',
            bio: '',
            email: '',
            phone: ' ',
            gender: '',
          }}>
          {() => (
            <View style={styles.formContainer}>
              <AppFormField label="Name" name="name" value="Ramesh Syangtan" />
              <AppFormField
                label="Username"
                name="username"
                value="rameshsyn"
              />
              <AppFormField
                label="Website"
                name="website"
                value="rameshsyn.codes"
              />
              <AppFormField
                label="Bio"
                name="bio"
                value="A Developer || Traveller...A Developer || Traveller...A Developer || Traveller...A Developer || Traveller...A Developer || Traveller..."
              />
              <Text style={styles.profileInfoText}>Profile Information</Text>
              <AppFormField
                label="E-mail Address"
                name="email"
                value="rameshsyn@gmail.com"
              />
              <AppFormField
                label="Phone Number"
                name="phone"
                value="1234567890"
              />
              <AppFormField label="Gender" name="gender" value="Male" />
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
