import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
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
  }
}))


const Navigation = ({ children }: Props) => {
  const classes = useStyles()
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
            <Button color="inherit" component="a" href="/login">Login</Button>
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
