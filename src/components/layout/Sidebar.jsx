import React, { Component } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InventoryIcon from "@mui/icons-material/Inventory";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { colors } from "../../theme/theme";

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 72;

const navItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon fontSize="small" />,
    path: "/",
  },
  {
    label: "Transactions",
    icon: <ReceiptLongIcon fontSize="small" />,
    path: "/transactions",
  },
  {
    label: "Stock",
    icon: <InventoryIcon fontSize="small" />,
    path: "/stock",
    badge: 4,
  },
  {
    label: "Reports",
    icon: <BarChartIcon fontSize="small" />,
    path: "/reports",
  },
  {
    label: "Settings",
    icon: <SettingsIcon fontSize="small" />,
    path: "/settings",
  },
];

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      collapsed: false,
    };
  }

  toggleMobile = () => {
    this.setState((prev) => ({ mobileOpen: !prev.mobileOpen }));
  };

  toggleCollapse = () => {
    this.setState((prev) => ({ collapsed: !prev.collapsed }));
  };

  renderNavItems = (collapsed) => {
    const { activePath, onNavigate } = this.props;

    return navItems.map((item) => {
      const isActive = activePath === item.path;
      return (
        <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
          <Tooltip
            title={collapsed ? item.label : ""}
            placement="right"
            arrow
          >
            <ListItemButton
              aria-label={item.label}
              onClick={() => {
                onNavigate(item.path);
                this.setState({ mobileOpen: false });
              }}
              sx={{
                position: "relative",

                borderRadius: 2,

                px: collapsed ? 1 : 1.5,
                py: 1,

                justifyContent: collapsed
                  ? "center"
                  : "flex-start",

                backgroundColor: isActive
                  ? `${colors.red}15`
                  : "transparent",

                borderLeft: isActive
                  ? `3px solid ${colors.red}`
                  : "3px solid transparent",

                minHeight: 44,

                transition:
                  "all 0.25s cubic-bezier(0.4,0,0.2,1)",

                "&:hover": {
                  backgroundColor: isActive
                    ? `${colors.red}22`
                    : `${colors.white}10`,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive
                    ? colors.red
                    : colors.grey400,
                  minWidth: collapsed ? 0 : 36,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: isActive ? 600 : 400,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: isActive ? colors.white : colors.grey300,
                    }}
                  />
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        backgroundColor: isActive
                          ? colors.white
                          : colors.red,
                        color: isActive ? colors.red : colors.white,
                        fontSize: "0.65rem",
                        height: 18,
                        fontWeight: 700,
                      }}
                    />
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: colors.red,
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      );
    });
  };

  renderSidebarContent = (collapsed) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: colors.black,
        }}
      >
        {/* ── Logo ───────────────────────────────────────────────────── */}
        <Box
          sx={{
            px: collapsed ? 1 : 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: collapsed ? 0 : 1.5,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                background: colors.red,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Typography
                sx={{
                  color: colors.white,
                  fontWeight: 700,
                  fontSize: "1rem",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                B
              </Typography>
            </Box>
            {!collapsed && (
              <Box>
                <Typography
                  sx={{
                    color: colors.white,
                    fontWeight: 700,
                    fontSize: "1rem",
                    fontFamily: "'Playfair Display', serif",
                    lineHeight: 1.2,
                  }}
                >
                  Biashara AI
                </Typography>
                <Typography
                  sx={{
                    color: colors.grey400,
                    fontSize: "0.65rem",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Business Assistant
                </Typography>
                <Typography
                  sx={{
                    color: colors.red,
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    mt: 0.25,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  v1.0 Beta
                </Typography>
              </Box>
            )}
          </Box>
          {!collapsed && (
            <IconButton
              onClick={this.toggleCollapse}
              sx={{
                color: colors.grey400,
                display: { xs: "none", md: "flex" },
                "&:hover": { color: colors.white },
                p: 0.5,
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        {collapsed && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <IconButton
              onClick={this.toggleCollapse}
              sx={{
                color: colors.grey400,
                "&:hover": { color: colors.white },
              }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Divider sx={{ borderColor: colors.grey600, mx: collapsed ? 1 : 2 }} />

        <Box sx={{ px: collapsed ? 1 : 2, py: 2 }}>
          {!collapsed && (
            <>
              <Typography
                sx={{
                  color: colors.grey500,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Quick Actions
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: colors.red,
                    color: colors.white,
                    borderRadius: 2,
                    py: 1,
                    px: 1.5,
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    transition: "none",

                    "&:hover": {
                      backgroundColor: colors.redDark,
                    },
                  }}
                >
                  + New Sale
                </Box>

                <Box
                  sx={{
                    backgroundColor: `${colors.white}08`,
                    color: colors.white,
                    borderRadius: 2,
                    py: 1,
                    px: 1.5,
                    cursor: "pointer",
                    fontSize: "0.8rem",

                    "&:hover": {
                      backgroundColor: `${colors.white}12`,
                    },
                  }}
                >
                  + Add Stock
                </Box>
              </Box>
            </>
          )}
        </Box>

        {/* ── Nav Items ───────────────────────────────────────────────── */}
        <Box sx={{ px: 1.5, py: 2, flex: 1 }}>
          {!collapsed && (
            <Typography
              sx={{
                color: colors.grey500,
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                px: 1.5,
                mb: 1,
              }}
            >
              Main Menu
            </Typography>
          )}
          <List disablePadding>
            {this.renderNavItems(collapsed)}
          </List>
        </Box>

        <Divider sx={{ borderColor: colors.grey600, mx: collapsed ? 1 : 2 }} />

        {/* ── SMS Bot Status ──────────────────────────────────────────── */}
        <Box sx={{ px: collapsed ? 1 : 2, py: 2 }}>
          {!collapsed && (
            <Box
              sx={{
                backgroundColor: `${colors.white}08`,
                borderRadius: 2,
                p: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <SmartphoneIcon sx={{ color: colors.green, fontSize: 18 }} />
              <Box>
                <Typography
                  sx={{
                    color: colors.white,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  SMS Bot Active
                </Typography>
                <Typography
                  sx={{
                    color: colors.grey400,
                    fontSize: "0.65rem",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  +254 712 345 678
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: colors.green,
                  ml: "auto",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.4 },
                    "100%": { opacity: 1 },
                  },
                }}
              />
            </Box>
          )}

          {/* ── Business Owner ─────────────────────────────────────── */}
          <Tooltip title={collapsed ? "Mama Wanjiru — Kawangware" : ""} placement="right">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: collapsed ? 0 : 1.5,
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: colors.red,
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  flexShrink: 0,
                }}
              >
                MW
              </Avatar>
              {!collapsed && (
                <Box>
                  <Typography
                    sx={{
                      color: colors.white,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Mama Wanjiru
                  </Typography>
                  <Typography
                    sx={{
                      color: colors.grey400,
                      fontSize: "0.7rem",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Kawangware, Nairobi
                  </Typography>
                </Box>
              )}
            </Box>
          </Tooltip>
        </Box>
      </Box>
    );
  };

  render() {
    const { mobileOpen, collapsed } = this.state;
    const drawerWidth = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

    return (
      <>
        {/* ── Mobile hamburger button ─────────────────────────────────── */}
        <IconButton
          onClick={this.toggleMobile}
          sx={{
            display: { xs: "flex", md: "none" },
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 1300,
            backgroundColor: colors.black,
            color: colors.white,
            width: 40,
            height: 40,
            "&:hover": { backgroundColor: colors.blackSoft },
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {mobileOpen ? (
            <CloseIcon fontSize="small" />
          ) : (
            <MenuIcon fontSize="small" />
          )}
        </IconButton>

        {/* ── Mobile drawer ───────────────────────────────────────────── */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={this.toggleMobile}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              backgroundColor: colors.black,
              borderRight: "none",
              // Lock to full viewport height from top
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              overflowY: "auto",
              overflowX: "hidden",
            },
            // Backdrop covers full screen
            "& .MuiBackdrop-root": {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          }}
        >
          {this.renderSidebarContent(false)}
        </Drawer>

        {/* ── Desktop drawer ──────────────────────────────────────────── */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: colors.black,
              borderRight: "none",
              overflow: "hidden",
              transition: "none",
            },
          }}
        >
          {this.renderSidebarContent(collapsed)}
        </Drawer>

        {/* ── Mobile bottom navigation ────────────────────────────────── */}
        <Paper
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            borderTop: `1px solid ${colors.grey200}`,
            // Prevent it from shifting
            width: "100%",
            m: 0,
          }}
          elevation={3}
        >
<BottomNavigation
  value={this.props.activePath}
  onChange={(e, newPath) => this.props.onNavigate(newPath)}
  showLabels={false}
  sx={{
    backgroundColor: colors.black,
    height: 52,
    "& .MuiBottomNavigationAction-root": {
      color: colors.grey400,
      minWidth: 0,
      padding: "6px 0",
      "&.Mui-selected": {
        color: colors.red,
      },
    },
  }}
>
{navItems.slice(0, 5).map((item) => (
  <BottomNavigationAction
    key={item.path}
    value={item.path}
    icon={item.icon}
    sx={{
      minWidth: 0,
      "& .MuiBottomNavigationAction-label": {
        display: "none",
      },
    }}
  />
))}
          </BottomNavigation>
        </Paper>
      </>
    );
  }
}

export default Sidebar;