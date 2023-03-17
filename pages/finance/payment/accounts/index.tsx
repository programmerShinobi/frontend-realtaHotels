import LayoutFinance from "@/components/Layout/finance";
import Head from "next/head";

export default function PaymentAccounts() {
  return (
    <div>
      <Head>
        <title>Payment/Accounts</title>
      </Head>
      <LayoutFinance>

        {"This is Payment / Accounts page"}

      </LayoutFinance>
    </div>
  );
}