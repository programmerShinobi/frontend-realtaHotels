import { useState, useEffect, Fragment } from "react";
import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { HomeIcon  } from "@heroicons/react/24/solid";
import { Menu, Transition, Popover } from "@headlessui/react";
import { useRouter } from "next/router";
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, Card, Typography } from "@mui/material";
import { doLogin } from "@/redux/Actions/Users/reduceActions";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastIndicator from "../../../Indicator/ToastIndicator";
import Link from "next/link";
import styles from '../../../../styles/TopBarProfile.module.css';

export default function HeaderAppUsers({ showNav, setShowNav }: any) {
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  const router = useRouter();
  const userFullName: any = localStorage.getItem('userFullName');
  const roleId: any = localStorage.getItem('roleId');
  const userPhoto: any = localStorage.getItem('userPhoto');
  const profilePhotoMe: any = localStorage.getItem('profilePhotoMe');
  const profileNameMe: any = localStorage.getItem('userFullNameNew');

  let myPhoto: any; 
  if (profilePhotoMe) {
    myPhoto = profilePhotoMe;
  } else if (userPhoto !='null') { 
    myPhoto = userPhoto;
  } else {
    myPhoto = "user.png";
  }

  let myName: any; 
  if (profileNameMe) {
    myName = profileNameMe;
  } else if (userFullName != 'null') { 
    myName = userFullName;
  }  else {
    myName = "Unknown";
  }

  let myRole: any; 
  if (roleId == 1) {
    myRole = "Guest";
  } else if (roleId == 2) {
    myRole = "Manager";
  } else if (roleId == 3) {
    myRole = "Office-Boy";
  } else if (roleId == 4) {
    myRole = "Admin";
  } else if (roleId == 5) {
    myRole = "Staff";
  }

  // useDispatch
  const dispatch:any = useDispatch();
  
  const handleLogout = async () => {
    await router.push('/users/signin');
    await dispatch(doLogin());
    await localStorage.removeItem('token');
    await localStorage.removeItem('roleId');
    await localStorage.removeItem('userId');
    await localStorage.removeItem('userFullName');
    await localStorage.removeItem('profilePhotoMe');
    await localStorage.removeItem('userFullNameNew');
    await localStorage.removeItem('userPhoto');
    await Cookies.remove('userId');
    await ToastIndicator({status: 'info', message: 'You have logged out'});
  };

  const handleEditProfile = () => {
    router.push('/app/users/profile');
  };

  return (
    <div>
      <div className="bg-white ">
        <div className="shadow-lg fixed text-orange-900 hover:bg-orange-100 bg-orange-100 hover:text-orange-500 w-full h-16 mb-16 flex justify-between items-center transition-all duration-[400ms]">
          <div className="pl-8">
            <div className="flex justify-center mt-6 mb-5">
              <picture>
                <img
                  className="w-56 h-auto"
                  src="/assets/logo-realtaHotel.png"
                  alt="logo"
                />
              </picture>
            </div>
          </div>
          <div className="flex items-center pr-8 md:pr-8">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center items-center">
                  <picture>
                    <img
                      src={"/images/"+myPhoto}
                      className="rounded-full h-8 md:mr-4 border-2 border-orange-900 shadow-xl"
                      alt="profile picture"
                    />
                  </picture>
                  <span className="hidden md:block font-medium text-orange-900 pr-2">
                    {myName+" | "+myRole}
                  </span>
                  <ChevronDownIcon className="ml-2 h-4 w-4 text-orange-900" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform scale-95"
                enterTo="transform scale-100"
                leave="transition ease-in duration=75"
                leaveFrom="transform scale-100"
                leaveTo="transform scale-95"
              >
                <Menu.Items className="absolute right-0 w-auto z-50 mt-2 origin-top-right bg-orange-900 rounded-md shadow-2xl">
                  <div className="p-1 flex flex-col-left">
                    <Menu.Item>
                      <Button
                        className="shadow-lg pl-3 px-4 py-2 mx-auto rounded-md items-center bg-orange-100 text-left text-sm font-medium normal-case text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
                        onClick={handleEditProfile}>
                        <UserIcon className="h-4 w-4 mr-2" />{"Profile"}
                      </Button>
                    </Menu.Item>
                    <Menu.Item >
                      <Button
                        className="shadow-lg pl-3 px-4 py-2 ml-1 mx-auto rounded-md items-center bg-orange-100 text-left text-sm font-medium normal-case text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
                        onClick={handleLogout}>
                        <LogoutIcon className="h-4 w-4 mr-2" />{"Logout"}
                      </Button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="pb-16">
        </div>
      </div>
      <div className="static w-full h-8 pt-2 justify-center ">
        <div className="flex flex-row">
          <div className="ml-10 mr-5 text-orange-900 w-5">
            <HomeIcon className="h-5 w-5 " />
          </div>
          <div className="w-auto">
            <Link href="#">
              <div
                className={`text-lef text-sm font-medium cursor-pointer flex items-left transition-colors ${router.pathname == "/app"
                  ? " text-orange-500"
                  : "text-orange-900 hover:text-orange-500"
                  }`}
              >
                <div>
                  <p>Home</p>
                </div>
                <ChevronRightIcon
                  className={`h-5 w-5 text-orange-500`}
                />
              </div>
            </Link>
          </div>
          <div className=" w-auto">
            <Link href="#">
              <div
                className={`text-left text-sm font-medium cursor-pointer flex items-left transition-colors ${router.pathname == "/app/users/profile"
                  ? " text-orange-500"
                  : "text-orange-900 hover:text-orange-500"
                  }`}
              >
                <div>
                  <p>Profile</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <hr className="w-full shadow-lg bg-orange-900 mt-2 h-1"/>
      <div className="static w-full h-10  bg-white">
        <div className="w-auto ml-10">
          <div className={`
            text-left flex items-left transition-colors
              text-orange-900 hover:text-orange-500
            `}>
              <div>
                <Typography className={styles.textTitleInProfile}>
                  My Profile
                </Typography>
              </div>
            </div>
          </div>
      </div>
      <div
        className={`fixed w-full h-16 pb-4 flex justify-between items-center transition-all duration-[400ms] ${showNav ? "pl-56" : ""
          }`}
      >
        <div className={`mt-4 ${isMobile ? "pl-4" : "md:pl-4"} `}>
          <div className="card bg-white rounded-md shadow-xl" >
          <Bars3CenterLeftIcon
            className="h-8 w-8 text-gray-700 cursor-pointer"
            onClick={() => setShowNav(!showNav)}
          />
          </div>
        </div>
      </div>
    </div>
  );
}