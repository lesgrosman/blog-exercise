import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { AuthProvider } from 'context/auth'
import { PaginationProvider } from 'context/pagination'
import MainNavigation from 'navigation/MainNavigator'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'
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
            <PaginationProvider>

              <MainNavigation />

            </PaginationProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SnackbarProvider>

    </ThemeProvider>
  )
}

export default App
