// src/theme/muiTheme.js
import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.secondary,
      contrastText: "#ffffff",
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
});
