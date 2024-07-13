import {createTheme, PaletteColorOptions, ThemeOptions} from "@mui/material";
import {red} from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface Palette {
    health: PaletteColorOptions
    stamina: PaletteColorOptions
    tether: PaletteColorOptions
    gray: PaletteColorOptions
  }

  interface PaletteOptions {
    health: PaletteColorOptions
    stamina: PaletteColorOptions
    tether: PaletteColorOptions
    gray: PaletteColorOptions
  }
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    health: true,
    stamina: true,
    tether: true
    gray: true
  }

}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    health: true,
    stamina: true,
    tether: true
    gray: true
  }
}

const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#8e6dbd',
    },
    secondary: {
      main: '#80cbc4',
    },
    health: {
      main: '#d32f2f',
    },
    stamina: {
      main: '#388e3c'
    },
    tether: {
      main: '#512da8'
    },
    gray: {
      main: '#bdbdbd'
    }

  },
  typography: {
    fontFamily: 'Roboto',
  },
});



export default DarkTheme;