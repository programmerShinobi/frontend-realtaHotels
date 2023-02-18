import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { Box, Button, InputLabel, InputAdornment, IconButton, Typography, FormControl, FormControlLabel  } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { doRegister } from '@/redux/Actions/Users/reduceActions';
import { useRouter } from 'next/router';
import usersReducers from '@/redux/Reducers/Users/usersReducer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from '../../styles/FormSignUpGuest.module.css'
import { KeyIcon } from '@heroicons/react/24/solid';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import LayoutSignUpGuest from '@/components/Layout/LayoutSignUpGuest';
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import PhoneInputWithCountrySelect from 'react-phone-number-input';
// import sendSMS from '@/utils/sendSMS';

export default function SignUpGuestNew() {
  // use Router
  const router = useRouter();
  
  // useDispatch
  const dispatch = useDispatch();
  
  // define useState API POST users
  const [DataUser, setDataUser] = useState({
    userFullName:null,
    userEmail: null,
    uspaPasswordhash: null,
    userPhoneNumber: null
  });

  console.info(DataUser)
  // function handler API POST users
  const eventHandlerAdd = (data: any) => (event: any) => {
    if (event && event.target) {
      setDataUser({ ...DataUser, [data]: event.target.value });
    }
  }

  // Mengambil state usersReducers dari store redux
  const isRegister = useSelector((state: any) => state.usersReducers.users);

  // const { Vonage } = require('@vonage/server-sdk')
  // const vonage = new Vonage({
  //   apiKey: "fbb9af44",
  //   apiSecret: "Bf3v66eLQ2sMDNSG"
  // })
  // const from = "Vonage APIs"
  // const to = "6281212499837"
  // // const to = "6282215122542"
  // const text = `By FaQih bootcamp-codeXacademy. 
  // Saat ini sedang mencoba verifikasi nomor handphone melalui web, jika pesan ini terkirim ke nomor Anda.
  // Maaf, tolong screenshot pesan ini ke nomor whatsApp saya yaa.. --> https://wa.me/6281212499837 
  // Terimakasih`
  // async function sendSMS() {
  //   await vonage.sms.send({to, from, text})
  //     .then((resp: any) => {
  //       console.log('Message sent successfully');
  //       console.log(resp);
  //     })
  //     .catch((err: any) => {
  //       console.log('Message sent error');
  //       console.error(err.toString());
  //     });
  // }
  // sendSMS();

  // const [verificationCode, setVerificationCode] = useState('');
  // sendSMS('+6282215122542', 'By FaQih UBP-SI18 | bootcamp-codeXacademy ... Sekarang lagi coba Twilio untuk verifikasi nomor handphone, btw kalau terkirim pesan ini, minta tolong coba screenshot ke nomor whatsApp saya yaa.. --> +6281212499837');
  
  // function handle submit form add new users (API POST users)
  const handleFormSubmit = async (values: any, { setSubmitting }: any) => {
    console.info(values);
    try {
    await checkoutSchema.validate(values, { abortEarly: false });
      // Validation passed
    } catch (errors) {
      console.error(errors);
      // Validation failed
    }

    await dispatch(doRegister(values));
    
    // const code = await Math.floor(1000 + Math.random() * 9000);
    // await setVerificationCode(code.toString());
    // send verification code via SMS
    // await sendSMS(fullPhoneNumber, `Your code : ${code} ... By FaQih UBP-SI18 | bootcamp-codeXacademy ... Sekarang lagi coba Twilo untuk verifikasi nomor handphone, btw kalau terkirim pesan ini, minta tolong coba screenshot ke nomor whatsApp saya yaa.. --> +6281212499837`);
    
    // Memeriksa apakah user sudah login
    if (isRegister.message == 'Register Successfully') {
      await router.push('/auth/signin');
    }
  };

  // getHelper for display in form
  const getHelperText = (touched:any, errors:any, field:any) => {
    if (field == "email") {
      return (touched && errors ? errors : "enter your email");
    } else if(field == "password") {
      return (touched && errors ? errors : "enter your password");
    }  else if(field == "confirmPassword") {
      return (touched && errors ? errors : "enter your confirm password");
    } else if(field == "phone") {
      return (touched && errors ? errors : "enter your phone numb.");
    } else if(field == "fullname") {
      return (touched && errors ? errors : "enter your full name");
    }
  }
  
  const checkoutSchema = yup.object().shape({
    userFullName: yup.string().required("required"),
    userEmail: yup.string().email("invalid email").required("required"),
    uspaPasswordhash: yup.string().required("required"),
    uspaConfirmPasswordhash: yup.string()
      .oneOf([yup.ref('uspaPasswordhash'), null], 'Passwords must match')
      .required('required'),
    userPhoneNumber: yup.number().required("required")
  });

  // function initialValue field from table users
  const initialValues: any = {
    userFullName: "",
    userEmail: "",
    uspaPasswordhash: "",
    uspaConfirmPasswordhash: "",
    userPhoneNumber: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handletoLogin = () => {
    router.push('/auth/signin');
  };

  return (
    <Box>
      <Head>
        <title>Guest SignUp</title>
      </Head>
      <LayoutSignUpGuest>
        <section className='w-3/4 mx-auto my-auto flex flex-col gap-7' >
          <center>
          <Typography className={styles.textTitleInFormLogin}>
              Guest SignUp
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
                  // alignItems="center"
                  justifyContent="center"
                  display="grid"
                  gap="8px"
                  gridTemplateColumns="repeat(15, minmax(0, 1fr))"
                >
                  <InputLabel
                    className={styles.textLabelInFormLogin}
                    sx={{ gridColumn: "span 6" }}
                  >Name
                  </InputLabel>
                  <TextField
                    size="small"
                    fullWidth
                    className={styles.formIntputLogin}
                    variant="outlined"
                    type="text"
                    placeholder="Full Name"
                    onBlur={handleBlur}
                    onChange={(event) => { eventHandlerAdd('userFullName')(event);handleChange(event) }}
                    value={values.userFullName}
                    name="userFullName"
                    error={!!touched.userFullName && !!errors.userFullName}
                    helperText={getHelperText(touched.userFullName, errors.userFullName, "fullname")}
                    sx={{ gridColumn: "span 9" }}
                  />
                  <InputLabel
                    className={styles.textLabelInFormLogin}
                    sx={{ gridColumn: "span 6" }}
                  >Email
                  </InputLabel>
                  <TextField
                    size="small"
                    fullWidth
                    className="border border-gray-700"
                    variant="outlined"
                    type="email"
                    placeholder="Email"
                    onBlur={handleBlur}
                    onChange={(event) => {eventHandlerAdd('userEmail')(event); handleChange(event)}}
                    value={values.userEmail}
                    name="userEmail"
                    error={!!touched.userEmail && !!errors.userEmail}
                    helperText={getHelperText(touched.userEmail, errors.userEmail, "email")}
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
                    placeholder="Password"
                    onBlur={handleBlur}
                    onChange={(event) => { eventHandlerAdd('uspaPasswordhash')(event); handleChange(event) }}
                    value={values.uspaPasswordhash}
                    name="uspaPasswordhash"
                    error={!!touched.uspaPasswordhash && !!errors.uspaPasswordhash}
                    helperText={getHelperText(touched.uspaPasswordhash, errors.uspaPasswordhash, "password")}
                    sx={{ gridColumn: "span 9" }}
                  />
                  <InputLabel
                    className={styles.textLabelInFormLogin}
                    sx={{ gridColumn: "span 6" }}
                  >Confirm Password
                  </InputLabel>
                  <TextField
                    size="small"
                    fullWidth
                    className="border border-gray-700"
                    variant="outlined"
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            onMouseDown={handleMouseDownConfirmPassword}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Confirm Password.."
                    onBlur={handleBlur}
                    onChange={(event) => { eventHandlerAdd('uspaConfirmPasswordhash')(event); handleChange(event) }}
                    value={values.uspaConfirmPasswordhash}
                    name="uspaConfirmPasswordhash"
                    error={!!touched.uspaConfirmPasswordhash && !!errors.uspaConfirmPasswordhash}
                    helperText={getHelperText(touched.uspaConfirmPasswordhash, errors.uspaConfirmPasswordhash, "confirmPassword")}
                    sx={{ gridColumn: "span 9" }}
                  />
                  <InputLabel
                    className={styles.textLabelInFormLogin}
                    sx={{ gridColumn: "span 6" }}
                  >Phone Number
                  </InputLabel>
                  <FormControl
                    className="border border-gray-700"
                    size="small"
                    variant="outlined"
                    sx={{ gridColumn: "span 9" }}
                  >
                    <PhoneInput
                      name="userPhoneNumber"
                      placeholder="Enter phone number"
                      value={values.userPhoneNumber}
                      onChange={(event) => { eventHandlerAdd('userPhoneNumber')(event); handleChange}}
                      onBlur={handleBlur}
                      error={!!touched.userPhoneNumber && !!errors.userPhoneNumber}
                      // error={values.userPhoneNumber ? (isValidPhoneNumber(values.userPhoneNumber) ? undefined : 'Invalid phone number') : 'Phone number required'}
                      helperText={getHelperText(touched.userPhoneNumber, errors.userPhoneNumber, "phone")}
                      />
                  </FormControl>
                  <FormControl
                    
                    sx={{ gridColumn: "span 15" }}
                  >
                  Is possible: {values.userPhoneNumber && isPossiblePhoneNumber(values.userPhoneNumber) ? 'true' : 'false'}
                  Is valid: {values.userPhoneNumber && isValidPhoneNumber(values.userPhoneNumber) ? 'true' : 'false'}
                  National: {values.userPhoneNumber && formatPhoneNumber(values.userPhoneNumber)}
                  International: {values.userPhoneNumber && formatPhoneNumberIntl(values.userPhoneNumber)}
                  </FormControl>
                  <Button
                      type="reset"
                      color="warning"
                      className="rounded-md bg-gray-500 text-white hover:bg-gray-400 hover:text-gray-700 border-warning-500 first-line:bg-opacity-20 px-4 text-sm normal-case font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      sx={{ gridColumn: "span 7" }}
                    >
                      <RotateLeftIcon width={15} height={15} /><span className='text-transparent'>-</span>{"Cancle"}
                  </Button>
                  <Button
                      type="submit"
                      color="warning"
                      className="rounded-md bg-gray-700 text-white hover:bg-gray-400 hover:text-gray-700 border-warning-500 first-line:bg-opacity-20 px-4 text-sm normal-case font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      sx={{ gridColumn: "span 8" }}
                    >
                      <KeyIcon width={15} height={15} /><span className='text-transparent'>-</span>{"Sign Up"}
                  </Button>
                  <InputLabel
                    className='text-center text-gray-700 normal-case font-normal'
                    sx={{ gridColumn: "span 15" }}
                  >
                    do have an account yet?<Button
                      className="bg-transparent text-blue-400 hover:text-blue-500 normal-case font-normal hover:bg-transparent justify-center"
                      onClick={handletoLogin}>
                      <b>Sign In</b>
                    </Button>
                  </InputLabel>
                </Box>
              </Form>
            )}
          </Formik>
        </section>
      </LayoutSignUpGuest>
    </Box>
  );
}