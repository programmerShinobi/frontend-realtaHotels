import { forwardRef } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const ComponentsSidebarAppUsersProfile = forwardRef(({ showNav }:any, ref:any) => {
  const router = useRouter();
  return (
    <div ref={ref} className="fixed w-56 mt-4 bg-white shadow-lg h-full overflow-y-auto rounded-tr-md">
      <div className="flex flex-col mt-4 mb-4 ">
        {/* Menu */}
        <div className="w-full px-4 mb-3">
          <div className="mx-auto w-full max-w-md rounded-md bg-white p-1">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="items-center flex w-full justify-between rounded-md bg-orange-100 px-4 py-2 text-left text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75 shadow-lg">
                    <div className="mr-2">
                      <MenuRoundedIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p>Menus</p>
                    </div>
                    <ChevronRightIcon
                      className={`${open ? 'rotate-90 transform' : ''
                        } h-4 w-4 text-orange-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-2 w-full">
                    <Link   href="/app/users/profile">
                      <div
                        className={`shadow-2lg pl-3 px-4 py-2 mx-auto rounded-md text-left text-sm font-medium cursor-pointer flex items-center transition-colors ${router.pathname == "/app/users/profile"
                          ? "bg-orange-100 text-orange-500"
                          : "text-orange-900 hover:bg-orange-100 hover:text-orange-500"
                          }`}
                      >
                        <ChevronUpIcon
                          className={`${open ? 'rotate-90 transform' : ''
                            } h-5 w-5 text-orange-500`}
                        />
                        <div>
                          <p>My Profile</p>
                        </div>
                      </div>
                    </Link>
                  </Disclosure.Panel>
                  <Disclosure.Panel className="pt-2 w-full">
                    <Link href="#">
                      <div
                        className={`shadow-2lg pl-3 px-4 py-2 mx-auto rounded text-left text-sm font-medium cursor-pointer flex items-center transition-colors ${router.pathname == "/app/users/booking"
                          ? "bg-orange-100 text-orange-500"
                          : "text-orange-900 hover:bg-orange-100 hover:text-orange-500"
                          }`}
                      >
                        <ChevronUpIcon
                          className={`${open ? 'rotate-90 transform' : ''
                            } h-5 w-5 text-orange-500`}
                        />
                        <div>
                          <p>My Booking</p>
                        </div>
                      </div>
                    </Link>
                  </Disclosure.Panel>
                  <Disclosure.Panel className="pt-2 w-full">
                    <Link href="#">
                      <div
                        className={`shadow-2lg pl-3 px-4 py-2 mx-auto rounded text-left text-sm font-medium cursor-pointer flex items-center transition-colors ${router.pathname == "/app/users/accounts"
                          ? "bg-orange-100 text-orange-500"
                          : "text-orange-900 hover:bg-orange-100 hover:text-orange-500"
                          }`}
                      >
                        <ChevronUpIcon
                          className={`${open ? 'rotate-90 transform' : ''
                            } h-5 w-5 text-orange-500`}
                        />
                        <div>
                          <p>My Account</p>
                        </div>
                      </div>
                    </Link>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  );
});

ComponentsSidebarAppUsersProfile.displayName = "ComponentsSidebarAppUsersProfile";
export default ComponentsSidebarAppUsersProfile;


