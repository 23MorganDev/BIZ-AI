import React, { Component } from "react";
import {BusinessContext} from "../../context/BusinessContext";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { colors } from "../../theme/theme";
import {
  mockTransactions,
  formatKES,
  formatTimeAgo,
} from "../../data/mockData";

class TransactionTable extends Component {
  static contextType = BusinessContext;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      page: 0,
      rowsPerPage: 5,
      filter: "all",
    };
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value, page: 0 });
  };

  handleFilterChange = (filter) => {
    this.setState({ filter, page: 0 });
  };

  handleChangePage = (e, newPage) => {
    this.setState({ page: newPage });
  };

getFilteredTransactions = () => {
  const { search, filter } = this.state;
  const context = this.context;

  // Use real data if available, fall back to mock
  const data = context?.transactions?.length > 0
    ? context.transactions
    : mockTransactions;

  return data.filter((t) => {
    const matchesSearch = t.item_name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" || t.transaction_type === filter;
    return matchesSearch && matchesFilter;
  });
};

  render() {
    const { search, page, rowsPerPage, filter } = this.state;
    const filtered = this.getFilteredTransactions();
    const paginated = filtered.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    const filters = [
      { label: "All", value: "all" },
      { label: "Sales", value: "sale" },
      { label: "Expenses", value: "expense" },
    ];

    return (
      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* ── Header ───────────────────────────────────────────── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              flexWrap: "wrap",
              gap: 1,
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
                Recent Transactions
              </Typography>
              <Typography
                sx={{
                  color: colors.grey400,
                  fontSize: "0.75rem",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: "italic",
                }}
              >
                Miamala ya Hivi Karibuni
              </Typography>
            </Box>

            <Tooltip title="Export CSV">
              <IconButton
                size="small"
                sx={{
                  color: colors.grey400,
                  border: `1px solid ${colors.grey200}`,
                  borderRadius: 1.5,
                  "&:hover": {
                    color: colors.red,
                    borderColor: colors.red,
                    backgroundColor: colors.redLight,
                  },
                }}
              >
                <FileDownloadOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          {/* ── Filters and search ───────────────────────────────── */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mb: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {filters.map((f) => (
              <Chip
                key={f.value}
                label={f.label}
                onClick={() => this.handleFilterChange(f.value)}
                size="small"
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  backgroundColor:
                    filter === f.value
                      ? colors.black
                      : colors.grey100,
                  color:
                    filter === f.value
                      ? colors.white
                      : colors.grey500,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor:
                      filter === f.value
                        ? colors.blackSoft
                        : colors.grey200,
                  },
                }}
              />
            ))}

            <TextField
              placeholder="Search items..."
              value={search}
              onChange={this.handleSearchChange}
              size="small"
              sx={{
                ml: "auto",
                width: { xs: "100%", sm: 180 },
                "& .MuiOutlinedInput-root": {
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.8rem",
                  borderRadius: 2,
                  "& fieldset": { borderColor: colors.grey200 },
                  "&:hover fieldset": {
                    borderColor: colors.grey300,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.red,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        fontSize: 16,
                        color: colors.grey400,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* ── Table ───────────────────────────────────────────── */}
          <TableContainer
            sx={{
              borderRadius: 2,
              border: `1px solid ${colors.grey200}`,
              overflowX: "auto",
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                  >
                    Qty
                  </TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    Time
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography
                        sx={{
                          color: colors.grey400,
                          fontSize: "0.875rem",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          py: 3,
                        }}
                      >
                        No transactions found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: colors.grey100,
                        },
                        transition: "background 0.1s ease",
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            backgroundColor:
                              transaction.transaction_type === "sale"
                                ? colors.greenLight
                                : colors.redLight,
                          }}
                        >
                          {transaction.transaction_type === "sale" ? (
                            <ArrowUpwardIcon
                              sx={{
                                fontSize: 14,
                                color: colors.green,
                              }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              sx={{
                                fontSize: 14,
                                color: colors.red,
                              }}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            color: colors.black,
                          }}
                        >
                          {transaction.item_name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.7rem",
                            color: colors.grey400,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            display: { xs: "block", md: "none" },
                          }}
                        >
                          {formatTimeAgo(transaction.recorded_at)}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          display: { xs: "none", sm: "table-cell" },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: colors.grey500,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          {transaction.quantity}{" "}
                          {transaction.unit || "pcs"}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            color:
                              transaction.transaction_type === "sale"
                                ? colors.green
                                : colors.red,
                          }}
                        >
                          {transaction.transaction_type === "sale"
                            ? "+"
                            : "-"}
                          {formatKES(transaction.total_amount)}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          display: { xs: "none", md: "table-cell" },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            color: colors.grey400,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          {formatTimeAgo(transaction.recorded_at)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ── Pagination ───────────────────────────────────────── */}
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={this.handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5]}
            sx={{
              "& .MuiTablePagination-displayedRows": {
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.8rem",
              },
              "& .MuiTablePagination-actions button": {
                color: colors.grey500,
              },
            }}
          />
        </CardContent>
      </Card>
    );
  }
}

export default TransactionTable;