import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import LocalizedDate from 'utils/components/LocalizedDate'
import { CommentType } from 'utils/types'

export const useStyles = makeStyles((theme: Theme) => ({
  date: {
    color: theme.palette.text.disabled
  },
  button: {
    '&.MuiButtonBase-root:hover': {
      backgroundColor: 'transparent'
    }
  }
}))

interface Props {
  comment: CommentType
}

const Comment = ({ comment }: Props) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={1}>
        <Avatar src="/broken-image.jpg" />
      </Grid>

      <Grid item xs={11}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            {comment.author}
          </Typography>
          <Typography variant="subtitle2" className={classes.date}>
            <LocalizedDate date={comment.postedAt} isRow />
          </Typography>
        </Box>

        <Typography variant="body2">
          {comment.content}
        </Typography>

        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="body1" paddingRight={2}>
            {comment.score}
          </Typography>

          <Divider orientation="vertical" flexItem />

          <IconButton className={classes.button}>
            <KeyboardArrowDownIcon />
          </IconButton>

          <Divider orientation="vertical" flexItem />

          <IconButton className={classes.button}>
            <KeyboardArrowUpIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Comment
