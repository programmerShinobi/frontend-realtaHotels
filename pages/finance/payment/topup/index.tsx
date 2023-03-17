import LayoutFinance from "@/components/Layout/finance";
import Head from "next/head";

export default function PaymentTopup() {
  return (
    <div>
      <Head>
        <title>Payment/Topup</title>
      </Head>
      <LayoutFinance>

        {"This is Payment / Topup page"}

      </LayoutFinance>
    </div>
  );
}