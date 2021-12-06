import { responsiveFontSizes } from "@mui/material"
import { red } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"
import Color from "color"

import { fonts, palette } from "../style"
// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
      contrastText: palette.light,
    },
    secondary: {
      main: palette.secondary,
    },
    common: {
      white: palette.light,
      black: palette.dark,
    },
    background: {
      paper: palette.light,
      default: Color(palette.light).darken(0.02).hex(),
    },
    error: {
      main: red.A400,
    },
    facebook: {
      main: "#1877F2",
    },
    whatsapp: {
      main: "#25d366",
    },
    twitter: { main: "#1da1f2" },
    google: { main: "#ea4335" },
  },
  typography: {
    fontFamily: fonts.body.family,
    h1: { fontFamily: fonts.heading.family },
    h2: { fontFamily: fonts.heading.family },
    h3: { fontFamily: fonts.heading.family },
    h4: { fontFamily: fonts.heading.family },
    h5: { fontFamily: fonts.heading.family },
    h6: { fontFamily: fonts.heading.family },
    button: { fontWeight: 900 },
    lead: {
      fontFamily: fonts.body.family,
      "@media (min-width:600px)": {
        fontSize: "1.4rem",
      },
      "@media (min-width:900px)": {
        fontSize: "1.6rem",
      },
      "@media (min-width:1200px)": {
        fontSize: "1.8rem",
      },
      fontSize: "1.2rem",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "md",
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
  },
})

export default responsiveFontSizes(theme)
