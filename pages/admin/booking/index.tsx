import LayoutAdmin from "@/components/Layout/LayoutAdmin";
import { Box } from "@mui/material";
import Head from "next/head";

export default function BookingOrder() {
  return (
    <Box>
      <Head>
        <title>Booking</title>
      </Head>
      <LayoutAdmin>
        <p className="text-gray-700 text-3xl mb-16 font-bold">Booking / Booking Order</p>
      </LayoutAdmin>
    </Box>
  );
}