import React, { Component } from "react";
import { BusinessContext } from "../../context/BusinessContext";
import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  Chip,
  Divider,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import { colors } from "../../theme/theme";
import { mockStockItems } from "../../data/mockData";

class StockLevels extends Component {
  static contextType = BusinessContext;

  getStockPercentage = (item) => {
    const max = item.low_stock_threshold * 4;
    return Math.min((item.current_quantity / max) * 100, 100);
  };

  getStockColor = (item) => {
    const pct = this.getStockPercentage(item);
    if (pct <= 25) return colors.red;
    if (pct <= 50) return colors.amber;
    return colors.green;
  };

  render() {
  const context = this.context;

  // Use real data if available, fall back to mock
  const items = context?.stockItems?.length > 0
    ? context.stockItems.map(item => ({
        ...item,
        is_low_stock: item.current_quantity <= item.low_stock_threshold
      }))
    : mockStockItems;

  const lowStockItems = items.filter((i) => i.is_low_stock);
  const healthyItems = items.filter((i) => !i.is_low_stock);

    return (
      <Card sx={{ height: "100%" }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* ── Header ───────────────────────────────────────────── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  color: colors.black,
                }}
              >
                Stock Levels
              </Typography>
              <Typography
                sx={{
                  color: colors.grey400,
                  fontSize: "0.75rem",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: "italic",
                }}
              >
                Viwango vya Hifadhi
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              {lowStockItems.length > 0 && (
                <Chip
                  icon={
                    <WarningAmberIcon
                      sx={{ fontSize: "14px !important" }}
                    />
                  }
                  label={`${lowStockItems.length} Low`}
                  size="small"
                  sx={{
                    backgroundColor: colors.redLight,
                    color: colors.red,
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    "& .MuiChip-icon": { color: colors.red },
                  }}
                />
              )}
              <Chip
                icon={
                  <InventoryIcon
                    sx={{ fontSize: "14px !important" }}
                  />
                }
                label={`${mockStockItems.length} Items`}
                size="small"
                sx={{
                  backgroundColor: colors.grey100,
                  color: colors.grey500,
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  "& .MuiChip-icon": { color: colors.grey400 },
                }}
              />
            </Box>
          </Box>

          {/* ── Low stock alert banner ───────────────────────────── */}
          {lowStockItems.length > 0 && (
            <Box
              sx={{
                backgroundColor: colors.redLight,
                borderRadius: 2,
                p: 1.5,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <WarningAmberIcon
                sx={{ color: colors.red, fontSize: 18 }}
              />
              <Typography
                sx={{
                  color: colors.red,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {lowStockItems.length} item
                {lowStockItems.length > 1 ? "s" : ""} need
                restocking —{" "}
                {lowStockItems.map((i) => i.item_name).join(", ")}
              </Typography>
            </Box>
          )}

          {/* ── Stock items list ─────────────────────────────────── */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              maxHeight: 320,
              overflowY: "auto",
              pr: 0.5,
              "&::-webkit-scrollbar": { width: 4 },
              "&::-webkit-scrollbar-track": {
                backgroundColor: colors.grey100,
                borderRadius: 4,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: colors.grey300,
                borderRadius: 4,
              },
            }}
          >
            {/* Low stock items first */}
            {lowStockItems.map((item) => (
              <Box key={item.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 0.75,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <WarningAmberIcon
                      sx={{ color: colors.red, fontSize: 14 }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        color: colors.black,
                      }}
                    >
                      {item.item_name}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: colors.red,
                      fontWeight: 600,
                    }}
                  >
                    {item.current_quantity} {item.unit} left
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={this.getStockPercentage(item)}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: colors.grey200,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: this.getStockColor(item),
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
            ))}

            {lowStockItems.length > 0 && healthyItems.length > 0 && (
              <Divider sx={{ borderColor: colors.grey200 }} />
            )}

            {/* Healthy stock items */}
            {healthyItems.map((item) => (
              <Box key={item.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 0.75,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{ color: colors.green, fontSize: 14 }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        color: colors.grey600,
                      }}
                    >
                      {item.item_name}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: colors.grey400,
                    }}
                  >
                    {item.current_quantity} {item.unit}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={this.getStockPercentage(item)}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: colors.grey200,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: this.getStockColor(item),
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }
}

export default StockLevels;