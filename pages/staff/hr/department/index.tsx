import LayoutStaff from "@/components/Layout/staff";
import Head from "next/head";

export default function HRDepartment() {
  return (
    <div>
      <Head>
        <title>HR/Department</title>
      </Head>
      <LayoutStaff>

        {"This is HR / Department page"}

      </LayoutStaff>
    </div>
  );
}