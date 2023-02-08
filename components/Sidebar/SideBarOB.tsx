import { forwardRef } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useRouter } from "next/router";
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const SideBarOB = forwardRef(({ showNav }:any, ref:any) => {
  const router = useRouter();
  return (
    <div ref={ref} className="fixed w-56 bg-white shadow-sm h-full overflow-y-auto">
      <div className="flex justify-center mt-6 mb-5">
        <picture>
          <img
            className="w-40 h-auto"
            src="/assets/logo-realtaHotel.png"
            alt="logo"
          />
        </picture>
      </div>

      <div className="flex flex-col">
        <div className="w-full px-4 mb-3">
          <div className="mx-auto w-full max-w-md rounded-md bg-white p-1">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="items-center flex w-full justify-between rounded-md bg-orange-100 px-4 py-2 text-left text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75 shadow-lg">
                    <div className="mr-2">
                      <LocationCityIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p>Hotels</p>
                    </div>
                    <ChevronRightIcon
                      className={`${open ? 'rotate-90 transform' : ''
                        } h-4 w-4 text-orange-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-2 w-full">
                    <Link href="/ob">
                      <div
                        className={`shadow-2lg pl-3 px-4 py-2 mx-auto rounded-md text-left text-sm font-medium cursor-pointer flex items-center transition-colors ${router.pathname == "/ob"
                          ? "bg-orange-100 text-orange-500"
                          : "text-orange-900 hover:bg-orange-100 hover:text-orange-500"
                          }`}
                      >
                        <ChevronUpIcon
                          className={`${open ? 'rotate-90 transform' : ''
                            } h-5 w-5 text-orange-500`}
                        />
                        <div>
                          <p>Task</p>
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

SideBarOB.displayName = "SideBarOB";

export default SideBarOB;


