import LayoutAdmin from "@/components/Layout/LayoutAdmin";
import { Box } from "@mui/material";
import Head from "next/head";

export default function DashboardAll() {
  return (
    <Box>
      <Head>
        <title>Dashboard</title>
      </Head>
      <LayoutAdmin>
        <p className="text-gray-700 text-3xl mb-8 font-bold">Dashboard / All</p>
        <Box className="grid lg:grid-cols-3 gap-5 mb-16">
          <Box className="rounded bg-white h-40 shadow-sm"></Box>
          <Box className="rounded bg-white h-40 shadow-sm"></Box>
          <Box className="rounded bg-white h-40 shadow-sm"></Box>
        </Box>
        <Box className="grid col-1 bg-white h-96 shadow-sm"></Box>
      </LayoutAdmin>
    </Box>
  );
}
