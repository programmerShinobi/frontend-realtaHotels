import LayoutAdmin from "@/components/Layout/LayoutAdmin";
import { Box } from "@mui/material";
import Head from "next/head";

export default function HotelsHotel() {
  return (
    <Box>
      <Head>
        <title>Hotels</title>
      </Head>
      <LayoutAdmin>
        <p className="text-gray-700 text-3xl mb-16 font-bold">Hotels / Hotel</p>
      </LayoutAdmin>
    </Box>
  );
}