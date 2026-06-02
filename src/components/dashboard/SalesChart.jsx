import React, { Component } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Area,
} from "recharts";
import { colors } from "../../theme/theme";
import {
  mockWeeklySales,
  mockMonthlySales,
  formatKES,
} from "../../data/mockData";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: colors.black,
          borderRadius: 2,
          p: 1.5,
          minWidth: 160,
        }}
      >
        <Typography
          sx={{
            color: colors.grey300,
            fontSize: "0.75rem",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            mb: 1,
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
        {payload.map((entry) => (
          <Box
            key={entry.name}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              mb: 0.5,
            }}
          >
            <Typography
              sx={{
                color: entry.color,
                fontSize: "0.75rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textTransform: "capitalize",
              }}
            >
              {entry.name}
            </Typography>
            <Typography
              sx={{
                color: colors.white,
                fontSize: "0.75rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
              }}
            >
              {formatKES(entry.value)}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

class SalesChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      period: "weekly",
    };
  }

  handlePeriodChange = (e, newPeriod) => {
    if (newPeriod) this.setState({ period: newPeriod });
  };

  render() {
    const { period } = this.state;
    const data =
      period === "weekly" ? mockWeeklySales : mockMonthlySales;
    const xKey = period === "weekly" ? "date" : "month";

    return (
      <Card sx={{ height: "100%" }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* ── Header ────────────────────────────────────────────── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: colors.black,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Sales Overview
              </Typography>
              <Typography
                sx={{
                  color: colors.grey400,
                  fontSize: "0.75rem",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: "italic",
                }}
              >
                Muhtasari wa Mauzo
              </Typography>
            </Box>

            <ToggleButtonGroup
              value={period}
              exclusive
              onChange={this.handlePeriodChange}
              size="small"
              sx={{
                "& .MuiToggleButton-root": {
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  px: 1.5,
                  py: 0.5,
                  textTransform: "none",
                  color: colors.grey500,
                  borderColor: colors.grey200,
                  "&.Mui-selected": {
                    backgroundColor: colors.red,
                    color: colors.white,
                    "&:hover": {
                      backgroundColor: colors.redDark,
                    },
                  },
                },
              }}
            >
              <ToggleButton value="weekly">7 Days</ToggleButton>
              <ToggleButton value="monthly">6 Months</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* ── Chart ─────────────────────────────────────────────── */}
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.grey200}
                vertical={false}
              />
              <XAxis
                dataKey={xKey}
                tick={{
                  fontSize: 11,
                  fill: colors.grey400,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fontSize: 11,
                  fill: colors.grey400,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) =>
                  v >= 1000 ? `${v / 1000}K` : v
                }
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  fontSize: "0.75rem",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  paddingTop: "12px",
                }}
              />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill={colors.red}
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill={colors.grey300}
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
              <Line
                type="monotone"
                dataKey="profit"
                name="Profit"
                stroke={colors.green}
                strokeWidth={2}
                dot={{
                  fill: colors.green,
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }
}

export default SalesChart;