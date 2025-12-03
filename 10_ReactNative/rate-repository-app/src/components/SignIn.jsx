import { Text, TextInput, StyleSheet, Pressable, View } from 'react-native';
import { useFormik } from 'formik';


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0366d6',
    color: 'white',
    padding: 4,
    width: 100,
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1, 
    marginRight: 10,
    width: 200,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const SignIn = ({onSubmit}) => {
  const formik = useFormik({
    initialValues,
    onSubmit: onSubmit || ((values) => console.log(values)),
  });

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const onSubmit = (values) => {
  console.log(values);
};

export default SignIn;