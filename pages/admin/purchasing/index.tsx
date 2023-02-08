import LayoutAdmin from "@/components/Layout/LayoutAdmin";
import { Box } from "@mui/material";
import Head from "next/head";

export default function PurchasingPurchaseOrder() {
  return (
    <Box>
      <Head>
        <title>Purchasing</title>
      </Head>
      <LayoutAdmin>
        <p className="text-gray-700 text-3xl mb-16 font-bold">Purchasing / Purchase Order</p>
      </LayoutAdmin>
    </Box>
  );
}