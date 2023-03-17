import Head from "next/head";
import React,{ useEffect, useState}  from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import ComponentsIndicatorToast from "@/components/Indicator/toast";
import { useDispatch, useSelector } from "react-redux";
import { doForgotPassword, doUserRequest } from "@/redux/Actions/Users/reduceActions";
import { Box, FormControl, IconButton, InputAdornment, InputLabel, Button, MenuItem, Select } from "@mui/material"
import TextField from "@mui/material/TextField";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import KeyIcon from '@mui/icons-material/Key';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutAuthForgotPassword from "@/components/Layout/auth/forgotPassword";

export default function ForgotPassword() {
  // useDispatch
  const dispatch = useDispatch();

  // use Router
  const router = useRouter();

  // define useState API POST users
  const [DataUserEdit, setDataUserEdit]:any = useState({
    userPhoneNumber: null,
    uspaPasswordhash: null,
    uspaConfirmPasswordhash:null,
  });

  // useSelector
  const user = useSelector((state: any) => state.usersReducers.user);

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

  // phone regExp
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  
  // getHelper for display in form
  const getHelperTextPassword = (touched: any, errors: any, field:any) => {
    if (field == "phone") {
      return (touched && errors ? errors : "enter your phone number");
    } else if(field == "password") {
      return (touched && errors ? errors : "enter your new password");
    }  else if(field == "confirmPassword") {
      return (touched && errors ? errors : "enter your confirm password");
    }
  }

  const passwordChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  
  function generatePassword(length:any) {
    let password = "";
    for (let i = 0; i < length; i++) {
      password += passwordChars.charAt(Math.floor(Math.random() * passwordChars.length));
    }
    return password;
  }

  // Password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 
  function validatePassword(password:any) {
    return passwordRegex.test(password);
  }

  let password = generatePassword(12);

  while (!validatePassword(password)) {
    password = generatePassword(12);
  }

  // check all validasi required & etc
  const checkoutSchemaPassword: any = yup.object().shape({
    countryCode: yup.string().required("required"),
    userPhoneNumber: yup.string().typeError("Invalid phone number format") // menampilkan error jika input bukan tipe data number
      .test(
        "len",
        "Phone number must be between 6 and 15 digits",
        (val:any) => val && val.toString().length >= 6 && val.toString().length <= 15 // batas minimal dan maksimal karakter
      ).test(
        "match",
        "Invalid phone number format",
        (val:any) => val && /^\d+$/.test(val.toString()) // regex untuk mengecek format nomor telepon
      ).required("required"),
    uspaPasswordhash: yup.string().required("required").test("password-validation", "Password must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, one number, and one symbol", validatePassword),
    uspaConfirmPasswordhash: yup.string()
      .oneOf([yup.ref('uspaPasswordhash'), null], 'Passwords must match')
      .required('required'),
  });

  // function initialValue field from table users
  const initialValuesPassword: any = {
    countryCode: "+62",
    userPhoneNumber: "",
    uspaPasswordhash: "",
    uspaConfirmPasswordhash:"",
  };

  
  // function handler API PUT users
  const eventHandlerEditPassword = (data: any) => (event: any) => {
    if (data === 'countryCode') {
      setDataUserEdit((prevState: any) => ({
        ...prevState,
        countryCode: event.target.value,
        userPhoneNumber: {
          ...prevState.userPhoneNumber,
          countryCode: event.target.value,
        },
      }));
    } else if (data === 'userPhoneNumber') {
      setDataUserEdit((prevState: any) => ({
        ...prevState,
        userPhoneNumber: {
          ...prevState.userPhoneNumber,
          number: event.target.value,
        },
      }));
    }
      // setDataUserEdit({...DataUserEdit, [data] : event.target.value});
  }
  
  // function handle submit form edit users (API POST users)
  const handleFormSubmitEditPassword = (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    const phoneNumber = values.countryCode + values.userPhoneNumber;
      dispatch(doUserRequest(phoneNumber));
    if (user.results) {
      dispatch(doForgotPassword({
        ...values,
        userPhoneNumber: phoneNumber,
        uspaPasswordhash: values.uspaPasswordhash,
      }));
      setTimeout(() => {
        ComponentsIndicatorToast({status: 'success', message: 'Password updated successfully'});
      }, 500);
      setSubmitting(false);
    } else {
      ComponentsIndicatorToast({status: 'warning', message: 'Phone number invalid'});
    }
  };

  // Show-Hidden New Password
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Show-Hidden Confirm New Password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handletoLogin = () => {
    router.push('/auth/signin');
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <LayoutAuthForgotPassword>
        <div className="font-normal text-gray-900 text-justify">
          <Formik
            onSubmit={handleFormSubmitEditPassword}
            initialValues={initialValuesPassword}
            validationSchema={checkoutSchemaPassword}
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
                  className="pb-5"
                  display="grid"
                  gap="8px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >
                  <FormControl size="small" variant="outlined" sx={{ gridColumn: "span 2" }}>
                      <Select
                        className="mt-5"
                        name="countryCode"
                        value={values.countryCode}
                        onChange={(event) => {eventHandlerEditPassword('countryCode')(event);handleChange(event)}}
                        onBlur={handleBlur}
                        error={touched.countryCode && Boolean(errors.countryCode)}
                        
                      >
                        <MenuItem value="" disabled>
                          Select extension...
                        </MenuItem>
                        {phoneExtension.sort((a:any, b:any) => b.value - a.value)
                          .map((code) => (
                            <MenuItem key={code.value} value={code.value}>
                              {code.label}
                            </MenuItem>
                          ))}
                      </Select>
                      {!!touched.countryCode && !!errors.countryCode && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperTextPassword(touched.countryCode, errors.countryCode, "countryCode")}</span>}
                  </FormControl>
                  
                  <TextField
                    size="small"
                    className="border border-gray-700 mt-5"
                    variant="outlined"
                    type="number"
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={(event) => {eventHandlerEditPassword('userPhoneNumber')(event); handleChange(event);}}
                    value={values.userPhoneNumber}
                    name="userPhoneNumber"
                    error={!!touched.userPhoneNumber && !!errors.userPhoneNumber}
                    helperText={getHelperTextPassword(touched.userPhoneNumber, errors.userPhoneNumber, "phone")}
                    sx={{ gridColumn: "span 2" }}
                    />

                  {/* uspaPasswordhash */}
                  <TextField
                    size="small"
                    fullWidth
                    color="primary"
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
                    label="New Password"
                    onBlur={handleBlur}
                    onChange={(event) => { eventHandlerEditPassword('uspaPasswordhash')(event); handleChange(event) }}
                    value={values.uspaPasswordhash}
                    name="uspaPasswordhash"
                    error={!!touched.uspaPasswordhash && !!errors.uspaPasswordhash}
                    helperText={getHelperTextPassword(touched.uspaPasswordhash, errors.uspaPasswordhash, "password")}
                    sx={{ gridColumn: "span 4" }}
                  />
                  
                  {/* confirmPassword */}
                  <TextField
                    size="small"
                    fullWidth
                    color="primary"
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
                    label="Re-type Password"
                    onBlur={handleBlur}
                    onChange={(event) => { eventHandlerEditPassword('uspaConfirmPasswordhash')(event); handleChange(event) }}
                    value={values.uspaConfirmPasswordhash}
                    name="uspaConfirmPasswordhash"
                    error={!!touched.uspaConfirmPasswordhash && !!errors.uspaConfirmPasswordhash}
                    helperText={getHelperTextPassword(touched.uspaConfirmPasswordhash, errors.uspaConfirmPasswordhash, "confirmPassword")}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>

                <FormControl className="w-1/2">
                  <button
                      type="reset"
                      className="rounded-md text-md bg-white text-[#F33C5D] border-2 border-white hover:border-[#F33C5D] px-4 py-2 text-sm normal-case font-normal">
                      <RotateLeftIcon className="text-[#F33C5D] " width={15} height={15} />{" Cancle"}
                  </button>
                </FormControl>

                <FormControl className="pl-1 w-1/2">
                  <button
                      type="submit"
                      className="rounded-md text-md bg-[#F33C5D] text-white hover:bg-rose-600 border-2 border-[#F33C5D] first-line:bg-opacity-20 px-4 py-2 text-sm normal-case font-normal">
                      <KeyIcon className="text-white " width={15} height={15} />{" Submit"}
                  </button>
                </FormControl>

                <InputLabel
                  className={'text-center text-gray-700 normal-case font-normal mt-5 pb-8'}
                  sx={{ gridColumn: "span 4" }}
                >
                  Remember your account password?<Button
                  className="bg-transparent border:none text-blue-400 hover:text-blue-500 text-sm normal-case font-normal hover:bg-transparent justify-center"
                    onClick={handletoLogin}>
                    <b>Sign In</b>
                  </Button>
                </InputLabel>

              </Form>
            )}
          </Formik>
        </div>
    </LayoutAuthForgotPassword>
    </>
  );
}