import LayoutStaff from "@/components/Layout/staff";
import Head from "next/head";

export default function HREmployee() {
  return (
    <div>
      <Head>
        <title>HR/Employee</title>
      </Head>
      <LayoutStaff>

        {"This is HR / Employee page"}

      </LayoutStaff>
    </div>
  );
}