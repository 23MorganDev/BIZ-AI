import React, { Component } from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Avatar,
  InputBase,
  Chip,
  Tooltip,
  Divider,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircleIcon from "@mui/icons-material/Circle";
import { colors } from "../../theme/theme";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
      searchValue: "",
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatDate = (date) => {
    return date.toLocaleDateString("en-KE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  formatTime = (date) => {
    return date.toLocaleTimeString("en-KE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  getGreeting = () => {
    const hour = this.state.currentTime.getHours();
    if (hour < 12) return "Habari za asubuhi";
    if (hour < 17) return "Habari za mchana";
    return "Habari za jioni";
  };

  render() {
    const { title, onRefresh, notificationCount = 3 } = this.props;
    const { currentTime, searchValue } = this.state;

    return (
      // ── Plain Box instead of AppBar — full width control ─────────
      <Box
        sx={{
          width: "100%",
          backgroundColor: colors.red,
          borderBottom: `1px solid ${colors.redDark}`,
          position: "sticky",
          top: 0,
          zIndex: 1100,
          // No margin, no padding that would cause gaps
          m: 0,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 2 },
            minHeight: { xs: 64, sm: 70 },
            gap: 2,
          }}
        >
          {/* ── Mobile hamburger spacer ──────────────────────────── */}
          <Box
            sx={{ display: { xs: "block", md: "none" }, width: 40 }}
          />

          {/* ── Page title and greeting ──────────────────────────── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem" },
                fontWeight: 600,
                color: colors.white,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title || "Dashboard"}
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1,
                mt: 0.25,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: `${colors.white}99`,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {this.getGreeting()} •{" "}
                {this.formatDate(currentTime)}
              </Typography>
            </Box>
          </Box>

          {/* ── Search bar ───────────────────────────────────────── */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              backgroundColor: `${colors.white}18`,
              borderRadius: 2,
              px: 1.5,
              py: 0.75,
              width: 220,
              gap: 1,
              border: `1px solid ${colors.white}30`,
              "&:focus-within": {
                backgroundColor: `${colors.white}25`,
                border: `1px solid ${colors.white}60`,
              },
              transition: "all 0.15s ease",
            }}
          >
            <SearchIcon
              sx={{ color: `${colors.white}80`, fontSize: 18 }}
            />
            <InputBase
              placeholder="Search transactions..."
              value={searchValue}
              onChange={(e) =>
                this.setState({ searchValue: e.target.value })
              }
              sx={{
                fontSize: "0.8125rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: colors.white,
                flex: 1,
                "& input::placeholder": {
                  color: `${colors.white}70`,
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* ── Live clock ───────────────────────────────────────── */}
          <Chip
            icon={
              <CircleIcon
                sx={{
                  fontSize: "8px !important",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.4 },
                    "100%": { opacity: 1 },
                  },
                }}
              />
            }
            label={this.formatTime(currentTime)}
            size="small"
            sx={{
              display: { xs: "none", sm: "flex" },
              backgroundColor: `${colors.white}20`,
              color: colors.white,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: "0.7rem",
              height: 26,
              border: `1px solid ${colors.white}30`,
              "& .MuiChip-icon": { color: colors.white },
            }}
          />

          {/* ── Action buttons ───────────────────────────────────── */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <Tooltip title="Refresh data">
              <IconButton
                onClick={onRefresh}
                size="small"
                sx={{
                  color: `${colors.white}80`,
                  "&:hover": {
                    color: colors.white,
                    backgroundColor: `${colors.white}15`,
                  },
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton
                size="small"
                sx={{
                  color: `${colors.white}80`,
                  "&:hover": {
                    color: colors.white,
                    backgroundColor: `${colors.white}15`,
                  },
                }}
              >
                <Badge
                  badgeContent={notificationCount}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: colors.white,
                      color: colors.red,
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      minWidth: 16,
                      height: 16,
                    },
                  }}
                >
                  <NotificationsOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: 0.5,
                borderColor: `${colors.white}30`,
                display: { xs: "none", sm: "block" },
              }}
            />

            <Tooltip title="Mama Wanjiru — Kawangware">
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  backgroundColor: `${colors.white}25`,
                  border: `2px solid ${colors.white}50`,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: colors.white,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: `${colors.white}35`,
                    border: `2px solid ${colors.white}`,
                  },
                  transition: "all 0.15s ease",
                }}
              >
                MW
              </Avatar>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Header;