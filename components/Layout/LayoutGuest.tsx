import { useState, useEffect, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Custom401 from "@/pages/401";
import WithAuth from "../Private/withAuth";
import TopBarGuest from "../Header/TobBarGuest";
import Loading from "@/pages/loading";

const LayoutGuest = ({ children }:any) => {

  const router = useRouter();

  const roleId: any = localStorage.getItem("roleId");
  if (roleId && roleId != 1) {
    router.back();
    return Custom401();
  } else if (!roleId) {
    return Loading();
  }

  return (
    <>
      <TopBarGuest />
        <main
          className={`pt-16    
            }`}
        >
          <div className="px-4 md:px-16">{children}</div>
        </main>
    </>
  );
}

export default WithAuth(LayoutGuest);