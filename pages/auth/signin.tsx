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
import Cookies from 'js-cookie';
import ToastIndicator from '@/components/Indicator/ToastIndicator';
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  // use Router
  const router = useRouter();
  
  // define useState API POST users
  const [DataUser, setDataUser] = useState({
    userEmailOrPhone: null,
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
      localStorage.setItem('token', isLogin.userdata[0].user_id);
      localStorage.setItem('userId', isLogin.userdata[0].user_id);
      localStorage.setItem('roleId', isLogin.userdata[0].usro_role_id);
      localStorage.setItem('userId', isLogin.userdata[0].user_id);
      localStorage.setItem('userPhoto', isLogin.userdata[0].uspro_photo);
      localStorage.setItem('userFullName', isLogin.userdata[0].user_full_name);
      Cookies.set('userId', isLogin.userdata[0].user_id);
      if (isLogin.userdata[0].usro_role_id == 1) {        // Guest
        ToastIndicator("success", "You have successfully logged in");
        router.push('/guest');
      } else if (isLogin.userdata[0].usro_role_id == 2) { // Manager
        ToastIndicator("success", "You have successfully logged in");
        router.push('/manager');
      } else if (isLogin.userdata[0].usro_role_id == 3) { // Office Boy
        ToastIndicator("success", "You have successfully logged in");
        router.push('/ob');
      } else if (isLogin.userdata[0].usro_role_id == 4) { // Admin
        ToastIndicator("success", "You have successfully logged in");
        router.push('/admin');
      } else if (isLogin.userdata[0].usro_role_id == 5) { // Staff
        ToastIndicator("success", "You have successfully logged in");
        router.push('/staff');
      }
    }
  };

  // getHelper for display in form
  const getHelperText = (touched:any, errors:any, field:any) => {
    if (field == "email") {
      return (touched && errors ? errors : "enter your phone/email");
    } else if(field == "password") {
      return (touched && errors ? errors : "enter your password");
    }  
  }

  // check all validasi required & etc
  const checkoutSchema:any = yup.object().shape({
    userEmailOrPhone: yup.string().required("required"),
    userPassword: yup.string().required("required")
  });

  // function initialValue field from table users
  const initialValues: any = {
    userEmailOrPhone: "",
    userPassword: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handletoRegister = () => {
    router.push('/auth/signupEmployee');
  };

  return (
    <Box>
      <Head>
        <title>Sign In</title>
      </Head>
      <LayoutSignIn>
        <section className='w-3/4 mx-auto my-auto flex flex-col gap-7' >
          <center>
            <Typography className={styles.textTitleInFormLogin}>
              Sign In
            </Typography>
          </center>
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
                  gridTemplateColumns="repeat(15, minmax(0, 1fr))"
                >
                  <InputLabel
                    className={styles.textLabelInFormLogin}
                    sx={{ gridColumn: "span 6" }}
                  >Phone/Email
                  </InputLabel>
                  <TextField
                    size="small"
                    fullWidth
                    className="border border-gray-700"
                    variant="outlined"
                    type="text"
                    placeholder='Phone or Email'
                    onBlur={handleBlur}
                    onChange={(event) => {eventHandlerAdd('userEmailOrPhone')(event); handleChange(event)}}
                    value={values.userEmailOrPhone}
                    name="userEmailOrPhone"
                    error={!!touched.userEmailOrPhone && !!errors.userEmailOrPhone}
                    helperText={getHelperText(touched.userEmailOrPhone, errors.userEmailOrPhone, "email")}
                    sx={{ gridColumn: "span 9" }}
                  />
                  <InputLabel
                    className={styles.textLabelInFormLogin}
                    sx={{ gridColumn: "span 6" }}
                  >Password
                  </InputLabel>
                  <TextField
                    size="small"
                    fullWidth
                    className="border border-gray-700"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
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
                    onBlur={handleBlur}
                    onChange={(event) => { eventHandlerAdd('userPassword')(event); handleChange(event) }}
                    value={values.userPassword}
                    name="userPassword"
                    error={!!touched.userPassword && !!errors.userPassword}
                    helperText={getHelperText(touched.userPassword, errors.userPassword, "password")}
                    sx={{ gridColumn: "span 9" }}
                  />
                  <Button
                      type="submit"
                      color="warning"
                      className="rounded-md bg-gray-700 text-white hover:bg-gray-400 hover:text-gray-700 border-warning-500 first-line:bg-opacity-20 px-4 text-sm normal-case font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      sx={{ gridColumn: "span 15" }}
                    >
                      <LoginIcon width={5} height={5} /><span className='text-transparent'>-</span>{"Sign In"}
                  </Button>
                  <InputLabel
                    className={'text-center text-gray-700 normal-case font-normal'}
                    sx={{ gridColumn: "span 15" }}
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