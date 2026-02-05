import { View, StyleSheet, TextInput, Pressable, Text, ScrollView, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/queries';
import { useNavigate } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 4,
    fontSize: 14,
  },
  inputError: {
    borderColor: '#d73a49',
  },
  error: {
    color: '#d73a49',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  multilineInput: {
    textAlignVertical: 'top',
    height: 100,
  },
});

const validationSchema = yup.object().shape({
  ownerUsername: yup
    .string()
    .required('Repository owner username is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .string()
    .required('Rating is required')
    .test('rating-range', 'Rating must be between 0 and 100', function(value) {
      if (!value) return false;
      const num = parseInt(value);
      return !isNaN(num) && num >= 0 && num <= 100;
    }),
  review: yup
    .string()
    .optional(),
});

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('btn pressed');
      console.log('Submitting with values:', values);
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerUsername,
            repositoryName: values.repositoryName,
            rating: parseInt(values.rating),
            text: values.review || '',
          },
        },
      });

      console.log('Response data:', data);
      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (error) {
      console.error('Error creating review:', error);
      Alert.alert('Error', error.message);
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          ownerUsername: '',
          repositoryName: '',
          rating: '',
          review: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View>
            <TextInput
              placeholder="Repository owner's username"
              value={values.ownerUsername}
              onChangeText={handleChange('ownerUsername')}
              onBlur={handleBlur('ownerUsername')}
              style={[
                styles.input,
                touched.ownerUsername && errors.ownerUsername && styles.inputError,
              ]}
            />
            {touched.ownerUsername && errors.ownerUsername && (
              <Text style={styles.error}>{errors.ownerUsername}</Text>
            )}

            <TextInput
              placeholder="Repository's name"
              value={values.repositoryName}
              onChangeText={handleChange('repositoryName')}
              onBlur={handleBlur('repositoryName')}
              style={[
                styles.input,
                touched.repositoryName && errors.repositoryName && styles.inputError,
              ]}
            />
            {touched.repositoryName && errors.repositoryName && (
              <Text style={styles.error}>{errors.repositoryName}</Text>
            )}

            <TextInput
              placeholder="Rating between 0 and 100"
              value={values.rating}
              onChangeText={handleChange('rating')}
              onBlur={handleBlur('rating')}
              keyboardType="numeric"
              style={[
                styles.input,
                touched.rating && errors.rating && styles.inputError,
              ]}
            />
            {touched.rating && errors.rating && (
              <Text style={styles.error}>{errors.rating}</Text>
            )}

            <TextInput
              placeholder="Review (optional)"
              value={values.review}
              onChangeText={handleChange('review')}
              onBlur={handleBlur('review')}
              multiline
              style={[
                styles.input,
                styles.multilineInput,
                touched.review && errors.review && styles.inputError,
              ]}
            />
            {touched.review && errors.review && (
              <Text style={styles.error}>{errors.review}</Text>
            )}

            <Pressable
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default ReviewForm;