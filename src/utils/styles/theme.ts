import { ThemeOptions } from '@mui/material/styles'
export const PRIMARY_MAIN = '#008893'
export const SECONDARY_MAIN = '#D47E5F'

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY_MAIN
    },
    secondary: {
      main: SECONDARY_MAIN
    }
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    }
  }
}

export default themeOptions
