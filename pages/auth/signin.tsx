import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { Box, Button, InputLabel, InputAdornment, IconButton, Typography  } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import usersReducers from '@/redux/Reducers/Users/usersReducer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from '../../styles/FormSignIn.module.css';
import LayoutSignIn from '@/components/Layout/LayoutSignIn';
import { doLogin } from '@/redux/Actions/Users/reduceActions';

export default function SignIn() {
  
  // use Router
  const router = useRouter();
  
  // define useState API POST users
  const [DataUser, setDataUser] = useState({
    userEmail: null,
    userPassword: null,
  });
  
  // useDispatch
  const dispatch = useDispatch();
  
  // function handler API POST users
  const eventHandlerAdd = (data:any) => (event:any) => {
    setDataUser({ ...DataUser, [data]: event.target.value });
  }
  
  // Mengambil state usersReducers dari store redux
  const isLogin = useSelector((state: any) => state.usersReducers.users);

  // function handle submit form add new users (API POST users)
  const handleFormSubmit = (values: any, { setSubmitting }: any) => {
    dispatch(doLogin(values));
    
    // Memeriksa apakah user sudah login
    if (isLogin.message == 'Login successfully') {
      localStorage.setItem('token', isLogin.token);
      localStorage.setItem('roleId', isLogin.userdata[0].usro_role_id);
      localStorage.setItem('userId', isLogin.userdata[0].user_id);
      localStorage.setItem('userPhoto', isLogin.userdata[0].uspro_photo);
      localStorage.setItem('userFullName', isLogin.userdata[0].user_full_name);
      if (isLogin.userdata[0].usro_role_id == 1) {        // Guest
        router.push('/');
      } else if (isLogin.userdata[0].usro_role_id == 2) { // Manager
        router.push('/manager');
      } else if (isLogin.userdata[0].usro_role_id == 3) { // Office Boy
        router.push('/ob');
      } else if (isLogin.userdata[0].usro_role_id == 4) { // Admin
        router.push('/admin');
      } else if (isLogin.userdata[0].usro_role_id == 5) { // User
        router.push('/users');
      }
    }
  };

  // getHelper for display in form
  const getHelperText = (touched:any, errors:any, field:any) => {
    if (field == "email") {
      return (touched && errors ? errors : "enter your email");
    } else if(field == "password") {
      return (touched && errors ? errors : "enter your password");
    }  
  }

  // check all validasi required & etc
  const checkoutSchema:any = yup.object().shape({
    userEmail: yup.string().email("invalid email").required("required"),
    userPassword: yup.string().required("required")
  });

  // function initialValue field from table users
  const initialValues: any = {
    userEmail: "",
    userPassword: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handletoRegister = () => {
    router.push('/auth/signup');
  };

  return (
    <Box>
      <Head>
        <title>Sign In</title>
      </Head>
      <LayoutSignIn>
        <section className='w-3/4 mx-auto my-auto flex flex-col gap-3' >
            <Typography className={styles.textTitleInFormLogin}>
              Sign In to your account
            </Typography>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="8px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >
                  <TextField
                    size="small"
                    fullWidth
                    className="border border-gray-700"
                    variant="filled"
                    type="email"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={(event) => {eventHandlerAdd('userEmail')(event); handleChange(event)}}
                    value={values.userEmail}
                    name="userEmail"
                    error={!!touched.userEmail && !!errors.userEmail}
                    helperText={getHelperText(touched.userEmail, errors.userEmail, "email")}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    className="border border-gray-700"
                    variant="filled"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    label="Password"
                    onBlur={handleBlur}
                    onChange={(event) => { eventHandlerAdd('userPassword')(event); handleChange(event) }}
                    value={values.userPassword}
                    name="userPassword"
                    error={!!touched.userPassword && !!errors.userPassword}
                    helperText={getHelperText(touched.userPassword, errors.userPassword, "password")}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Button
                      type="submit"
                      color="warning"
                      className="rounded-md bg-gray-700 text-white hover:bg-gray-400 hover:text-gray-700 border-warning-500 first-line:bg-opacity-20 px-4 text-sm normal-case font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      sx={{ gridColumn: "span 4" }}
                    >
                      <LoginIcon width={5} height={5} /><span className='text-transparent'>-</span>{"Sign In"}
                  </Button>
                  <InputLabel
                    className='text-center text-gray-700 normal-case font-normal'
                    sx={{ gridColumn: "span 4" }}
                  >
                    don't have an account yet?<Button
                      className="bg-transparent text-blue-400 hover:text-blue-500 normal-case font-normal hover:bg-transparent"
                      onClick={handletoRegister}>
                      <b>Sign Up</b>
                    </Button>
                  </InputLabel>
                </Box>
              </Form>
            )}
          </Formik>
        </section>
      </LayoutSignIn>
    </Box>
  );
}