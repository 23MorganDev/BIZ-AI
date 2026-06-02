import { createTheme } from "@mui/material/styles";

// ── Brand Colors ──────────────────────────────────────────────────────────────
// Change any color here and it updates everywhere in the app
export const colors = {
  // Primary
  red: "#CF1239",
  redDark: "#A50E2D",
  redLight: "#F5E6EA",

  // Neutrals
  black: "#0A0A0A",
  blackSoft: "#1A1A1A",
  smokeWhite: "#F5F5F0",
  smokeWhiteDark: "#EBEBЕ6",
  white: "#FFFFFF",
  grey100: "#F7F7F7",
  grey200: "#E8E8E8",
  grey300: "#D0D0D0",
  grey400: "#A0A0A0",
  grey500: "#6B6B6B",
  grey600: "#4A4A4A",

  // Status colors
  green: "#16A34A",
  greenLight: "#DCFCE7",
  greenDark: "#15803D",
  amber: "#D97706",
  amberLight: "#FEF3C7",
  danger: "#CF1239",
  dangerLight: "#F5E6EA",

  // Chart colors
  chartPrimary: "#CF1239",
  chartSecondary: "#16A34A",
  chartTertiary: "#D97706",
  chartQuaternary: "#0A0A0A",
};

// ── Typography ────────────────────────────────────────────────────────────────
const typography = {
  fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: "2.5rem",
    color: colors.black,
    letterSpacing: "-0.02em",
  },
  h2: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: "2rem",
    color: colors.black,
    letterSpacing: "-0.01em",
  },
  h3: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    fontSize: "1.5rem",
    color: colors.black,
  },
  h4: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    fontSize: "1.25rem",
    color: colors.black,
  },
  h5: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    fontSize: "1rem",
    color: colors.black,
  },
  h6: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    fontSize: "0.875rem",
    color: colors.grey600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  body1: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "0.9375rem",
    color: colors.grey600,
    lineHeight: 1.6,
  },
  body2: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "0.8125rem",
    color: colors.grey500,
    lineHeight: 1.5,
  },
  caption: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "0.75rem",
    color: colors.grey400,
    letterSpacing: "0.04em",
  },
};

// ── MUI Theme ─────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.red,
      dark: colors.redDark,
      light: colors.redLight,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.black,
      contrastText: colors.white,
    },
    success: {
      main: colors.green,
      light: colors.greenLight,
      dark: colors.greenDark,
    },
    warning: {
      main: colors.amber,
      light: colors.amberLight,
    },
    error: {
      main: colors.danger,
      light: colors.dangerLight,
    },
    background: {
      default: colors.smokeWhite,
      paper: colors.white,
    },
    text: {
      primary: colors.black,
      secondary: colors.grey500,
    },
    divider: colors.grey200,
  },
  typography,
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0,0,0,0.06), 0px 1px 2px rgba(0,0,0,0.04)",
    "0px 4px 6px rgba(0,0,0,0.05), 0px 2px 4px rgba(0,0,0,0.04)",
    "0px 10px 15px rgba(0,0,0,0.07), 0px 4px 6px rgba(0,0,0,0.04)",
    "0px 20px 25px rgba(0,0,0,0.08), 0px 10px 10px rgba(0,0,0,0.04)",
    ...Array(20).fill("none"),
  ],
  components: {
    // ── MUI Button overrides ──────────────────────────────────────────────────
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          borderRadius: 8,
          padding: "10px 20px",
          fontSize: "0.875rem",
        },
        containedPrimary: {
          background: colors.red,
          "&:hover": {
            background: colors.redDark,
            boxShadow: `0 4px 12px ${colors.red}40`,
          },
        },
      },
    },
    // ── MUI Card overrides ────────────────────────────────────────────────────
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${colors.grey200}`,
          boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
            transform: "translateY(-1px)",
            transition: "all 0.2s ease",
          },
        },
      },
    },
    // ── MUI Table overrides ───────────────────────────────────────────────────
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: colors.grey100,
            color: colors.grey600,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            borderBottom: `2px solid ${colors.grey200}`,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.875rem",
          borderBottom: `1px solid ${colors.grey100}`,
          padding: "14px 16px",
        },
      },
    },
    // ── MUI Chip overrides ────────────────────────────────────────────────────
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          fontSize: "0.75rem",
          borderRadius: 6,
        },
      },
    },
    // ── MUI AppBar overrides ──────────────────────────────────────────────────
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.white,
          color: colors.black,
          boxShadow: `0 1px 0 ${colors.grey200}`,
        },
      },
    },
    // ── MUI Drawer overrides ──────────────────────────────────────────────────
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.black,
          color: colors.white,
          borderRight: "none",
        },
      },
    },
  },
});

export default theme;