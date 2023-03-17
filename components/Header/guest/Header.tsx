
import Link from "next/link";
import { useRouter } from "next/router";
import { doLogin } from "@/redux/Actions/Users/reduceActions";
import Cookies from "js-cookie";
import ToastIndicator from "@/components/Indicator/toast";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [login,setLogin]=useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

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
    await localStorage.removeItem('PhoneNumber');
    await localStorage.removeItem('UserType');
    await localStorage.removeItem('Email');
    await Cookies.remove('userId');
    await ToastIndicator({status: 'info', message: 'You have logged out'});
  };


  return (
    <>
      <header className="w-full sticky mb-1 shadow">
        <div className="sticky bg-white">
          <div className="relative px-4 mx-auto sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0 ml-10">
                <a href="/" title="" className="flex">
                  <img className="w-40 h-15" src="/img/logoNav.png" alt="" />
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
                <a href="">About</a>
                <a href="">Facility</a>
                <a href="">Hotels</a>
              </div>
              <div className="space-x-2">
                <button 
                className={`${login ? 'items-center justify-center px-6 py-1 text-base font-semibold text-rose-500 transition-all duration-200  border rounded-lg lg:inline-flex border-rose-500 hover:bg-rose-500 hover:text-white':'hidden'}`}
                onClick={handleLogout}>Logout</button>
                <Link
                  href="/auth/signup"
                  title=""
                  className={`${!login ? 'items-center justify-center px-6 py-1 text-base font-semibold text-rose-500 transition-all duration-200 rounded-lg lg:inline-flex':'hidden'}`}
                  role="button"
                >
                  {" "}
                  Sign Up{" "}
                </Link>

                <Link
                  href="/auth/signin"
                  title=""
                  className={`${!login ? 'items-center bg-[#F33C5D] text-white justify-center px-6 py-1 text-base font-semibold transition-all duration-200  rounded-lg lg:inline-flex hover:bg-rose-600':'hidden'}`}
                  role="button"
                >
                  {" "}
                  SignIn{" "}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
