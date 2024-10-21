import React from 'react';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import routes from '../utils/routes';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { StyleSheet, View, Alert } from 'react-native';
import { CREATE_REVIEW } from '../graphql/mutations'; 
import FormikTextInput from './FormikTextInput';
import Button from './Button';

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
  owner: '',
  name: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  owner: yup.string().required('Repository owner name is required'),
  name: yup.string().required('Repository name is required'),
  rating: yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  review: yup.string(),
});

const CreateReviewForm = ({ onSubmit }) => (
  <View style={styles.container}>
    <View style={styles.fieldContainer}>
      <FormikTextInput name="owner" placeholder="Repository owner name" />
    </View>
    <View style={styles.fieldContainer}>
      <FormikTextInput name="name" placeholder="Repository name" />
    </View>
    <View style={styles.fieldContainer}>
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
      />
    <View style={styles.fieldContainer}>
    </View>
      <FormikTextInput
        name="review"
        placeholder="Review"
      />
    </View>
    <Button onPress={onSubmit}>Create a review</Button>
  </View>
);

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW, {
    onCompleted: (data) => {
      const { repositoryId } = data.createReview;
      navigate(routes.singleRepository.replace(':id', repositoryId));
    },
    onError: (error) => {
        console.error('GraphQL error details:', error);
        Alert.alert("Error", error.message || 'An unknown error occurred');
      },
  });

  const onSubmit = async (values) => {
    // Convert rating to a number and structure the input as an object
    const formattedValues = {
      repositoryName: values.name,
      ownerName: values.owner,
      rating: Number(values.rating),
      text: values.review,
    };
  
    console.log('Submitting review with variables:', { review: formattedValues });
  
    try {
      const response = await createReview({ variables: { review: formattedValues } });
      console.log('Review created successfully:', response.data);
    } catch (error) {
      console.error('Error during mutation:', error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
