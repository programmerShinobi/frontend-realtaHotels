import LayoutManager from "@/components/Layout/manager";
import Head from "next/head";

export default function HREmployee() {
  return (
    <div>
      <Head>
        <title>HR/Employee</title>
      </Head>
      <LayoutManager>

        {"This is HR / Employee page"}

      </LayoutManager>
    </div>
  );
}