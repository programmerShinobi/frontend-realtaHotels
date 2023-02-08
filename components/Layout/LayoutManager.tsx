import { useState, useEffect, Fragment } from "react";
import TopBar from '../Header/TobBarAdmin';
import SideBarManager from "../Sidebar/SideBarManager";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Custom401 from "@/pages/401";
import WithAuth from "../Private/withAuth";

const LayoutManager = ({ children }:any) => {
  const [showNav, setShowNav] = useState(true);
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
  const roleId: any = localStorage.getItem("roleId");
  if (roleId != 2) {
    router.back();
    return Custom401();
  }

  return (
    <>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBarManager showNav={showNav} />
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? "pl-56" : ""
          }`}
      >
        <div className="px-4 md:px-16">{children}</div>
      </main>
    </>
  );
}

export default WithAuth(LayoutManager);