import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Radio_Canada } from "next/font/google";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // extra small devices 0px to 360px
    mm: true; // medium mobile devices 360px to 390px
    ml: true; // large mobile devices 390px to 600px
    sm: true; // small devices 600px to 900px
    md: true; // medium devices 900px to 1200px
    lg: true; // large devices 1200px to 1536px
    xl: true; // extra large devices 1536px and above
  }
}

const radioCanada = Radio_Canada({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
let lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgba(47, 94, 215, 1)",
      dark: "rgba(30, 136, 229, 1)",
      light: "rgba(66, 165, 245, 1)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    secondary: {
      main: "rgba(156, 39, 176, 1)",
      dark: "rgba(123, 31, 162, 1)",
      light: "rgba(186, 104, 200, 1)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    background: {
      paper: "rgba(251, 251, 251, 1)",
      default: "rgba(255, 255, 255, 1)",
    },
    action: {
      active: "rgba(0, 0, 0, 0.12)",
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      focus: "rgba(0, 0, 0, 0.12)",
      disabled: "rgba(0, 0, 0, 0.04)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
  },
  typography: {
    fontFamily: radioCanada.style.fontFamily,
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    overline: {
      textTransform: "none",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      mm: 360,
      ml: 390,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {},
});

lightTheme = {
  ...lightTheme,
  typography: {
    ...lightTheme.typography,
    button: {
      ...lightTheme.typography.body1, //  applying the body1 style to the buttons because default text button is to small
      textTransform: "none",
      fontWeight: 700,
    },
  },
};

lightTheme = responsiveFontSizes(lightTheme, {
  breakpoints: ["xs", "sm", "md", "lg", "xl"],
  factor: 1.8,
});

export default lightTheme;
