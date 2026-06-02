import React, { Component } from "react";
import{ BusinessContext} from "../../context/BusinessContext";
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { colors } from "../../theme/theme";
import { formatKES, mockTodaySummary } from "../../data/mockData";

class SummaryCards extends Component {

  static contextType = BusinessContext;

 getCards = () => {
  const context = this.context;
  const summary = context?.todaySummary || {
    total_revenue: 0,
    total_expenses: 0,
    net_profit: 0,
    transaction_count: 0,
    top_selling_item: "N/A",
  };

  const {
    total_revenue,
    total_expenses,
    net_profit,
    transaction_count,
    top_selling_item,
  } = summary;

  return [
    {
      id: "revenue",
      title: "Today's Revenue",
      swahili: "Mapato ya Leo",
      value: formatKES(total_revenue),
      change: "+12%",
      changePositive: true,
      icon: <TrendingUpIcon />,
      iconBg: colors.greenLight,
      iconColor: colors.green,
      borderColor: colors.green,
    },
    {
      id: "expenses",
      title: "Today's Expenses",
      swahili: "Gharama za Leo",
      value: formatKES(total_expenses),
      change: "-5%",
      changePositive: false,
      icon: <ShoppingCartIcon />,
      iconBg: colors.redLight,
      iconColor: colors.red,
      borderColor: colors.red,
    },
    {
      id: "profit",
      title: "Net Profit",
      swahili: "Faida Halisi",
      value: formatKES(net_profit),
      change: "+18%",
      changePositive: true,
      icon: <AccountBalanceWalletIcon />,
      iconBg: "#EEF2FF",
      iconColor: "#4F46E5",
      borderColor: "#4F46E5",
    },
    {
      id: "transactions",
      title: "Transactions",
      swahili: "Miamala",
      value: transaction_count,
      change: `Top: ${top_selling_item || "N/A"}`,
      changePositive: true,
      icon: <ReceiptLongIcon />,
      iconBg: colors.amberLight,
      iconColor: colors.amber,
      borderColor: colors.amber,
    },
  ];
};

  render() {
    const cards = this.getCards();

return (
<Box
  sx={{
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: { xs: 1.5, sm: 2, md: 3 },
  }}
>
    {cards.map((card) => (
      <Box
        key={card.id}
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "100%",
            borderTop: `3px solid ${card.borderColor}`,
            transition: "all 0.2s ease",
            cursor: "default",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 8px 24px rgba(0,0,0,0.08)`,
            },
          }}
        >
          <CardContent
            sx={{
              p: { xs: 1.5, sm: 2, md: 2.5 },
              "&:last-child": { pb: { xs: 1.5, sm: 2, md: 2.5 } },
            }}
          >
            {/* ── Icon and change badge ────────────────────────── */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: { xs: 36, sm: 44 },
                  height: { xs: 36, sm: 44 },
                  borderRadius: 2,
                  backgroundColor: card.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: card.iconColor,
                  "& svg": {
                    fontSize: { xs: "1.1rem", sm: "1.3rem" },
                  },
                }}
              >
                {card.icon}
              </Box>

              <Chip
                icon={
                  card.changePositive ? (
                    <TrendingUpIcon
                      sx={{ fontSize: "12px !important" }}
                    />
                  ) : (
                    <TrendingDownIcon
                      sx={{ fontSize: "12px !important" }}
                    />
                  )
                }
                label={card.change}
                size="small"
                sx={{
                  backgroundColor: card.changePositive
                    ? colors.greenLight
                    : colors.redLight,
                  color: card.changePositive
                    ? colors.green
                    : colors.red,
                  fontWeight: 600,
                  fontSize: "0.65rem",
                  height: 22,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  "& .MuiChip-icon": {
                    color: card.changePositive
                      ? colors.green
                      : colors.red,
                  },
                }}
              />
            </Box>

            {/* ── Value ───────────────────────────────────────── */}
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.6rem" },
                fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: colors.black,
                lineHeight: 1.1,
                mb: 0.5,
              }}
            >
              {card.value}
            </Typography>

            {/* ── Title ───────────────────────────────────────── */}
            <Typography
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
                fontWeight: 600,
                color: colors.grey500,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {card.title}
            </Typography>

            {/* ── Swahili subtitle ────────────────────────────── */}
            <Typography
              sx={{
                fontSize: "0.65rem",
                color: colors.grey400,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontStyle: "italic",
                display: { xs: "none", sm: "block" },
              }}
            >
              {card.swahili}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    ))}
  </Box>
);
  }
}

export default SummaryCards;