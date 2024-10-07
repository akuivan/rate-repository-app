import React from 'react';
import { TextInput, View, StyleSheet, Pressable, Text } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
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
        marginBottom: 5,
        paddingHorizontal: 10,
        color: theme.colors.textSecondary,
    },
    inputError: {
        borderColor: theme.colors.error, // Error border color
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
    errorText: {
        color: theme.colors.error,
        marginBottom: 10,
    },
});

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()      
        .required('Password is required'),
});

const onSubmit = (values) => {
    console.log(values);
};

const SignIn = () => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder="Username"
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                    style={[styles.input, formik.touched.username && formik.errors.username ? styles.inputError : null]}
                />
                {formik.touched.username && formik.errors.username && (
                    <Text style={styles.errorText}>{formik.errors.username}</Text>
                )}
                <TextInput
                    placeholder="Password"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    secureTextEntry // obscure password
                    style={[styles.input, formik.touched.password && formik.errors.password ? styles.inputError : null]}
                />
                {formik.touched.password && formik.errors.password && (
                    <Text style={styles.errorText}>{formik.errors.password}</Text>
                )}
                <Pressable onPress={formik.handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SignIn;
