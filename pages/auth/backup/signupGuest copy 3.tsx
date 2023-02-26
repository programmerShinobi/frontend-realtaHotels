import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { Box, Button, InputLabel, InputAdornment, IconButton, Typography, FormControl, Select, MenuItem, Input  } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { doRegister, doRegisterGuest } from '@/redux/Actions/Users/reduceActions';
import { useRouter } from 'next/router';
import usersReducers from '@/redux/Reducers/Users/usersReducer';
import styles from '../../styles/FormSignUpGuest.module.css'
import { KeyIcon } from '@heroicons/react/24/solid';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import LayoutSignUpGuest from '@/components/Layout/LayoutSignUpGuest';
import sendWA from '@/utils/sendWA';
import moment from 'moment';
import axios from 'axios';

export default function SignUpGuest() {
  // use Router
  const router = useRouter();
  
  // useDispatch
  const dispatch = useDispatch();
  
  // define useState API POST users
  const [DataUser, setDataUser] = useState({
    uspaPasswordhash: null,
    userPhoneNumber: null,
    countryCode:null
  });

  const eventHandlerAdd = (fieldName: string) => (event: any) => {
    if (fieldName === 'countryCode') {
      setDataUser((prevState: any) => ({
        ...prevState,
        countryCode: event.target.value,
        userPhoneNumber: {
          ...prevState.userPhoneNumber,
          countryCode: event.target.value,
        },
      }));
    } else if (fieldName === 'userPhoneNumber') {
      setDataUser((prevState: any) => ({
        ...prevState,
        userPhoneNumber: {
          ...prevState.userPhoneNumber,
          number: event.target.value,
        },
      }));
    }
  };
  
  // Mengambil state usersReducers dari store redux
  const isRegister = useSelector((state: any) => state.usersReducers.users);

  // function handle submit form add new users (API POST users)
  // const handleFormSubmit = async (values: any, { setSubmitting }: any) => {
  //   const phoneNumber = await values.countryCode + values.userPhoneNumber;
  //   const now = await moment(new Date).format("YYYYMMDD");
  //   const password = await 'GuesT!' + now + values.userPhoneNumber;

  //   // await window.addEventListener('beforeunload', function(event) {
  //     localStorage.setItem('isPhoneNumber', phoneNumber);
  //     localStorage.setItem('isPassword', password);
  //   // });

  //   // await dispatch(doRegisterGuest({
  //     //   ...values,
  //     //   uspaPasswordhash: password,
  //   //   userPhoneNumber: phoneNumber,
  //   // }));
  //   // Memeriksa apakah user sudah login
    
  //   await setTimeout(() => {
  //     // router.reload();
  //   }, 1000);

  //   if (await isRegister.message == 'Register Successfully') {
  //       router.reload();
  //   }
  // };


  ///---------------------------------------------------------------------- LAST -----------------


  // const [phoneNumber, setPhoneNumber] = useState<any>("");
  // const [password, setPassword] = useState<any>("");

  // const handleFormSubmit = async ( values: any, { setSubmitting }: any) => {
  //   const phoneNumber = await values.countryCode + values.userPhoneNumber;
  //   const now = await moment(new Date).format("YYYYMMDD");
  //   const password = await 'GuesT!' + now + values.userPhoneNumber;

  //   // Register user here
  //   await dispatch(doRegisterGuest({
  //     ...values,
  //     uspaPasswordhash: password,
  //     userPhoneNumber: phoneNumber,
  //   }));

  //   // Set localStorage items
  //   await localStorage.setItem('isPhoneNumber', phoneNumber);
  //   await localStorage.setItem('isPassword', password);

  //   await setTimeout(() => {
  //     router.reload();
  //   }, 1000);
  // };

  //   const isPhoneNumber = localStorage.getItem('isPhoneNumber');
  //   const isPassword = localStorage.getItem('isPassword');
  //   if (isPhoneNumber || isPassword) {
  //     setPhoneNumber(isPhoneNumber);
  //     setPassword(isPassword);
  //   }

  //   const sender = '6281212499837'; // No.Hp Pengirim
  //   const apiKey = 'jTYnHBlDlPrzM0EFEidotthE2Xnv18'; // API KEY Anda
  //   const url = 'https://server.wa-bisnis.com/send-message'; // URL API
  //   const receiver = phoneNumber; // No.HP Penerima
  //   const pesan = `Welcome to Realta Hotels. Your login access with password is :\n${password}`; // Pesan yang dikirim
  
  //   const data = {
  //     api_key: apiKey,
  //     sender: sender,
  //     number: receiver,
  //     message: pesan,
  //   };
  
  //   // console.info(data);
  
  //   axios.post(url, JSON.stringify(data), {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //   }).then(response => {
  //     localStorage.removeItem('isPhoneNumber');
  //     localStorage.removeItem('isPassword');
  //     console.info(response.data);
  //     router.push('/auth/signupGuest')
  //   }).catch(error => {
  //     console.error(error);
  //   }); 

  // -----------------------------------------------------------------------
  
  const [phoneNumber, setPhoneNumber] = useState<string>(() => {
  const storedPhoneNumber = localStorage.getItem("phoneNumber");
    return storedPhoneNumber ? storedPhoneNumber : "";
  });
  const [password, setPassword] = useState<string>(() => {
    const storedPassword = localStorage.getItem("password");
    return storedPassword ? storedPassword : "";
  });

  const handleFormSubmit = async (values: any, { setSubmitting }: any) => {
    const phoneNumber = await values.countryCode + values.userPhoneNumber;
    const now = await moment(new Date()).format("YYYYMMDD");
    const password = await "GuesT!" + now + values.userPhoneNumber;

    // Register user here
    await dispatch(
      doRegisterGuest({
        ...values,
        uspaPasswordhash: password,
        userPhoneNumber: phoneNumber,
      })
    );

    // Set localStorage items
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("password", password);

    await setPhoneNumber(phoneNumber);
    await setPassword(password);

    await setTimeout(() => {
      router.reload();
    }, 1000);
  };

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }

    const storedPassword = localStorage.getItem("password");
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  
  // ----------------------------------------------------------------------
  
  
  
  // const [phoneNumber, setPhoneNumber] = useState<any>("");
  // const [password, setPassword] = useState<any>("");

  // const handleFormSubmit = async (values: any, { setSubmitting }: any) => {
  //   const phoneNumber = await values.countryCode + values.userPhoneNumber;
  //   const now = await moment(new Date).format("YYYYMMDD");
  //   const password = await "GuesT!" + now + values.userPhoneNumber;

  //   // Register user here
  //   await dispatch(
  //     doRegisterGuest({
  //       ...values,
  //       uspaPasswordhash: password,
  //       userPhoneNumber: phoneNumber,
  //     })
  //   );

  //   // Set cookies with expiration date
  //   document.cookie = `isPhoneNumber=${phoneNumber};expires=${new Date(
  //     new Date().getTime() + 24 * 60 * 60 * 1000
  //   ).toUTCString()};path=/`;

  //   document.cookie = `isPassword=${password};expires=${new Date(
  //     new Date().getTime() + 24 * 60 * 60 * 1000
  //   ).toUTCString()};path=/`;

  //   await setPhoneNumber(phoneNumber);
  //   await setPassword(password);

  //   await setTimeout(() => {
  //     router.reload();
  //   }, 1000);
  // };

  // useEffect(() => {
  //   const cookies = document.cookie.split("; ");
  //   let phoneNumber = "";
  //   let password = "";

  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].split("=");
  //     if (cookie[0] === "isPhoneNumber") {
  //       phoneNumber = cookie[1];
  //     }
  //     if (cookie[0] === "isPassword") {
  //       password = cookie[1];
  //     }
  //   }

  //   setPhoneNumber(phoneNumber);
  //   setPassword(password);
  // }, []);

  // const sender = "6281212499837"; // No.Hp Pengirim
  // const apiKey = "jTYnHBlDlPrzM0EFEidotthE2Xnv18"; // API KEY Anda
  // const url = "https://server.wa-bisnis.com/send-message"; // URL API
  // const receiver = phoneNumber; // No.HP Penerima
  // const pesan = `Welcome to Realta Hotels. Your login access with password is :\n${password}`; // Pesan yang dikirim

  // const data = {
  //   api_key: apiKey,
  //   sender: sender,
  //   number: receiver,
  //   message: pesan,
  // };

  // axios
  //   .post(url, JSON.stringify(data), {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   })
  //   .then((response) => {
  //     // Delete cookies after use
  //     document.cookie = "isPhoneNumber=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  //     document.cookie = "isPassword=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";

  //     console.info(response.data);
  //     router.push("/auth/signupGuest");
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  
  // getHelper for display in form
  const getHelperText = (touched: any, errors: any, field: any) => {
    if (field == "phone") {
      return (touched && errors ? errors : "enter your phone numb.");
    }
  }
  // Phone Extension
  const phoneExtension = [
    { value: '+62', label: '+62', },
    { value: '+1',  label: '+1',  },
    { value: '+44', label: '+44', },
    { value: '+81', label: '+81', },
    { value: '+86', label: '+86', },
    { value: '+91', label: '+91', },
    { value: '+55', label: '+55', },
    { value: '+33', label: '+33', },
    { value: '+49', label: '+49', },
    { value: '+234', label: '+234', },
    { value: '+7',  label: '+7', },
    { value: '+65', label: '+65', },
    { value: '+34', label: '+34', },
    { value: '+41', label: '+41', },
    { value: '+971', label: '+971',},
    { value: '+91', label: '+91', },
    { value: '+351', label: '+351', },
    { value: '+352', label: '+352', },
    { value: '+353', label: '+353', },
    { value: '+354', label: '+354', },
    { value: '+355', label: '+355', },
    { value: '+356', label: '+356', },
    { value: '+357', label: '+357', },
    { value: '+358', label: '+358', },
    { value: '+359', label: '+359', },
    { value: '+36', label: '+36', },
    { value: '+370', label: '+370', },
    { value: '+371', label: '+371', },
    { value: '+372', label: '+372', },
    { value: '+373', label: '+373', },
    { value: '+374', label: '+374', },
    { value: '+375', label: '+375', },
    { value: '+376', label: '+376', },
    { value: '+377', label: '+377', },
    { value: '+378', label: '+378', },
    { value: '+379', label: '+379', },
    { value: '+380', label: '+380', },
    { value: '+381', label: '+381', },
    { value: '+382', label: '+382', },
    { value: '+383', label: '+383', },
    { value: '+385', label: '+385', },
    { value: '+386', label: '+386', },
    { value: '+387', label: '+387', },
    { value: '+389', label: '+389', },
    { value: '+39', label: '+39', },
    { value: '+40', label: '+40', },
    { value: '+41', label: '+41', },
    { value: '+420', label: '+420', },
    { value: '+421', label: '+421', },
    { value: '+423', label: '+423', },
    { value: '+43', label: '+43', },
    { value: '+44', label: '+44', },
    { value: '+45', label: '+45', },
    { value: '+46', label: '+46', },
    { value: '+47', label: '+47', },
    { value: '+48', label: '+48', },
    { value: '+49', label: '+49', },
    { value: '+46', label: '+46', },
    { value: '+39', label: '+39', },
    { value: '+31', label: '+31', },
    { value: '+852', label: '+852', },
    { value: '+852', label: '+852', },
    { value: '+81', label: '+81', },
    { value: '+41', label: '+41', },
    { value: '+82', label: '+82', },
    { value: '+60', label: '+60', },
    { value: '+63', label: '+63', },
    { value: '+66', label: '+66', },
    { value: '+84', label: '+84', },
    { value: '+55', label: '+55', },
    { value: '+54', label: '+54', },
    { value: '+56', label: '+56', },
    { value: '+57', label: '+57', },
    { value: '+58', label: '+58', },
    { value: '+591', label: '+591', },
    { value: '+592', label: '+592', },
    { value: '+593', label: '+593', },
    { value: '+594', label: '+594', },
    { value: '+595', label: '+595', },
    { value: '+596', label: '+596', },
    { value: '+597', label: '+597', },
    { value: '+598', label: '+598', },
    { value: '+599', label: '+599', },
    { value: '+84', label: '+84', },
    { value: '+678', label: '+678', },
    { value: '+679', label: '+679', },
    { value: '+680', label: '+680', },
  ];
  
  const checkoutSchema = yup.object().shape({
    countryCode: yup.string().required("required"),
    userPhoneNumber: yup.number().required("required")
  });

  // function initialValue field from table users
  const initialValues: any = {
    uspaPasswordhash:"",
    userPhoneNumber: "",
    countryCode: "+62",
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
              Guest Sign Up
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
                  >Phone Number
                  </InputLabel>
                  <FormControl size="small" variant="outlined" sx={{ gridColumn: "span 3" }}>
                    <Select
                      name="countryCode"
                      value={values.countryCode}
                      onChange={(event) => {eventHandlerAdd('countryCode')(event);handleChange(event)}}
                      onBlur={handleBlur}
                      error={touched.countryCode && Boolean(errors.countryCode)}
                      placeholder="Select country code..."
                    >
                      <MenuItem value="" disabled>
                        Select extension...
                      </MenuItem>
                      {phoneExtension.map((code) => (
                        <MenuItem key={code.value} value={code.value}>
                          {code.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!touched.countryCode && !!errors.countryCode && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.countryCode, errors.countryCode, "countryCode")}</span>}
                  </FormControl>

                  <TextField
                    size="small"
                    fullWidth
                    className="border border-gray-700"
                    variant="outlined"
                    type="number"
                    placeholder="Phone Number"
                    onBlur={handleBlur}
                    onChange={(event) => {eventHandlerAdd('userPhoneNumber')(event); handleChange(event);}}
                    value={values.userPhoneNumber}
                    name="userPhoneNumber"
                    error={!!touched.userPhoneNumber && !!errors.userPhoneNumber}
                    helperText={getHelperText(touched.userPhoneNumber, errors.userPhoneNumber, "phone")}
                    sx={{ gridColumn: "span 6" }}
                  />
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

