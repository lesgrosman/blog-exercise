import AccountCircle from '@mui/icons-material/AccountCircle'
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
import { useAuthContext } from 'context/auth'
import React from 'react'

interface Props {
  children?: React.ReactNode
}

export const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    '& .MuiToolbar-root': {
      padding: 0
    }
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
  const { isUser, setIsUser } = useAuthContext()
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    setIsUser(false)
    localStorage.setItem('accessToken', '')
  }

  return (
    <Box className={classes.mainContainer}>
      <AppBar position="static">
        <Container>
          <Toolbar className={classes.header}>
            <Box display="flex">
              <Typography component="a" href="/" className={classes.link}>
                Articles
              </Typography>
              <Typography component="a" href="/about" className={classes.link}>
                About
              </Typography>
            </Box>

            {isUser ? (
              <Box display="flex" className={classes.profileContainer}>
                <Typography component="a" href="/my-articles" className={classes.link}>
                  My Articles
                </Typography>
                <Typography component="a" href="/create-article" className={classes.link}>
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
              <Button color="inherit" component="a" href="/login">Login</Button>
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
