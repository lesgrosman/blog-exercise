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
import { useAuthContext } from 'context/auth'
import moment from 'moment'
import { useSnackbar } from 'notistack'
import { useMutation, useQueryClient } from 'react-query'
import { voteDownComment, voteUpComment } from 'services/mutations'
import { CommentType } from 'services/types'

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
  const { accessToken, isUser } = useAuthContext()
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const mutationVoteUp = useMutation(() => voteUpComment(comment.commentId, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries(['articleComments', comment.articledId])
    },
    onError: () => {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
    }
  })

  const mutationVoteDown = useMutation(() => voteDownComment(comment.commentId, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries(['articleComments', comment.articledId])
    },
    onError: () => {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
    }
  })

  const dateTimeZone =  moment(moment.utc(comment.createdAt)).local().fromNow()

  return (
    <Grid container>
      <Grid item xs={2} sm={1}>
        <Avatar src="/broken-image.jpg" />
      </Grid>

      <Grid item xs={10} sm={11}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            {comment.author}
          </Typography>
          <Typography variant="subtitle2" className={classes.date}>
            {dateTimeZone}
          </Typography>
        </Box>

        <Typography variant="body2">
          {comment.content}
        </Typography>

        {isUser && (
          <Box display="flex" alignItems="center" mt={2}>
            <Typography variant="body1" paddingRight={2}>
              {comment.score}
            </Typography>

            <Divider orientation="vertical" flexItem />

            <IconButton
              onClick={() => mutationVoteDown.mutate()}
              disabled={mutationVoteDown.isLoading}
              className={classes.button}>
              <KeyboardArrowDownIcon />
            </IconButton>

            <Divider orientation="vertical" flexItem />

            <IconButton
              onClick={() => mutationVoteUp.mutate()}
              disabled={mutationVoteUp.isLoading}
              className={classes.button}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          </Box>
        )}

      </Grid>
    </Grid>
  )
}

export default Comment
