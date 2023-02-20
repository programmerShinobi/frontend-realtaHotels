import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Box, FormLabel } from '@mui/material';

export default function Loading() {
  return (
    <Box className="h-screen w-full flex flex-col justify-center items-center bg-transparent">
      <FormLabel className="text-2xl font-bold ">{"Loading..."}</FormLabel>
    </Box>
  );
}
