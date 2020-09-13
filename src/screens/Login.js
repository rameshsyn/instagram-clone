import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppButton from '../components/AppButton';
import theme from '../config/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AppTextInput from '../components/AppTextInput';
import {useAuth} from '../authContext';

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(8).required().label('Password'),
});

const Login = ({navigation}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const {loginUser, setUserState} = useAuth();

  const handleLogin = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const {email, password} = data;
    try {
      const authResponse = await loginUser(email, password);
      await setUserState(authResponse.user);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/wrong-password') {
        setSubmitError('Your password is incorrect!');
      } else if (err.code === 'auth/user-not-found') {
        setSubmitError('User not found!');
      } else {
        setSubmitError('Something went wrong!');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View style={styles.loginContainer}>
      <Formik
        onSubmit={handleLogin}
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}>
        {({handleSubmit}) => (
          <View style={styles.topSection}>
            <Image
              source={{
                uri:
                  'https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png',
              }}
              style={styles.logo}
            />
            <AppTextInput
              style={styles.input}
              placeholder="Email"
              name="email"
            />
            <AppTextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
              name="password"
            />
            {submitError && !isSubmitting && (
              <Text style={styles.submitError}>{submitError}</Text>
            )}
            <AppButton
              title={isSubmitting ? 'Logging in...' : 'Log In'}
              color="primary"
              onPress={handleSubmit}
            />
            <Text style={styles.forgotSection}>
              Forgot your login details?{' '}
              <Text style={styles.forgotText}> Get help logging in.</Text>
            </Text>
            <Text style={styles.orText}>OR</Text>
            <AppButton title="Login with Facebook" color="primary" />
          </View>
        )}
      </Formik>
      <View style={styles.bottomSection}>
        <Text>
          Don't have an account?
          <Text onPress={() => navigation.navigate('Signup')}>Sign up.</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  topSection: {
    paddingHorizontal: 20,
  },
  input: {
    borderColor: theme.colors.grey,
    borderWidth: 2,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  logo: {
    height: 80,
    width: 170,
    marginBottom: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  orText: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  forgotSection: {
    padding: 10,
    alignSelf: 'center',
  },
  forgotText: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  submitError: {
    color: theme.colors.danger,
    paddingVertical: 10,
    marginBottom: 5,
    fontSize: 16,
  },
});

export default Login;
