import LayoutStaff from "@/components/Layout/staff";
import Head from "next/head";

export default function HRWorkOrder() {
  return (
    <div>
      <Head>
        <title>HR/WorkOrder</title>
      </Head>
      <LayoutStaff>

        {"This is HR / WorkOrder page"}

      </LayoutStaff>
    </div>
  );
}