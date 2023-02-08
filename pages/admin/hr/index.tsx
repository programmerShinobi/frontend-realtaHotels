import LayoutAdmin from "@/components/Layout/LayoutAdmin";
import { Box } from "@mui/material";
import Head from "next/head";

export default function HREmployee() {
  return (
    <Box>
      <Head>
        <title>HR</title>
      </Head>
      <LayoutAdmin>
        <p className="text-gray-700 text-3xl mb-16 font-bold">HR / Employee</p>
      </LayoutAdmin>
    </Box>
  );
}