import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { Box, Button, InputLabel, InputAdornment, IconButton, Typography, FormControl, Select, MenuItem  } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { doRegister } from '@/redux/Actions/Users/reduceActions';
import { useRouter } from 'next/router';
import usersReducers from '@/redux/Reducers/Users/usersReducer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from '../../styles/FormSignUpEmployee.module.css'
import { KeyIcon } from '@heroicons/react/24/solid';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import LayoutSignUpEmployee from '@/components/Layout/LayoutSignUpEmployee';

export default function SignUpEmployee() {
  // use Router
  const router = useRouter();
  
  // useDispatch
  const dispatch = useDispatch();
  
  // define useState API POST users
  const [DataUser, setDataUser] = useState({
    userFullName:null,
    userEmail: null,
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
  const handleFormSubmit = (values: any, { setSubmitting }: any) => {
    console.info(values);
    // dispatch(doRegister(values));
    const fullPhoneNumber = `${values.countryCode}${values.userPhoneNumber}`;
    console.info(fullPhoneNumber);
    dispatch(doRegister({ ...values, userPhoneNumber: fullPhoneNumber }));

    // Memeriksa apakah user sudah login
    if (isRegister.message == 'Register Successfully') {
      router.push('/auth/signin');
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
    userFullName: yup.string().required("required"),
    userEmail: yup.string().email("invalid email").required("required"),
    uspaPasswordhash: yup.string().required("required"),
    uspaConfirmPasswordhash: yup.string()
      .oneOf([yup.ref('uspaPasswordhash'), null], 'Passwords must match')
      .required('required'),
    countryCode: yup.string().required("required"),
    userPhoneNumber: yup.number().required("required")
  });


  // function initialValue field from table users
  const initialValues: any = {
    userFullName: "",
    userEmail: "",
    uspaPasswordhash: "",
    uspaConfirmPasswordhash: "",
    userPhoneNumber: "",
    countryCode: "+62",
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
        <title>Employee SignUp</title>
      </Head>
      <LayoutSignUpEmployee>
        <section className='w-3/4 mx-auto my-auto flex flex-col gap-7' >
          <center>
          <Typography className={styles.textTitleInFormLogin}>
              Employee SignUp
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
                    onChange={(event) => { eventHandlerAdd('userFullName')(event); handleChange(event) }}
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
                  <FormControl size="small" variant="outlined" sx={{ gridColumn: "span 3" }}>
                    <Select
                      name="countryCode"
                      value={values.countryCode}
                      // onChange={handleChange}
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
      </LayoutSignUpEmployee>
    </Box>
  );
}