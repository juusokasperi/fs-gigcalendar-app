import { ContentDiv } from './styled';
import { LoginFormValues } from '../../types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import loginService from '../../services/login';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

const initialValues: LoginFormValues = {
  username: '',
  password: ''
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState('password');
  const userContext = useContext(UserContext);
  if (!userContext)
		throw new Error('UserContext not found.');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, userDispatch] = userContext;

  const handleLogin = async ({ username, password }: {username: string, password: string}) => {
    try {
      const loggedUser = await loginService.login({ username, password });
      userDispatch({ type: 'LOGIN', payload: loggedUser });
      console.log('logged user:', loggedUser);
      navigate('/');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (exception) {
      console.log('invalid username or pass');
    };
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        handleLogin(values);
        actions.setSubmitting(false);
      }}
    >
      <Form>
        <p><Field id='username' name='username' placeholder='Username' /></p>
        <p>
          <Field type={showPassword} id='password' name='password' placeholder='Password' />
          {showPassword === 'password' &&
            <FaRegEye onClick={() => setShowPassword('text')} />
          }
          {showPassword === 'text' &&
            <FaRegEyeSlash onClick={() => setShowPassword('password')} />
          }
        </p>
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
};

const Login = () => {
  return (
    <ContentDiv>
      <h1>Login page</h1>
      <LoginForm />
    </ContentDiv>
  );
};

export default Login;
