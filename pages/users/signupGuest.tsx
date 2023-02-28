import Head from 'next/head';
import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastIndicator from '@/components/Indicator/ToastIndicator';

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
  const handleFormSubmit = async (values: any, { setSubmitting }: any) => { 
    const phoneNumber = await values.countryCode + values.userPhoneNumber;

    await dispatch(doRegisterGuest({
      ...values,
      uspaPasswordhash: phoneNumber,
      userPhoneNumber: phoneNumber,
    }));
    
    // Memeriksa apakah user sudah login
    if (await isRegister.message == 'Register Successfully' && !isRegister.savedUser.message) {
      ToastIndicator({status: 'success', message: 'You have successfully registered'});  
      router.push('/users/signin');
    } else if (isRegister.savedUser.message == 'duplicate key value violates unique constraint \"u_user_phone_number\"') {;
      ToastIndicator({status: 'warning', message: 'Your phone number has been registered'});
    } else {
      ToastIndicator({status: 'warning', message: 'Check your phone number again'});
    }
  };

  // getHelper for display in form
  const getHelperText = (touched: any, errors: any, field: any) => {
    if (field == "phone") {
      return (touched && errors ? errors : "enter your phone number");
    }
  }

  // Phone Extension
  const phoneExtension = [
    { value: '+62', label: '+62 (Indonesia)', },
    { value: '+1', label: '+1 (United States)', },
    { value: '+44', label: '+44 (United Kingdom)', },
    { value: '+81', label: '+81 (Japan)', },
    { value: '+86', label: '+86 (China)', },
    { value: '+91', label: '+91 (India)', },
    { value: '+55', label: '+55 (Brazil)', },
    { value: '+33', label: '+33 (France)', },
    { value: '+49', label: '+49 (Germany)', },
    { value: '+234', label: '+234 (Nigeria)', },
    { value: '+7', label: '+7 (Russia)', },
    { value: '+65', label: '+65 (Singapore)', },
    { value: '+34', label: '+34 (Spain)', },
    { value: '+41', label: '+41 (Switzerland)', },
    { value: '+971', label: '+971 (United Arab Emirates)',},
    { value: '+91', label: '+91 (India)', },
    { value: '+351', label: '+351 (Portugal)', },
    { value: '+352', label: '+352 (Luxembourg)', },
    { value: '+353', label: '+353 (Ireland)', },
    { value: '+354', label: '+354 (Iceland)', },
    { value: '+355', label: '+355 (Albania)', },
    { value: '+356', label: '+356 (Malta)', },
    { value: '+357', label: '+357 (Cyprus)', },
    { value: '+358', label: '+358 (Finland)', },
    { value: '+359', label: '+359 (Bulgaria)', },
    { value: '+36', label: '+36 (Hungary)', },
    { value: '+370', label: '+370 (Lithuania)', },
    { value: '+371', label: '+371 (Latvia)', },
    { value: '+372', label: '+372 (Estonia)', },
    { value: '+373', label: '+373 (Moldova)', },
    { value: '+374', label: '+374 (Armenia)', },
    { value: '+375', label: '+375 (Belarus)', },
    { value: '+376', label: '+376 (Andorra)', },
    { value: '+377', label: '+377 (Monaco)', },
    { value: '+378', label: '+378 (San Marino)', },
    { value: '+379', label: '+379 (Vatican City)', },
    { value: '+380', label: '+380 (Ukraine)', },
    { value: '+381', label: '+381 (Serbia)', },
    { value: '+382', label: '+382 (Montenegro)', },
    { value: '+383', label: '+383 (Kosovo)', },
    { value: '+385', label: '+385 (Croatia)', },
    { value: '+386', label: '+386 (Slovenia)', },
    { value: '+387', label: '+387 (Bosnia and Herzegovina)', },
    { value: '+389', label: '+389 (North Macedonia)', },
    { value: '+39', label: '+39 (Italy)', },
    { value: '+40', label: '+40 (Romania)', },
    { value: '+41', label: '+41 (Switzerland)', },
    { value: '+1-246', label: '+1-246 (Barbados)', },
    { value: '+1-268', label: '+1-268 (Antigua and Barbuda)', },
    { value: '+1-284', label: '+1-284 (British Virgin Islands)', },
    { value: '+1-340', label: '+1-340 (U.S. Virgin Islands)', },
    { value: '+1-345', label: '+1-345 (Cayman Islands)', },
    { value: '+1-441', label: '+1-441 (Bermuda)', },
    { value: '+1-473', label: '+1-473 (Grenada)', },
    { value: '+1-649', label: '+1-649 (Turks and Caicos Islands)', },
    { value: '+1-664', label: '+1-664 (Montserrat)', },
    { value: '+1-670', label: '+1-670 (Northern Mariana Islands)', },
    { value: '+1-671', label: '+1-671 (Guam)', },
    { value: '+1-758', label: '+1-758 (Saint Lucia)', },
    { value: '+1-767', label: '+1-767 (Dominica)', },
    { value: '+1-784', label: '+1-784 (Saint Vincent and the Grenadines)', },
    { value: '+1-787', label: '+1-787 (Puerto Rico)', },
    { value: '+1-809', label: '+1-809 (Dominican Republic)', },
    { value: '+1-868', label: '+1-868 (Trinidad and Tobago)', },
    { value: '+1-869', label: '+1-869 (Saint Kitts and Nevis)', },
    { value: '+1-876', label: '+1-876 (Jamaica)', },
    { value: '+44-1481', label: '+44-1481 (Guernsey)', },
    { value: '+44-1534', label: '+44-1534 (Jersey)', },
    { value: '+44-1624', label: '+44-1624 (Isle of Man)', },
    { value: '+599-3', label: '+599-3 (Bonaire, Sint Eustatius and Saba)', },
    { value: '+599-4', label: '+599-4 (Sint Maarten)', },
    { value: '+599-7', label: '+599-7 (Curaçao)', },
    { value: '+672', label: '+672 (Norfolk Island)', },
    { value: '+852', label: '+852 (Hong Kong)', },
    { value: '+853', label: '+853 (Macau)', },
    { value: '+855', label: '+855 (Cambodia)', },
    { value: '+856', label: '+856 (Laos)', },
    { value: '+872', label: '+872 (International Networks)', },
    { value: '+880', label: '+880 (Bangladesh)', },
    { value: '+886', label: '+886 (Taiwan)', },
    { value: '+960', label: '+960 (Maldives)', },
    { value: '+961', label: '+961 (Lebanon)', },
    { value: '+962', label: '+962 (Jordan)', },
    { value: '+963', label: '+963 (Syria)', },
    { value: '+964', label: '+964 (Iraq)', },
    { value: '+7', label: '+7 (Russia)', },
    { value: '+65', label: '+65 (Singapore)', },
    { value: '+34', label: '+34 (Spain)', },
    { value: '+41', label: '+41 (Switzerland)', },
    { value: '+971', label: '+971 (United Arab Emirates)',},
    { value: '+91', label: '+91 (India)', },
    { value: '+351', label: '+351 (Portugal)', },
    { value: '+352', label: '+352 (Luxembourg)', },
    { value: '+353', label: '+353 (Ireland)', },
    { value: '+354', label: '+354 (Iceland)', },
    { value: '+355', label: '+355 (Albania)', },
    { value: '+356', label: '+356 (Malta)', },
    { value: '+357', label: '+357 (Cyprus)', },
    { value: '+358', label: '+358 (Finland)', },
    { value: '+359', label: '+359 (Bulgaria)', },
    { value: '+36', label: '+36 (Hungary)', },
    { value: '+370', label: '+370 (Lithuania)', },
    { value: '+371', label: '+371 (Latvia)', },
    { value: '+372', label: '+372 (Estonia)', },
    { value: '+373', label: '+373 (Moldova)', },
    { value: '+374', label: '+374 (Armenia)', },
    { value: '+375', label: '+375 (Belarus)', },
    { value: '+376', label: '+376 (Andorra)', },
    { value: '+377', label: '+377 (Monaco)', },
    { value: '+378', label: '+378 (San Marino)', },
    { value: '+379', label: '+379 (Vatican City)', },
    { value: '+380', label: '+380 (Ukraine)', },
    { value: '+381', label: '+381 (Serbia)', },
    { value: '+382', label: '+382 (Montenegro)', },
    { value: '+383', label: '+383 (Kosovo)', },
    { value: '+385', label: '+385 (Croatia)', },
    { value: '+386', label: '+386 (Slovenia)', },
    { value: '+387', label: '+387 (Bosnia and Herzegovina)', },
    { value: '+389', label: '+389 (North Macedonia)', },
    { value: '+39', label: '+39 (Italy)', },
    { value: '+40', label: '+40 (Romania)', },
    { value: '+420', label: '+420 (Czech Republic)', },
    { value: '+421', label: '+421 (Slovakia)', },
    { value: '+423', label: '+423 (Liechtenstein)', },
    { value: '+43', label: '+43 (Austria)', },
    { value: '+44', label: '+44 (United Kingdom)', },
    { value: '+45', label: '+45 (Denmark)', },
    { value: '+46', label: '+46 (Sweden)', },
    { value: '+47', label: '+47 (Norway)', },
    { value: '+48', label: '+48 (Poland)', },
    { value: '+852', label: '+852 (Hong Kong)', },
    { value: '+81', label: '+81 (Japan)', },
  ];
  
  const checkoutSchema = yup.object().shape({
    countryCode: yup.string().required("required"),
    userPhoneNumber: yup.number().typeError("Invalid phone number format") // menampilkan error jika input bukan tipe data number
      .test(
        "len",
        "Phone number must be between 6 and 15 digits",
        (val:any) => val && val.toString().length >= 6 && val.toString().length <= 15 // batas minimal dan maksimal karakter
      ).test(
        "match",
        "Invalid phone number format",
        (val:any) => val && /^\d+$/.test(val.toString()) // regex untuk mengecek format nomor telepon
      ).required("required")
  });


  // function initialValue field from table users
  const initialValues: any = {
    uspaPasswordhash:"",
    userPhoneNumber: "",
    countryCode: "+62",
  };

  const handletoLogin = () => {
    router.push('/users/signin');
  };
  
  return (
    <Box>
      <Head>
        <title>Guest SignUp</title>
      </Head>
      <LayoutSignUpGuest>
        <section className='w-3/4 mx-auto my-auto flex flex-col gap-2' >
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
                  gap="2px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >
                  <InputLabel
                    margin='dense'
                    className={styles.textLabelInFormLogin}
                    sx={{ gridColumn: "span 1" }}
                  >Phone Number
                  </InputLabel>
                  <FormControl margin='dense' size="small" variant="outlined" sx={{ gridColumn: "span 1" }}>
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
                      {/* {phoneExtension.map((code) => (
                        <MenuItem key={code.value} value={code.value}>
                          {code.label}
                        </MenuItem>
                      ))} */}
                      {phoneExtension.sort((a:any, b:any) => b.value - a.value)
                        .map((code) => (
                          <MenuItem key={code.value} value={code.value}>
                            {code.label}
                          </MenuItem>
                        ))}
                    </Select>
                    {!!touched.countryCode && !!errors.countryCode && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.countryCode, errors.countryCode, "countryCode")}</span>}
                  </FormControl>

                  <TextField
                    margin='dense'
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
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl margin='dense' sx={{ gridColumn: "span 2" }}>
                    <Button
                        type="reset"
                        color="warning"
                        className="rounded-md bg-gray-500 text-white hover:bg-gray-400 hover:text-gray-700 border-warning-500 first-line:bg-opacity-20 px-4 py-1 text-sm normal-case font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        
                      >
                        <RotateLeftIcon width={15} height={15} /><span className='text-transparent'>-</span>{"Cancle"}
                    </Button>
                  </FormControl>
                  <FormControl margin='dense' sx={{ gridColumn: "span 2" }}>
                    <Button
                        type="submit"
                        color="warning"
                        className="rounded-md bg-gray-700 text-white hover:bg-gray-400 hover:text-gray-700 border-warning-500 first-line:bg-opacity-20 px-4 text-sm normal-case font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
                        <KeyIcon width={15} height={15} /><span className='text-transparent'>-</span>{"Sign Up"}
                    </Button>
                  </FormControl>
                  <InputLabel
                    className='text-center text-gray-700 normal-case font-normal'
                    sx={{ gridColumn: "span 4" }}
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