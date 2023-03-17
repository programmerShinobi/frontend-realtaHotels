import LayoutFinance from "@/components/Layout/finance";
import Head from "next/head";

export default function PaymentFintech() {
  return (
    <div>
      <Head>
        <title>Payment/Fintech</title>
      </Head>
      <LayoutFinance>

        {"This is Payment / Fintech page"}

      </LayoutFinance>
    </div>
  );
}