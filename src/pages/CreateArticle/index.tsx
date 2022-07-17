import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Form from './CreateForm'

const CreateArticle = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Box display="flex" alignItems="center" gap={5} mb={4}>
          <Typography variant="h3">
            Create new article
          </Typography>
          <Button
            type="submit"
            variant="contained"
            size="small"
            form="createArticle"
          >
            Create Article
          </Button>
        </Box>

        <Form />

      </Grid>
    </Grid>
  )
}

export default CreateArticle
