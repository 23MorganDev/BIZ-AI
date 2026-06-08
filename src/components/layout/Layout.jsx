import React, { Component } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { colors } from "../../theme/theme";

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 72;

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarCollapsed: false,
    };
  }


  handleRefresh = () => {
    if (this.props.onRefresh) {
      this.props.onRefresh();
    }
  };

  getPageTitle = (path) => {
    const titles = {
      "/": "Dashboard",
      "/transactions": "Transactions",
      "/stock": "Stock Levels",
      "/reports": "Reports",
      "/settings": "Settings",
    };
    return titles[path] || "Dashboard";
  };

  render() {
  const { children, activePath, onNavigate } = this.props;
    const { sidebarCollapsed } = this.state;
    const drawerWidth = sidebarCollapsed
      ? COLLAPSED_WIDTH
      : DRAWER_WIDTH;

    return (
      // ── Root — full screen, two columns ──────────────────────────
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          backgroundColor: colors.smokeWhite,
          // Prevent any horizontal movement
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {/* ── Column 1 — Sidebar fixed width ───────────────────────── */}
        <Box
          sx={{
            width: { xs: 0, md: drawerWidth },
            minWidth: { xs: 0, md: drawerWidth },
            flexShrink: 0,
            position: "relative",
            zIndex: 1200,
          }}
        >
          <Sidebar
            activePath={activePath}
            onNavigate={onNavigate}
            onCollapseChange={(collapsed) =>
              this.setState({ sidebarCollapsed: collapsed })
            }
          />
        </Box>

        {/* ── Column 2 — Header + Content fills remaining space ────── */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden",
            mb: { xs: "56px", md: 0 },
          }}
        >
          {/* ── Header ─────────────────────────────────────────────── */}
          <Header
            title={this.getPageTitle(activePath)}
            onRefresh={this.handleRefresh}
            notificationCount={3}
          />

          {/* ── Content area — only this scrolls vertically ────────── */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, sm: 3, md: 4 },
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Layout;