import Skeleton from "@mui/material/Skeleton";
import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

export default function DashLoader({ height }) {
  return (
    <Box sx={{ flexGrow: 1, scale: "0.95" }}>
      <Grid container spacing={2} columnSpacing={2} rowSpacing={2}>
        <Grid xs={6} md={4} sm={8}>
          <Skeleton variant="rectangular" height={height} animation="pulse" />
        </Grid>
        <Grid xs={6} md={4} sm={8}>
          <Skeleton variant="rectangular" height={height} animation="pulse" />
        </Grid>
        <Grid xs={6} md={4} sm={8}>
          <Skeleton variant="rectangular" height={height} animation="pulse" />
        </Grid>
        <Grid xs={6} md={4} sm={8}>
          <Skeleton variant="rectangular" height={height} animation="pulse" />
        </Grid>
        <Grid xs={6} md={4} sm={8}>
          <Skeleton variant="rectangular" height={height} animation="pulse" />
        </Grid>
        <Grid xs={6} md={4} sm={8}>
          <Skeleton variant="rectangular" height={height} animation="pulse" />
        </Grid>
        <Grid xs={6} md={4} sm={8}>
          <Skeleton variant="rectangular" height={height} animation="pulse" />
        </Grid>
        <Grid xs={6} md={4} sm={8}>
          <Skeleton variant="rectangular" height={height} animation="pulse" />
        </Grid>
        <Grid xs={6} md={4} sm={8}>
          <Skeleton variant="rectangular" height={height} animation="pulse" />
        </Grid>
      </Grid>
    </Box>
  );
}
