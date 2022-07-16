import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { ReactNode } from 'react'

export const useStyles = makeStyles((theme: Theme) => ({
  gridWide: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  panelWrapperImage: {
    position: 'relative',
    width: 280,
    maxWidth: 280,
    minWidth: 280,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: 'unset',
      minWidth: 'unset',
      paddingTop: '66.66%'
    }
  },
  panelImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  panelContent: {
    width: '100%'
  }
}))

interface Props {
  title: ReactNode
  perex: ReactNode
  date: ReactNode
  image: ReactNode
  linkButton: ReactNode
}

const CardLayout = ({
  title, 
  perex, 
  date,
  image,
  linkButton
}: Props) => {
  const classes = useStyles()
  return (
    <Paper elevation={0}>
      <Box className={classes.gridWide} gap={5}>

        <Box className={classes.panelWrapperImage}>
          <Box className={classes.panelImage}>
            {image}
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          className={classes.panelContent}
        >
          {title}
          {date}
          {perex}
          {linkButton}
        </Box>

      </Box>
    </Paper>
  )
}

export default CardLayout
