import Head from "next/head";
import { useRouter } from "next/router";
import React from "react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usersReducers from "@/redux/Reducers/Users/usersReducer";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";

import ComponentsIndicatorToast from "@/components/Indicator/toast";
import styles from "@/styles/FormSignIn.module.css";
import { FormControl, IconButton, InputAdornment, InputLabel } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutAuthSignIn from "@/components/Layout/auth/signin";
import { doLogin } from "@/redux/Actions/Users/reduceActions";

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
  const eventHandlerAdd = (data: any) => (event: any) => {
    setDataUser({ ...DataUser, [data]: event.target.value });
  }

  // Mengambil state usersReducers dari store redux
  const isLogin = useSelector((state: any) => state.usersReducers.users);

  // function handle submit form add new users (API POST users)
  const handleFormSubmit = (values: any, { setSubmitting }: any) => {
    dispatch(doLogin(values));


    // Memeriksa apakah user sudah login
    if (isLogin.message == "Login successfully") {
      localStorage.setItem('token', isLogin.token);
      localStorage.setItem('userId', isLogin.userdata[0].user_id);
      localStorage.setItem('roleId', isLogin.userdata[0].usro_role_id);
      localStorage.setItem('userId', isLogin.userdata[0].user_id);
      localStorage.setItem('userPhoto', isLogin.userdata[0].uspro_photo);
      localStorage.setItem('userFullName', isLogin.userdata[0].user_full_name);
      localStorage.setItem('PhoneNumber', isLogin.userdata[0].user_phone_number);
      localStorage.setItem('UserType', isLogin.userdata[0].user_type);
      localStorage.setItem('Email', isLogin.userdata[0].user_email);
      Cookies.set('userId', isLogin.userdata[0].user_id);
      if (isLogin.userdata[0].usro_role_id == 1) {        // Guest
        ComponentsIndicatorToast({ status: 'success', message: 'You have successfully logged in' });
        if (router.pathname == '/auth/signin') {
          router.push('/');
        } else {
          router.back();
        }
      } else if (isLogin.userdata[0].usro_role_id == 2) { // Manager
        ComponentsIndicatorToast({ status: 'success', message: 'You have successfully logged in' });
        router.push('/manager');
      } else if (isLogin.userdata[0].usro_role_id == 3) { // Office Boy
        ComponentsIndicatorToast({ status: 'success', message: 'You have successfully logged in' });
        router.push('/ob');
      } else if (isLogin.userdata[0].usro_role_id == 4) { // Admin
        ComponentsIndicatorToast({ status: 'success', message: 'You have successfully logged in' });
        router.push('/admin');
      } else if (isLogin.userdata[0].usro_role_id == 5) { // Staff
        ComponentsIndicatorToast({ status: 'success', message: 'You have successfully logged in' });;
        router.push('/staff');
      } else if (isLogin.userdata[0].usro_role_id == 6) { // Finance
        ComponentsIndicatorToast({ status: 'success', message: 'You have successfully logged in' });;
        router.push('/finance');
      } else {
        ComponentsIndicatorToast({ status: 'warning', message: 'Check your phone/email or password invalid' });
      }
    } else if (isLogin.message == "Cannot read properties of null (reading 'userEmail')") {
      ComponentsIndicatorToast({ status: 'warning', message: 'Check your email again' });
    } else if (isLogin.message == "Cannot read properties of null (reading 'userPhoneNumber')") {
      ComponentsIndicatorToast({ status: 'warning', message: 'Check your phone number again' });
    } else if (isLogin.message == "Password Invalid") {
      ComponentsIndicatorToast({ status: 'warning', message: 'Check your password again' });
    }
  };

  // getHelper for display in form
  const getHelperText = (touched: any, errors: any, field: any) => {
    if (field == "email") {
      return (touched && errors ? errors : "enter your phone/email");
    } else if (field == "password") {
      return (touched && errors ? errors : "enter your password");
    }
  }

  // check all validasi required & etc
  const checkoutSchema: any = yup.object().shape({
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
    router.push('/auth/signupGuest');
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <LayoutAuthSignIn>
        <div className="font-normal text-gray-900 text-justify">
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
                <div
                >
                  <InputLabel
                    className={styles.textLabelInFormLogin}
                  >Phone/Email
                  </InputLabel>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder='Phone or Email'
                    onBlur={handleBlur}
                    onChange={(event) => { eventHandlerAdd('userEmailOrPhone')(event); handleChange(event) }}
                    value={values.userEmailOrPhone}
                    name="userEmailOrPhone"
                    error={!!touched.userEmailOrPhone && !!errors.userEmailOrPhone}
                    helperText={getHelperText(touched.userEmailOrPhone, errors.userEmailOrPhone, "email")}
                  />
                  <InputLabel
                    className={styles.textLabelInFormLogin}
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
                  />
                  <FormControl className="w-full">
                    <button
                      type="submit"
                      className="rounded-md mt-4 text-md bg-[#F33C5D] text-white hover:bg-rose-600 hover:text-white first-line:bg-opacity-20 px-4 py-2 normal-case font-normal "
                    >
                      <LoginIcon className="text-white " width={5} height={5} />{" Sign In"}
                    </button>
                  </FormControl>
                  <InputLabel
                    className={'text-center text-gray-700 normal-case font-normal mt-4 mb-4'}>
                    don't have an account yet?<button
                      className="bg-transparent text-blue-400 hover:text-blue-500 text-sm normal-case font-normal hover:bg-transparent justify-center"
                      onClick={handletoRegister}><span className='text-transparent'>-</span>
                      <b>{"Sign Up"}</b>
                    </button>
                  </InputLabel>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </LayoutAuthSignIn>
    </>
  );
}