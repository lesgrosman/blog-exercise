import AccountCircle from '@mui/icons-material/AccountCircle'
import { Theme } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useAuthContext } from 'store/auth'
import { ROUTES } from 'utils/constants'
import { useAuth } from 'utils/hooks/useAuth'

interface Props {
  children?: React.ReactNode
}

export const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    '& .MuiToolbar-root': {
      padding: 0
    },
    marginBottom: theme.spacing(10)
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& .MuiBox-root': {
      gap: 40
    }
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  content: {
    paddingTop: 48
  },
  profileContainer: {
    alignItems: 'center'
  }
}))


const Navigation = ({ children }: Props) => {
  const { isUser } = useAuthContext()
  const { logout } = useAuth()
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    logout()
  }

  return (
    <Box className={classes.mainContainer}>
      <AppBar position="sticky">
        <Container>
          <Toolbar className={classes.header}>
            <Box display="flex">
              <Typography component="a" href={ROUTES.HOME} className={classes.link}>
                Articles
              </Typography>
            </Box>

            {isUser ? (
              <Box display="flex" className={classes.profileContainer}>
                <Typography
                  component="a"
                  href={ROUTES.MY_ARTICLES}
                  className={classes.link}
                >
                  My Articles
                </Typography>

                <Typography
                  component="a"
                  href={ROUTES.CREATE_ARTICLE}
                  className={classes.link}
                >
                  Create Article
                </Typography>

                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                  </Menu>
                </div>
              </Box>
            ) : (
              <Button color="inherit" component="a" href={ROUTES.LOGIN}>Login</Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Container className={classes.content}>
        {children}
      </Container>

    </Box>
  )
}

export default Navigation
