import LayoutFinance from "@/components/Layout/finance";
import Head from "next/head";

export default function PaymentBank() {
  return (
    <div>
      <Head>
        <title>Payment/Bank</title>
      </Head>
      <LayoutFinance>

        {"This is Payment / Bank page"}

      </LayoutFinance>
    </div>
  );
}