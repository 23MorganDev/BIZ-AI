import React, { Component } from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "../theme/theme";

class Stock extends Component {
  render() {
    return (
      <Box>
        <Typography variant="h3" sx={{ color: colors.black }}>
          Stock Levels coming soon...
        </Typography>
      </Box>
    );
  }
}

export default Stock;