import { GetServerSideProps, NextPage } from "next";
import React, { useState, useEffect, Fragment } from 'react'
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { doUpdatePhotoUsers, doUserRequest, doUpdateUsers } from "@/redux/Actions/Users/reduceActions";
import { useDispatch, useSelector } from "react-redux";
import LayoutAdmin from "@/components/Layout/LayoutAdmin";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select } from "@mui/material"
import { Dialog, Transition } from '@headlessui/react'
import * as yup from "yup";
import { XMarkIcon } from '@heroicons/react/24/solid';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';
import Input from '@mui/material/Input';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import moment from "moment";
import { Router, useRouter } from "next/router";

interface Props {
  dirs: string[];
}

const EditProfile: NextPage<Props> = ({ dirs }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const dispatchEditPhoto = useDispatch();
  const [profile, setProfile] = useState({
    user_id: null,
    user_full_name: null,
    user_company_name: null,
    user_type: null,
    user_email: null,
    user_phone_number: null,
    uspa_passwordhash: null,
    ubpo_total_points: null,
    ubpo_bonus_type: null,
    usme_memb_name: null,
    usme_points: null,
    usme_type: null,
    usro_role: null,
    uspro_national_id: null,
    uspro_birth: "",
    uspro_job_title: null,
    uspro_marital_status: null,
    uspro_gender: null,
    uspro_addr: null,
    uspro_photo:null
  });
  
  const userMe = useSelector((state: any) => state.usersReducers.user);
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const displayedPayload: any = dispatchEdit(doUserRequest(userId));
    if (displayedPayload.payload == userId) {
      if (userMe) {
        if (userMe.results) {
          const displayedUser: any = userMe.results[0];
          if (displayedUser) {
            if (displayedUser.user_id == userId) {
              setProfile({
                ...profile,
                user_id: displayedUser.user_id,
                user_full_name: displayedUser.user_full_name,
                user_company_name: displayedUser.user_company_name,
                user_type: displayedUser.user_type,
                user_email: displayedUser.user_email,
                user_phone_number: displayedUser.user_phone_number,
                uspa_passwordhash: displayedUser.uspa_passwordhash,
                ubpo_total_points: displayedUser.ubpo_total_points,
                ubpo_bonus_type: displayedUser.ubpo_bonus_type,
                usme_memb_name: displayedUser.usme_memb_name,
                usme_points: displayedUser.usme_points,
                usme_type: displayedUser.usme_type,
                usro_role: displayedUser.usro_role,
                uspro_national_id: displayedUser.uspro_national_id,
                uspro_birth: moment(displayedUser.uspro_birth).format("DD MMMM YYYY"),
                uspro_job_title: displayedUser.uspro_job_title,
                uspro_marital_status: displayedUser.uspro_marital_status,
                uspro_gender: displayedUser.uspro_gender,
                uspro_addr: displayedUser.uspro_addr,
                uspro_photo:displayedUser.uspro_photo
              });
            }
          }
        }
      }
    }
  },[userMe]);

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);
      const userId = localStorage.getItem('userId');
      const isDataUpload = {
        usproId:userId,
        usproPhoto: "Admin_" + selectedFile.name
      }
      
      dispatchEditPhoto(doUpdatePhotoUsers(userId, isDataUpload));
      localStorage.setItem('profilePhotoMe', isDataUpload.usproPhoto);
      dispatchEdit(doUserRequest(userId));
    } catch (error: any) {
      console.log(error.message);
    }
    setUploading(false);
  };

  
  // getHelper for display in form
  const getHelperText = (touched:any, errors:any) => {
    return (touched && errors ? errors : false)
  }

  // phone regExp
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  // check all validasi required & etc
  const checkoutSchema:any = yup.object().shape({
    userFullName: yup.string().required("required"),
    userType: yup.string().required("required"),
    userCompanyName: yup.string().required("required"),
    userEmail: yup.string().email("invalid email").required("required"),
    userPhoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
    uspaPasswordhash: yup.string().required("required"),
    ubpoTotalPoints : yup.number().required("required"),
    ubpoBonusType : yup.string().required("required"),
    usmeMembName : yup.string().required("required"),
    usmePoints : yup.number().required("required"),
    usmeType : yup.string().required("required"), 
    usroRole: yup.number().required("required"),
    usproNationalId: yup.string().required("required"),
    usproBirth : yup.string().required("required"),
    usproJobTitle : yup.string().required("required"),
    usproMaritalStatus : yup.string().required("required"),
    usproGender : yup.string().required("required"),
    usproAddr : yup.number().required("required"),
  });

  // function initialValue field from table users
  const initialValues: any = {
    userId:null,
    userFullName: "",
    userType:"",
    userCompanyName: "",
    userEmail: "",
    userPhoneNumber: "",
    uspaPasswordhash: "",
    ubpoTotalPoints : 0,
    ubpoBonusType : "",
    usmeMembName : "",
    usmePoints : 0,
    usmeType : "", 
    usroRole: null,
    usproNationalId: "",
    usproBirth : "",
    usproJobTitle : "",
    usproMaritalStatus : "",
    usproGender : "",
    usproAddr : 1
  };
 
  const dispatchEdit = useDispatch();

  // useState : modals Edit user
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  //  function : close modals Edit user
  function closeModalEdit() {
    setIsOpenEdit(false)
  }

  // define useState API POST users
  let [DataUserEdit, setDataUserEdit] = useState({
    userId: null,
    userFullName: null,
    userCompanyName: null,
    userType: null,
    userEmail: null,
    userPhoneNumber: null,
    uspaPasswordhash: null,
    ubpoTotalPoints: null,
    ubpoBonusType: null,
    usmeMembName: null,
    usmePoints: null,
    usmeType: null,
    usroRole: null,
    usproNationalId: null,
    usproBirth: "",
    usproJobTitle: null,
    usproMaritalStatus: null,
    usproGender: null,
    usproAddr: 1
  })

  //  function : open modals Edit user
  function openModalEdit() {
    setIsOpenEdit(true);
  }
  
  const user = useSelector((state: any) => state.usersReducers.user);

  // function handler API PUT user
  const handleEdit = () => {
    const userId = localStorage.getItem('userId');
    const displayedPayload:any = dispatchEdit(doUserRequest(userId));
    if (displayedPayload.payload == userId) {
      if (user) {
        if (user.results) {
          const displayedUser:any = user.results[0];
          if (displayedUser) {
            if (displayedUser.user_id == userId) {
              openModalEdit();
              const dateBirth = moment(displayedUser.uspro_birth).format("YYYY-MM-DD");
              setDataUserEdit({
                ...DataUserEdit,
                userId: displayedUser.user_id,
                userFullName: displayedUser.user_full_name,
                userCompanyName: displayedUser.user_company_name,
                userType: displayedUser.user_type,
                userEmail: displayedUser.user_email,
                userPhoneNumber: displayedUser.user_phone_number,
                ubpoTotalPoints: displayedUser.ubpo_total_points,
                ubpoBonusType: displayedUser.ubpo_bonus_type,
                usmeMembName: displayedUser.usme_memb_name,
                usmePoints: displayedUser.usme_points,
                usmeType: displayedUser.usme_type,
                usroRole: displayedUser.role_id,
                usproNationalId: displayedUser.uspro_national_id,
                usproBirth: dateBirth,
                usproJobTitle: displayedUser.uspro_job_title,
                usproMaritalStatus: displayedUser.uspro_marital_status,
                usproGender: displayedUser.uspro_gender,
                usproAddr: displayedUser.uspro_addr
              });
            }
          }
        }
      }
    }
  }
  
  // function handler API PUT users
  const eventHandlerEdit = (data: any) => (event: any) => {
      setDataUserEdit({...DataUserEdit, [data] : event.target.value});
  }

  const dispatch = useDispatch();
  const routerEdit = useRouter()

  // function handle submit form edit users (API POST users)
  const handleFormSubmitEdit = (values: any, { setSubmitting }: any) => {
    const userId = localStorage.getItem('userId');
    setSubmitting(true);
    dispatchEdit(doUpdateUsers(userId, values));
    setTimeout(() => {
      setIsOpenEdit(false);
      localStorage.setItem('userFullNameNew', values.userFullName);
      routerEdit.reload();
      dispatch(doUserRequest(userId));
      if (values) {
        if (values.userId == userId) {
          const dateBirth = moment(values.usproBirth).format("YYYY-MM-DD");
          setProfile({
            ...profile,
            user_id: values.userId,
            user_full_name: values.userFullName,
            user_company_name: values.userCompanyName,
            user_type: values.userType,
            user_email: values.userEmail,
            user_phone_number: values.userPhoneNumber,
            uspa_passwordhash: values.uspaPasswordhash,
            ubpo_total_points: values.ubpoTotalPoints,
            ubpo_bonus_type: values.ubpoBonusType,
            usme_memb_name: values.usmeMembName,
            usme_points: values.usmePoints,
            usme_type: values.usmeType,
            usro_role: values.usroRole,
            uspro_national_id: values.usproNationalId,
            uspro_birth: moment(values.usproBirth).format("DD MMMM YYYY"),
            uspro_job_title: values.usproJobTitle,
            uspro_marital_status: values.usproMaritalStatus,
            uspro_gender: values.usproGender,
            uspro_addr: values.usproAddr,
            uspro_photo:values.usproPhoto
          });
          setDataUserEdit({
            ...DataUserEdit,
            userId: values.userId,
            userFullName: values.userFullName,
            userCompanyName: values.userCompanyName,
            userType: values.userType,
            userEmail: values.userEmail,
            userPhoneNumber: values.userPhoneNumber,
            ubpoTotalPoints: values.ubpoTotalPoints,
            ubpoBonusType: values.ubpoBonusType,
            usmeMembName: values.usmeMembName,
            usmePoints: values.usmePoints,
            usmeType: values.usmeType,
            usroRole: values.roleId,
            usproNationalId: values.usproNationalId,
            usproBirth: dateBirth,
            usproJobTitle: values.usproJobTitle,
            usproMaritalStatus: values.usproMaritalStatus,
            usproGender: values.usproGender,
            usproAddr: 1
          });
        }
      }
    }, 500);
    setSubmitting(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  return (
    <>
      <LayoutAdmin>
        <div className="overflow-y-auto">
          <p className="text-gray-700 text-3xl mb-6 font-bold">Profile</p>
          <div className="w-full md:w-full p-3">
          <Box className="grid col-1 shadow-md rounded-md bg-white">
            <label className="pt-3 text-center font-bold">Profile Me</label>  
            <hr className="mt-3"/>
            <Box className="max-w-4xl mx-auto pt-3 space-y-3 pb-3">
              <label>
                <input
                  type="file"
                  hidden
                  onChange={({ target }) => {
                    if (target.files) {
                      const file = target.files[0];
                      setSelectedImage(URL.createObjectURL(file));
                      setSelectedFile(file);
                    }
                  }}
                />
                <Box className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                  {selectedImage ? (
                    <img src={selectedImage} alt="" />
                  ) : (
                    <img src={"/images/"+profile.uspro_photo}/>
                  )}
                </Box>
                </label>
                {selectedImage ? (
                  <button
                    className="shadow-lg w-40 px-4 py-2 mx-auto rounded-md items-center bg-orange-100 text-center text-sm font-medium normal-case text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
                    onClick={handleUpload}
                    disabled={uploading}
                    style={{ opacity: uploading ? ".5" : "1" }}>
                      <p>{uploading ? "Uploading.." : "Upload"}</p>
                  </button>
                ) : (
                  <button
                    className="shadow-lg w-40 px-4 py-2 mx-auto rounded-md items-center bg-orange-100 text-center text-sm font-medium normal-case text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
                    onClick={handleUpload}
                    disabled={true}
                    style={{ opacity: uploading ? ".5" : "1" }}>
                      <p>{uploading ? "Uploading.." : "Upload"}</p>
                  </button>
                )}
              <hr className="mt-3" />
              <button
                className="shadow-lg w-40 px-4 py-2 mx-auto rounded-md items-center bg-orange-100 text-center text-sm font-medium normal-case text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
                onClick={() => handleEdit()}
                >
                  <p>{"Edit Profile"}</p>
              </button>
              </Box>
              <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-3">
              <Box className="grid col-1 bg-white h-50"> 
                <Box className="max-w-4xl pl-5 pr-5 pt-3 space-y-3 pb-3">
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Full Name</span>
                    <span className="pl-10 text-left w-50">{profile.user_full_name?profile.user_full_name:"None"}</span>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Birth</span>
                    <span className="pl-20 text-left w-50">{profile.uspro_birth?profile.uspro_birth:"None"}</span>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Gender</span>
                    <span className="pl-16 text-left w-50">
                      {
                        profile.uspro_gender === "M" ? "Male" :
                        profile.uspro_gender === "F" ? "Female" :
                        "None"
                      }
                    </span>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Status</span>
                    <span className="pl-16 text-left w-50">&nbsp;&nbsp;
                      {
                        profile.uspro_marital_status === "S" ? "Single" :
                        profile.uspro_marital_status === "M" ? "Marrige" :
                        "None"
                      }
                    </span>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Email</span>
                    <span className="pl-20 text-left w-50">{profile.user_email?profile.user_email:"None"}</span>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Phone</span>
                    <span className="pl-16 text-left w-50">&nbsp;&nbsp;{profile.user_phone_number?profile.user_phone_number:"None"}</span>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">National ID</span>
                    <span className="pl-8 text-left w-50">{profile.uspro_national_id?profile.uspro_national_id:"None"}</span>
                  </div>
                  <hr className="mt-3" />
                </Box>
              </Box>
            </div>

            <div className="w-full md:w-1/2 p-3">
              <Box className="grid col-1 bg-white h-50"> 
                <Box className="max-w-4xl pl-5 pr-5 pt-3 space-y-3 pb-3">
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Company</span>
                    <span className="pl-10 text-left w-50">&nbsp;&nbsp;{profile.user_company_name?profile.user_company_name:"None"}</span>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Type</span>
                    <span className="pl-20 text-left w-50">&nbsp;
                      {
                        profile.user_type === "T" ? "Travel" :
                        profile.user_type === "C" ? "Company" :
                        profile.user_type === "I" ? "Individual" :
                        "None"
                      }
                    </span>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Memb. Type</span>
                    <span className="pl-6 text-left w-50">&nbsp;
                      {
                        profile.usme_type === "default" ? "Default" :
                        profile.usme_type === "expired" ? "Expired" :
                        "None"
                      }
                    </span>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Memb. Name</span>
                    <span className="pl-4 text-left w-50">&nbsp;
                      {
                        profile.usme_memb_name === "SILVER" ? "SILVER" :
                        profile.usme_memb_name === "GOLD" ? "GOLD" :
                        profile.usme_memb_name === "VIP" ? "VIP" :
                        profile.usme_memb_name === "WIZARD" ? "WIZARD" :
                        "None"
                      }
                    </span>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Memb. Points</span>
                    <span className="pl-4 text-left w-50">&nbsp;{profile.usme_points?profile.usme_points:"None"}</span>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Bonus Type</span>
                    <span className="pl-8 text-left w-50">&nbsp;
                      {
                        profile.ubpo_bonus_type === "R" ? "Rating" :
                        profile.ubpo_bonus_type === "P" ? "Promote" :
                        "None"
                      }
                    </span>
                  </div>
                  <hr className="mt-3" />
                  <div className="flex flex-wrap">
                    <span className="text-left w-50 font-bold">Total Bonus</span>
                    <span className="pl-8 text-left w-50">&nbsp;{profile.ubpo_total_points?profile.ubpo_total_points:"None"}</span>
                  </div>
                  <hr className="mt-3" />
                </Box>
              </Box>
            </div>            
          </div>
          </Box>
        </div>
          
        </div>
        
        <Transition appear show={isOpenEdit} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModalEdit}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform max-h-96 overflow-y-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                    className="text-lg font-medium leading-6 text-black"
                    >
                      Edit User
                    </Dialog.Title>
                    <br></br>
                    <Formik
                      onSubmit={handleFormSubmitEdit}
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
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                          >
                          <Input
                            hidden
                            type='hidden'
                            value={values.userId=DataUserEdit.userId}
                            />

                            {/* FullName */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Full Name"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('userFullName')(event); handleChange(event)}}
                              value={values.userFullName?values.userFullName:values.userFullName=DataUserEdit.userFullName}                            
                              name="userFullName"
                              error={!!touched.userFullName && !!errors.userFullName}
                              helperText={getHelperText(touched.userFullName, errors.userFullName)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproBirth */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="date"
                              label="Birth"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('usproBirth')(event); handleChange(event)}}
                              value={values.usproBirth?values.usproBirth:values.usproBirth=DataUserEdit.usproBirth}
                              name="usproBirth"
                              error={!!touched.usproBirth && !!errors.usproBirth}
                              helperText={getHelperText(touched.usproBirth, errors.usproBirth)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproGender */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usproGender" color="warning">Gender</InputLabel>
                              <Select
                                placeholder="Select gender ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Gender"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerEdit('usproGender')(event); handleChange(event)}}
                                value={values.usproGender?values.usproGender:values.usproGender=DataUserEdit.usproGender}
                                name="usproGender"
                                error={!!touched.usproGender && !!errors.usproGender}
                                // helperText={getHelperText(touched.usproGender, errors.usproGender)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='M'>Male</MenuItem>
                                <MenuItem value='F'>Female</MenuItem>
                            </Select>
                            {!!touched.usproGender && !!errors.usproGender && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usproGender, errors.usproGender)}</span>}
                            </FormControl>

                            {/* usproMaritalStatus */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usproMaritalStatus" color="warning">Marital Status</InputLabel>
                              <Select
                                placeholder="Select status ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Marital Status"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerEdit('usproMaritalStatus')(event); handleChange(event)}}
                                value={values.usproMaritalStatus?values.usproMaritalStatus:values.usproMaritalStatus=DataUserEdit.usproMaritalStatus}
                                name="usproMaritalStatus"
                                error={!!touched.usproMaritalStatus && !!errors.usproMaritalStatus}
                                // helperText={getHelperText(touched.usproMaritalStatus, errors.usproMaritalStatus)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='S'>Single</MenuItem>
                                <MenuItem value='M'>Married</MenuItem>
                            </Select>
                            {!!touched.usproMaritalStatus && !!errors.usproMaritalStatus && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usproMaritalStatus, errors.usproMaritalStatus)}</span>}
                            </FormControl>
                            
                            {/* UserType */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }} error={!!touched.userType && !!errors.userType}>
                              <InputLabel id="userType" color="warning">Type</InputLabel>
                              <Select
                                placeholder="Select type ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Type"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerEdit('userType')(event); handleChange(event)}}
                                value={values.userType?values.userType:values.userType=DataUserEdit.userType}
                                name="userType"
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='T'>Travel Agent</MenuItem>
                                <MenuItem value='C'>Company</MenuItem>
                                <MenuItem value='I'>Individual</MenuItem>
                            </Select>
                            {!!touched.userType && !!errors.userType && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.userType, errors.userType)}</span>}
                            </FormControl>

                            {/* Email */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="email"
                              label="Email"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('userEmail')(event); handleChange(event)}}
                              value={values.userEmail?values.userEmail:values.userEmail=DataUserEdit.userEmail}
                              name="userEmail"
                              error={!!touched.userEmail && !!errors.userEmail}
                              helperText={getHelperText(touched.userEmail, errors.userEmail)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* uspaPasswordhash */}
                            <TextField
                              color="warning"
                              fullWidth
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
                              onChange={(event) => {eventHandlerEdit('uspaPasswordhash')(event); handleChange(event)}}
                              value={values.uspaPasswordhash}
                              name="uspaPasswordhash"
                              error={!!touched.uspaPasswordhash && !!errors.uspaPasswordhash}
                              helperText={getHelperText(touched.uspaPasswordhash, errors.uspaPasswordhash)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* PhoneNumber */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Phone Number"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('userPhoneNumber')(event); handleChange(event)}}
                              value={values.userPhoneNumber?values.userPhoneNumber:values.userPhoneNumber=DataUserEdit.userPhoneNumber}
                              name="userPhoneNumber"
                              error={!!touched.userPhoneNumber && !!errors.userPhoneNumber}
                              helperText={getHelperText(touched.userPhoneNumber, errors.userPhoneNumber)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproNationalId */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="National ID"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('usproNationalId')(event); handleChange(event)}}
                              value={values.usproNationalId?values.usproNationalId:values.usproNationalId=DataUserEdit.usproNationalId}
                              name="usproNationalId"
                              error={!!touched.usproNationalId && !!errors.usproNationalId}
                              helperText={getHelperText(touched.usproNationalId, errors.usproNationalId)}
                              sx={{ gridColumn: "span 4" }}
                            />
                            
                            {/* usproAddr */}

                            {/* CompanyName */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Company Name"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('userCompanyName')(event); handleChange(event)}}
                              value={values.userCompanyName?values.userCompanyName:values.userCompanyName=DataUserEdit.userCompanyName}
                              name="userCompanyName"
                              error={!!touched.userCompanyName && !!errors.userCompanyName}
                              helperText={getHelperText(touched.userCompanyName, errors.userCompanyName)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproJobTitle */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Job Title"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('usproJobTitle')(event); handleChange(event)}}
                              value={values.usproJobTitle?values.usproJobTitle:values.usproJobTitle=DataUserEdit.usproJobTitle}
                              name="usproJobTitle"
                              error={!!touched.usproJobTitle && !!errors.usproJobTitle}
                              helperText={getHelperText(touched.usproJobTitle, errors.usproJobTitle)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usmeType */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usmeType" color="warning">Member Type</InputLabel>
                              <Select
                                placeholder="Select Type ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Member Type"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerEdit('usmeType')(event); handleChange(event)}}
                                value={values.usmeType?values.usmeType:values.usmeType=DataUserEdit.usmeType}
                                name="usmeType"
                                error={!!touched.usmeType && !!errors.usmeType}
                                // helperText={getHelperText(touched.usmeType, errors.usmeType)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='default'>default</MenuItem>
                                <MenuItem value='expired'>expired</MenuItem>
                            </Select>
                            {!!touched.usmeType && !!errors.usmeType && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usmeType, errors.usmeType)}</span>}
                            </FormControl>

                            {/* usmeMembName */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usmeMembName" color="warning">Member Name</InputLabel>
                              <Select
                                placeholder="Select Name ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Member Name"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerEdit('usmeMembName')(event); handleChange(event)}}
                                value={values.usmeMembName?values.usmeMembName:values.usmeMembName=DataUserEdit.usmeMembName}
                                name="usmeMembName"
                                error={!!touched.usmeMembName && !!errors.usmeMembName}
                                // helperText={getHelperText(touched.usmeMembName, errors.usmeMembName)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='SILVER'>SILVER</MenuItem>
                                <MenuItem value='GOLD'>GOLD</MenuItem>
                                <MenuItem value='VIP'>VIP</MenuItem>
                                <MenuItem value='WIZARD'>WIZARD</MenuItem>
                            </Select>
                            {!!touched.usmeMembName && !!errors.usmeMembName && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usmeMembName, errors.usmeMembName)}</span>}
                            </FormControl>

                            {/* usmePoints */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Member Points"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('usmePoints')(event); handleChange(event)}}
                              value={values.usmePoints?values.usmePoints:values.usmePoints=DataUserEdit.usmePoints}
                              name="usmePoints"
                              error={!!touched.usmePoints && !!errors.usmePoints}
                              helperText={getHelperText(touched.usmePoints, errors.usmePoints)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* ubpoBonusType */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="ubpoBonusType" color="warning">Bonus Type</InputLabel>
                              <Select
                                placeholder="Select type ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Bonus Type"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerEdit('ubpoBonusType')(event); handleChange(event)}}
                                value={values.ubpoBonusType?values.ubpoBonusType:values.ubpoBonusType=DataUserEdit.ubpoBonusType}
                                name="ubpoBonusType"
                                error={!!touched.ubpoBonusType && !!errors.ubpoBonusType}
                                // helperText={getHelperText(touched.ubpoBonusType, errors.ubpoBonusType)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='R'>Rating</MenuItem>
                                <MenuItem value='P'>Promote</MenuItem>
                            </Select>
                            {!!touched.ubpoBonusType && !!errors.ubpoBonusType && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.ubpoBonusType, errors.ubpoBonusType)}</span>}
                            </FormControl>

                            {/* ubpoTotalPoints */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Total Bonus Points"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('ubpoTotalPoints')(event); handleChange(event)}}
                              value={values.ubpoTotalPoints?values.ubpoTotalPoints:values.ubpoTotalPoints=DataUserEdit.ubpoTotalPoints}
                              name="ubpoTotalPoints"
                              error={!!touched.ubpoTotalPoints && !!errors.ubpoTotalPoints}
                              helperText={getHelperText(touched.ubpoTotalPoints, errors.ubpoTotalPoints)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usroRole */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usroRole" color="warning">Role</InputLabel>
                              <Select
                                placeholder="Select role ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Role"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerEdit('usroRole')(event); handleChange(event)}}
                                value={values.usroRole?values.usroRole:values.usroRole=DataUserEdit.usroRole}
                                name="usroRole"
                                error={!!touched.usroRole && !!errors.usroRole}
                                // helperText={getHelperText(touched.usroRole, errors.usroRole)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value={1}>Guest</MenuItem>
                                <MenuItem value={2}>Manager</MenuItem>
                                <MenuItem value={3}>Office Boy</MenuItem>
                                <MenuItem value={4}>Admin</MenuItem>
                                <MenuItem value={5}>User</MenuItem>
                            </Select>
                            {!!touched.usroRole && !!errors.usroRole && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usroRole, errors.usroRole)}</span>}
                            </FormControl>
                            
                          </Box>

                          <Box display="flex" justifyContent="center" mt="20px">
                            <Box display="flex">
                              <Button
                                type="reset"
                                color="warning"
                                className="rounded-md bg-yellow-100 text-yellow-500 border-warning-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <RefreshIcon width={15} height={15}/>
                              </Button>
                            </Box>
                            <Box display="flex" pl="100px">
                              <Button
                                type="submit"
                                color="success"
                                className="rounded-md bg-green-100 text-green-500 border-warning-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <SaveIcon width={15} height={15} />
                              </Button>
                            </Box>
                            <Box display="flex" pl="100px">
                              <Button
                                onClick={closeModalEdit}
                                type="button"
                                color="error"
                                className="rounded-md bg-red-100 text-red-500 border-error-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <XMarkIcon width={20} height={20}/>
                              </Button>
                            </Box>
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </LayoutAdmin>
      </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props = { dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), "/public/images"));
    props.dirs = dirs as any;
    return { props };
  } catch (error) {
    return { props };
  }


};

export default EditProfile;