import React from 'react';
import { TextInput, View, StyleSheet, Pressable, Text } from 'react-native';
import { useFormik } from 'formik';
import theme from './theme';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundMain,
    },
    formContainer: {
        padding: 10,        
        backgroundColor: theme.colors.whiteText,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderRadius: 5,
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      color: theme.colors.textSecondary
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.colors.whiteText,
      fontWeight: 'bold',
    },
});  

const initialValues = {
  username: '',
  password: '',
};

const onSubmit = (values) => {
  console.log(values);
};

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
        <View style={styles.formContainer}>
            <TextInput
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                secureTextEntry // obscure the password
                style={styles.input}
            />
            <Pressable onPress={formik.handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
