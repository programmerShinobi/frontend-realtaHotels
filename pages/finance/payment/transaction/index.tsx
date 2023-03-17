import LayoutFinance from "@/components/Layout/finance";
import Head from "next/head";

export default function PaymentTransaction() {
  return (
    <div>
      <Head>
        <title>Payment/Transaction</title>
      </Head>
      <LayoutFinance>

        {"This is Payment / Transaction page"}

      </LayoutFinance>
    </div>
  );
}