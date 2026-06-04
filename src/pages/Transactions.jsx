import React, { Component } from "react";
import { BusinessContext } from "../context/BusinessContext";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { colors } from "../theme/theme";
import { formatKES } from "../data/mockData";

class Transactions extends Component {
  static contextType = BusinessContext;

  formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-KE", {
      timeZone: "Africa/Nairobi",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  renderEmpty = () => (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        border: "1px dashed",
        borderColor: "grey.300",
        borderRadius: 3,
        backgroundColor: "#FAFAFA",
      }}
    >
      <ReceiptLongIcon sx={{ fontSize: 56, color: "grey.400", mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Hakuna Miamala
      </Typography>
      <Typography variant="body2" color="text.disabled">
        No transactions recorded yet. Send a message to get started.
      </Typography>
    </Box>
  );

  render() {
    const { transactions, loading } = this.context;

    return (
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={700} color={colors.black}>
            Transactions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            All recorded business transactions
          </Typography>
        </Box>

        {/* Loading */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: colors.red }} />
          </Box>
        )}

        {/* Empty State */}
        {!loading && (!transactions || transactions.length === 0) &&
          this.renderEmpty()
        }

        {/* Table */}
        {!loading && transactions && transactions.length > 0 && (
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
                  <TableCell sx={{ fontWeight: 700 }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Channel</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow
                    key={tx.id}
                    sx={{
                      "&:hover": { backgroundColor: "#F9FAFB" },
                      cursor: "default",
                    }}
                  >
                    {/* Date */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {this.formatDate(tx.created_at)}
                      </Typography>
                    </TableCell>

                    {/* Description */}
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {tx.description || tx.item_name || "—"}
                      </Typography>
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      <Chip
                        label={tx.transaction_type === "income" ? "Income" : "Expense"}
                        size="small"
                        sx={{
                          backgroundColor:
                            tx.transaction_type === "income"
                              ? colors.greenLight
                              : colors.redLight,
                          color:
                            tx.transaction_type === "income"
                              ? colors.green
                              : colors.red,
                          fontWeight: 600,
                          fontSize: "0.72rem",
                        }}
                      />
                    </TableCell>

                    {/* Amount */}
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{
                          color:
                            tx.transaction_type === "income"
                              ? colors.green
                              : colors.red,
                        }}
                      >
                        {tx.transaction_type === "expense" ? "- " : "+ "}
                        {formatKES(tx.amount)}
                      </Typography>
                    </TableCell>

                    {/* Channel */}
                    <TableCell>
                      <Chip
                        label={tx.channel || "SMS"}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.72rem", borderColor: "grey.300" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    );
  }
}

export default Transactions;