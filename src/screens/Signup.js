import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from '../components/Icon';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import theme from '../config/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useAuth} from '../authContext';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  username: Yup.string().min(4).max(15).required().label('Username'),
  password: Yup.string().min(8).required().label('Password'),
});

const Signup = ({navigation}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const {createUser} = useAuth();

  const handleSignup = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const {email, password} = data;
    try {
      const res = await createUser(email, password);
      console.log(res);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setSubmitError('That email address is already in use!');
      } else {
        setSubmitError('Something went wrong!');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.signupContainer}>
      <Formik
        onSubmit={handleSignup}
        initialValues={{
          email: '',
          password: '',
          username: '',
        }}
        validationSchema={SignupSchema}>
        {({handleSubmit}) => (
          <View style={styles.topSection}>
            <Icon
              name="user"
              component={EvilIcons}
              style={styles.userIcon}
              size={250}
              color={theme.colors.charcoal}
            />
            <AppTextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              name="email"
              editable={!isSubmitting}
            />
            <AppTextInput
              style={styles.input}
              placeholder="Username"
              name="username"
              editable={!isSubmitting}
            />
            <AppTextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
              name="password"
              editable={!isSubmitting}
            />

            {submitError && !isSubmitting && (
              <Text style={styles.submitError}>{submitError}</Text>
            )}
            <AppButton
              disabled={isSubmitting}
              title={isSubmitting ? 'Signing up...' : 'Sign up'}
              color="primary"
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>

      <View style={styles.bottomSection}>
        <Text>
          Already have an account ?{' '}
          <Text
            style={styles.forgotText}
            onPress={() => navigation.navigate('Login')}>
            Log in.
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    paddingHorizontal: 20,
  },
  input: {
    borderColor: theme.colors.grey,
    borderWidth: 2,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  bottomSection: {
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    width: '100%',
    padding: 15,
    alignItems: 'center',
  },
  forgotSection: {
    padding: 10,
    alignSelf: 'center',
  },
  forgotText: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  userIcon: {
    alignSelf: 'center',
    marginVertical: 30,
  },
  submitError: {
    color: theme.colors.danger,
    paddingVertical: 10,
    marginBottom: 5,
    fontSize: 16,
  },
});

export default Signup;
