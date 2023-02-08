import LayoutManager from "@/components/Layout/LayoutManager";
import { Box } from "@mui/material";

export default function DashboardManager() {
  return (
    <>
      <LayoutManager>
        <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>
        <Box className="grid lg:grid-cols-3 gap-5 mb-16">
          <Box className="rounded bg-white h-40 shadow-sm"></Box>
          <Box className="rounded bg-white h-40 shadow-sm"></Box>
          <Box className="rounded bg-white h-40 shadow-sm"></Box>
        </Box>
        <Box className="grid col-1 bg-white h-96 shadow-sm"></Box>
      </LayoutManager>
    </>
  );
}