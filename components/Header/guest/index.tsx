import * as React from 'react';
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import ToastIndicator from "@/components/Indicator/toast";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Dropdown, MenuProps, Space, Typography } from "antd";
import { BookOutlined, DownOutlined, IdcardOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { doLogin } from '@/redux/Actions/Users/reduceActions';
import Link from 'next/link';
import LoginIcon from "@mui/icons-material/Login";
import KeyIcon from '@mui/icons-material/Key';

export default function HeaderGuest() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [login, setLogin]: any = useState(false)
  const [userFullName, setFullName]: any = useState(null);
  const [userPhoto, setUserPhoto]: any = useState(null);
  const [profilePhotoMe, setProfilePhotoMe]: any = useState(null);
  const [profileNameMe, setProfileNameMe]: any = useState(null);

  useEffect(() => {
    const token: any = localStorage.getItem('token');
    setFullName(localStorage.getItem('userFullName'));
    setUserPhoto(localStorage.getItem('userPhoto'));
    setProfilePhotoMe(localStorage.getItem('profilePhotoMe'));
    setProfileNameMe(localStorage.getItem('userFullNameNew'));
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  let myPhoto: any;
  if (profilePhotoMe) {
    myPhoto = profilePhotoMe;
  } else if (userPhoto != 'null') {
    myPhoto = userPhoto;
  } else {
    myPhoto = "user.png";
  }

  let myName: any;
  if (profileNameMe) {
    myName = profileNameMe;
  } else if (userFullName != 'null') {
    myName = userFullName;
  } else {
    myName = "Guest";
  }

  const handleLogout = async () => {
    await dispatch(doLogin());
    await localStorage.removeItem('token');
    await localStorage.removeItem('roleId');
    await localStorage.removeItem('userId');
    await localStorage.removeItem('userFullName');
    await localStorage.removeItem('profilePhotoMe');
    await localStorage.removeItem('userFullNameNew');
    await localStorage.removeItem('userPhoto');
    await localStorage.removeItem('PhoneNumber');
    await localStorage.removeItem('UserType');
    await localStorage.removeItem('Email');
    await Cookies.remove('userId');
    await router.reload();
    await ToastIndicator({ status: 'info', message: 'You have logged out' });
  };

  const handleProfile = () => {
    router.push('/guest/profile');
  };

  const handleAccount = () => {
    router.push('/guest/account');
  };

  const handleBooking = () => {
    router.push('/guest/historyBooking');
  };

  const handleTransaction = () => {
    router.push('/guest/transaction');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button
          className="w-full text-left"
          onClick={handleProfile}>
          {"My Profile"}
        </button>
      ),
      icon: (<UserOutlined />),
    },
    {
      key: '2',
      label: (
        <button
          className="w-full text-left"
          onClick={handleAccount}>
          {"My Account"}
        </button>
      ),
      icon: (<IdcardOutlined />),
    },
    {
      key: '3',
      label: (
        <button
          className="w-full text-left"
          onClick={handleBooking}>
          {"My Booking"}
        </button>
      ),
      icon: (<BookOutlined />),
    },
    {
      key: '4',
      label: (
        <button
          className="w-full text-left"
          onClick={handleTransaction}>
          {"My Transaction"}
        </button>
      ),
      icon: (<BookOutlined />),
    },
    {
      key: '5',
      label: (
        <button
          className="w-full text-left hover:text-red-500 hover:outline-none"
          onClick={handleLogout}>
          {"Sign Out"}
        </button>
      ),
      icon: (<LogoutOutlined />),
    },
  ];


  return (
    <>
      <header className="w-full sticky mb-1 shadow">
        <div className="relative bg-white">
          <div className="relative pl-6">
            <nav className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0 ml-10">
                <a href="/" title="" className="flex">
                  <img className="w-60 h-15 " src="/assets/logo-realtaHotel.png" alt="" />
                </a>
              </div>
              <button
                type="button"
                className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-800 hover:bg-gray-800"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              <div className="hidden lg:flex lg:justify-center lg:items-center lg:space-x-12">
                <Link href={'/'}>
                  <h1 className="text-rose-500 font-bold">Home</h1>
                </Link>
                <Link className='hover:text-current' href="/.#hotels">Hotels</Link>
                <Link className='hover:text-current' href="/.#facility">Facility</Link>
                <Link className='hover:text-current' href="/.#about">About</Link>
              </div>
              <div className={`${login ? "pr-16 md:pr-16 text-pink-500 hover:text-pink-500 flex justify-end justify-items-center text-center" : "hidden"}`}>
                <Dropdown menu={{ items }} className="hover:text-[#F33C5D]">
                  <a onClick={(e) => e.preventDefault()} className="w-fit">
                    <Space>
                      <picture>
                        <img
                          src={"/images/" + myPhoto}
                          className="rounded-full h-8 border-pink-600 shadow-2xl"
                          alt="profile picture"
                        />
                      </picture>
                      <span className="hidden md:block font-medium text-[#F33C5D]">
                        {"Hi, " + myName}
                      </span >
                      <DownOutlined height={2} width={2} className="hover:text-[#F33C5D]"/>
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className={`pt-2 mr-16 ${!login ? "space-x-2" : "hidden"}`}>
                <a
                  href="/auth/signupGuest"
                  title=""
                  className="hover:text-rose-500 first-line:items-center justify-center hidden px-6 py-1 text-base font-semibold text-rose-500 transition-all duration-200  border border-transparent rounded-lg lg:inline-flex hover:border-rose-500"
                  role="button"
                ><KeyIcon className="text-[#F33C5D]" width={2} height={2} />&nbsp;{"Sign"}&nbsp;{"Up"}</a>

                <a
                  href="/auth/signin"
                  title=""
                  className="hover:text-white items-center bg-[#F33C5D] text-white justify-center hidden px-6 py-1 text-base font-semibold transition-all duration-200  rounded-lg lg:inline-flex hover:bg-rose-600"
                  role="button"
                ><LoginIcon className="text-white " width={2} height={2} />&nbsp;{"Sign"}&nbsp;{"In"}</a>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

