import { useState, useEffect, Fragment } from "react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/solid";
import { Menu, Transition, Popover } from "@headlessui/react";
import { useRouter } from "next/router";
import { Box, Button, Card, Typography } from "@mui/material";
import { doLogin } from "@/redux/Actions/Users/reduceActions";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastIndicator from "@/components/Indicator/toast";
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';


export default function HeaderEmployee() {

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
    myName = "Employee";
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
  } else if (roleId == 6) {
    myRole = "Finance";
  }

  // useDispatch
  const dispatch:any = useDispatch();
  
  const handleLogout = async () => {
    await router.push('/auth/signin');
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

  const handleProfile = () => {
    if (roleId == 2) {
      router.push('/manager/profile');
    } else if (roleId == 3) {
      router.push('/ob/profile');
    } else if (roleId == 5) {
      router.push('/staff/profile');
    } else if (roleId == 6) {
      router.push('/finance/profile');
    }
  };

  const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <button
        className="w-full text-left"
        onClick={handleProfile}>
        {"Profile"}
      </button>
    ),
    icon: (<UserOutlined />),
  },
  {
    key: '2',
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
    <div style={{backgroundColor: '#F5F5F5'}}>
      <div className="pr-4 md:pr-4 text-blue-500 hover:text-blue-500 flex justify-end justify-items-center text-center">
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()} className="w-fit">
              <Space>
                <picture>
                <img
                  src={"/images/"+myPhoto}
                  className="rounded-full h-8 border-blue-600 shadow-2xl"
                  alt="profile picture"
                />
              </picture>
              <span className="hidden md:block font-medium text-blue-500 hover:text-blue-500">
                {myName+" | "+myRole}
              </span>
                <DownOutlined height={2} width={2}/>
              </Space>
            </a>
          </Dropdown>
      </div>
    </div>
  );
}