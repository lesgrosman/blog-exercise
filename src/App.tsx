import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import MainNavigation from 'navigation/MainNavigator'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from 'store/auth'
import themeOptions from 'utils/styles/theme'


const queryClient = new QueryClient()

const theme = createTheme(themeOptions)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>

            <MainNavigation />

          </AuthProvider>
        </QueryClientProvider>
      </SnackbarProvider>

    </ThemeProvider>
  )
}

export default App
