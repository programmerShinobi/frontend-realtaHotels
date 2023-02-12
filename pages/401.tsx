import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Box, FormLabel } from '@mui/material';

export default function Custom401() {
  return (
    <Box className="h-screen w-full flex flex-col justify-center items-center bg-black">
      <FormLabel className="text-2xl font-bold text-white">401 | {"Unauthorized"}</FormLabel>
      <FormLabel className="font-normal text-white mt-2">Private page</FormLabel>
    </Box>
  );
}
