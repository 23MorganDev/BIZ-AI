import React, { Component } from "react";
import { BusinessContext } from "../../context/BusinessContext";
import {
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

import { colors } from "../../theme/theme";
import { formatKES } from "../../data/mockData";

class SummaryCards extends Component {
  static contextType = BusinessContext;

  getCards = () => {
    const summary = this.context?.todaySummary ?? {
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
        chipLabel: "+12%",
        chipType: "positive",
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
        chipLabel: "-5%",
        chipType: "negative",
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
        chipLabel: "+18%",
        chipType: "positive",
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
        chipLabel: `Top: ${top_selling_item || "N/A"}`,
        chipType: "neutral",
        icon: <ReceiptLongIcon />,
        iconBg: colors.amberLight,
        iconColor: colors.amber,
        borderColor: colors.amber,
      },
    ];
  };

  renderChip = (card) => {
    const isPositive = card.chipType === "positive";
    const isNegative = card.chipType === "negative";

    return (
      <Chip
        icon={
          isPositive ? (
            <TrendingUpIcon sx={{ fontSize: "12px !important" }} />
          ) : isNegative ? (
            <TrendingDownIcon sx={{ fontSize: "12px !important" }} />
          ) : undefined
        }
        label={card.chipLabel}
        size="small"
        sx={{
          backgroundColor: isPositive
            ? colors.greenLight
            : isNegative
            ? colors.redLight
            : colors.amberLight,
          color: isPositive
            ? colors.green
            : isNegative
            ? colors.red
            : colors.amber,
          fontWeight: 600,
          fontSize: "0.65rem",
          height: 22,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          "& .MuiChip-icon": {
            color: isPositive
              ? colors.green
              : isNegative
              ? colors.red
              : colors.amber,
          },
        }}
      />
    );
  };

  render() {
    const { loading } = this.context;

    if (loading) {
      return (
        <Typography
          sx={{
            textAlign: "center",
            py: 4,
            color: colors.grey500,
          }}
        >
          Loading dashboard...
        </Typography>
      );
    }

    const hasTransactions =
      (this.context?.todaySummary?.transaction_count ?? 0) > 0;

    if (!hasTransactions) {
      return (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            px: 2,
            border: "1px dashed",
            borderColor: "grey.300",
            borderRadius: 3,
            backgroundColor: "#FAFAFA",
          }}
        >
          <ReceiptLongIcon
            sx={{
              fontSize: 48,
              color: "grey.400",
              mb: 2,
            }}
          />

          <Typography
            variant="h6"
            color="text.secondary"
            gutterBottom
          >
            Hakuna Miamala Leo
          </Typography>

          <Typography
            variant="body2"
            color="text.disabled"
          >
            No transactions recorded today. Transact to get started.
          </Typography>
        </Box>
      );
    }

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
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 1.5, sm: 2, md: 2.5 },
                    "&:last-child": {
                      pb: { xs: 1.5, sm: 2, md: 2.5 },
                    },
                  }}
                >
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
                          fontSize: {
                            xs: "1.1rem",
                            sm: "1.3rem",
                          },
                        },
                      }}
                    >
                      {card.icon}
                    </Box>

                    {this.renderChip(card)}
                  </Box>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: "1.1rem",
                        sm: "1.4rem",
                        md: "1.6rem",
                      },
                      fontWeight: 700,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: colors.black,
                      lineHeight: 1.1,
                      mb: 0.5,
                    }}
                  >
                    {card.value}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.8rem",
                      },
                      fontWeight: 600,
                      color: colors.grey500,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {card.title}
                  </Typography>

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