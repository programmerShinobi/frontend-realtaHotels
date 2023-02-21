import React from 'react';
import { Backdrop, Box, CircularProgress, FormLabel } from '@mui/material';

export default function Loading() {
  return (
    <Box>
      <Backdrop
        sx={{ color:"#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="warning" />
      </Backdrop>
    </Box>
  );
}
