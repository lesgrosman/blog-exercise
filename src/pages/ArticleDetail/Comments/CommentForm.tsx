import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

const CommentForm = () => {
  return (
    <Grid container>
      <Grid item xs={1}>
        <Avatar src="/broken-image.jpg" />
      </Grid>
      <Grid item xs={10}>
        <TextField
          fullWidth
          size="small"
          placeholder="Join the discussion!"
        />
      </Grid>
    </Grid>
  )
}

export default CommentForm
