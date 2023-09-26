import { createTheme } from "@mui/material/styles";
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

export const radioCanada = Radio_Canada({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const lightTheme = createTheme({
  palette: {
    mode: "light",
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

export default lightTheme;
