import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { AuthProvider } from 'context/auth'
import MainNavigation from 'navigation/MainNavigator'
import { ReactNotifications } from 'react-notifications-component'
import { QueryClient, QueryClientProvider } from 'react-query'
import themeOptions from 'utils/styles/theme'
import 'react-notifications-component/dist/theme.css'


const queryClient = new QueryClient()

const theme = createTheme(themeOptions)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ReactNotifications />
        <AuthProvider>
          <MainNavigation />

        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
