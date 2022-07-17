import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { UseQueryResult, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchArticleDetail } from 'services/queries'
import { ArticleDetailType } from 'services/types'
import Form from './EditForm'

const EditArticle = () => {
  const { articleId } = useParams()
  const id = articleId || ''

  const { data, isError, isLoading }: UseQueryResult<ArticleDetailType, Error> = 
    useQuery<ArticleDetailType, Error>(['editArticle', id], () => fetchArticleDetail(id), {
      enabled: !!id
    })

  if (isLoading) {
    <>Loading ...</>
  }

  if (isError || !data) return <>Error :/</>

  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Box display="flex" alignItems="center" gap={5} mb={4}>
          <Typography variant="h3">
            Edit article
          </Typography>
          <Button
            type="submit"
            variant="contained"
            size="small"
            form="createArticle"
          >
            Edit Article
          </Button>
        </Box>

        <Form initValues={data}/>
      </Grid>
    </Grid>
  )
}

export default EditArticle
