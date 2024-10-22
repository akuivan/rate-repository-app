import React from 'react';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import routes from '../utils/routes';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { StyleSheet, View, Alert } from 'react-native';
import { CREATE_USER } from '../graphql/mutations';
import FormikTextInput from './FormikTextInput';
import Button from './Button';
import useSignIn from '../hooks/useSignIn'; 

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username cannot be longer than 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password cannot be longer than 50 characters'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => (
  <View style={styles.container}>
    <View style={styles.fieldContainer}>
      <FormikTextInput name='username' placeholder='Username' />
    </View>
    <View style={styles.fieldContainer}>
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
    </View>
    <View style={styles.fieldContainer}>
      <FormikTextInput
        name='passwordConfirmation'
        placeholder='Password confirmation'
        secureTextEntry
      />
    </View>
    <Button onPress={onSubmit}>Sign up</Button>
  </View>
);

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn(); // Use the sign-in hook to sign the user in

  const onSubmit = async (values) => {
    const { username, password } = values;
  
    try {
      // Wrap username and password in an object
      await createUser({ variables: { user: { username, password } } });
  
      // Sign in the user after successful registration
      await signIn({ username, password });
  
      navigate(routes.home);
      // Navigate to the repository list view
    } catch (error) {
      console.error('Error during mutation:', error);
      Alert.alert('Error', error.message || 'An unknown error occurred');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
