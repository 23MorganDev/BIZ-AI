import React, { Component } from "react";
import { Grid, Box, Typography } from "@mui/material";
import SummaryCards from "../components/dashboard/SummaryCards";
import SalesChart from "../components/dashboard/SalesChart";
import TransactionTable from "../components/dashboard/TransactionTable";
import StockLevels from "../components/dashboard/StockLevels";
import { colors } from "../theme/theme";
import { mockBusiness } from "../data/mockData";

class Dashboard extends Component {
  render() {
    return (
      <Box>
        {/* ── Page intro ──────────────────────────────────────────── */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              fontWeight: 700,
              color: colors.black,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {mockBusiness.business_name}
          </Typography>
          <Typography
            sx={{
              color: colors.grey400,
              fontSize: "0.8rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              mt: 0.25,
            }}
          >
            {mockBusiness.location} •{" "}
            {mockBusiness.business_type}
          </Typography>
        </Box>

        {/* ── Summary cards ───────────────────────────────────────── */}
        <Box sx={{ mb: 3, width: "100%" }}>
          <SummaryCards />
        </Box>

{/* ── Chart + Stock levels ─────────────────────────────────── */}
<Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: 2, sm: 2, md: 3 },
    mb: 3,
    width: "100%",
  }}
>
  <Box sx={{ flex: 1, minWidth: 0 }}>
    <SalesChart />
  </Box>
  <Box sx={{ flex: 1, minWidth: 0 }}>
    <StockLevels />
  </Box>
</Box>

        {/* ── Transaction table ────────────────────────────────────── */}
        <Box>
          <TransactionTable />
        </Box>
      </Box>
    );
  }
}

export default Dashboard;