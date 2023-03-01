import { Fragment } from "react";
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { HomeIcon  } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import LoginIcon from '@mui/icons-material/Login';
import { Button, Typography } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import styles from '../../styles/TopBarProfile.module.css';

export default function HeaderLogin({ showNav, setShowNav }: any) {
  const router = useRouter();
  
  const handleLogin = () => {
    router.push('/users/login');
  };
  
  const handleRegist = () => {
    router.push('/users/registerGuest');  
  };

  return (
    <div>
      <div className="bg-white">
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
                      src={"/images/user.png"}
                      className="rounded-full h-8 md:mr-4 border-2 border-orange-900 shadow-xl"
                      alt="profile picture"
                    />
                  </picture>
                  <span className="hidden md:block font-medium text-orange-900">
                    {'Sign Up / Sign In'}
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
                        onClick={handleRegist}>
                        <KeyIcon className="h-3 w-3 mr-2" />{"SignUp"}
                      </Button>
                    </Menu.Item>
                    <Menu.Item >
                      <Button
                        className="shadow-lg pl-3 px-4 py-2 ml-1 mx-auto rounded-md items-center bg-orange-100 text-left text-sm font-medium normal-case text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
                        onClick={handleLogin}>
                        <LoginIcon className="h-4 w-4 mr-2" />{"SignIn"}
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
            <Link href="../.">
              <div
                className={`text-lef text-sm font-medium cursor-pointer flex items-left transition-colors ${router.pathname == "./"
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
            <Link href="./login">
              <div
                className={`text-left text-sm font-medium cursor-pointer flex items-left transition-colors ${router.pathname == "/users/login"
                  ? " text-orange-500"
                  : "text-orange-900 hover:text-orange-500"
                  }`}
              >
                <div>
                  <p>Sign In</p>
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
                    Sign In
                  </Typography>
                </div>
              </div>
          </div>
      </div>
    </div>
  );
}