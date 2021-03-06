import { Box, Button, Typography } from '@mui/material'
import { UseQueryResult, useQuery } from 'react-query'
import { fetchArticles } from 'services/queries'
import { ArticlesQueryDataType } from 'services/types'
import { ROUTES } from 'utils/constants'
import ArticlesTable from './ArticlesTable'

const MyArticles = () => {
  const articlesQuery: UseQueryResult<ArticlesQueryDataType, Error> = 
    useQuery<ArticlesQueryDataType, Error>('articles', fetchArticles)
  
  return (
    <Box display="flex" flexDirection="column" gap={5}>
      
      <Box display="flex" alignItems="center" gap={5}>
        <Typography variant="h3">
          My Articles
        </Typography>
        <Button
          component="a"
          variant="contained"
          size="small"
          href={ROUTES.CREATE_ARTICLE}
        >
          Create Article
        </Button>
      </Box>

      <ArticlesTable articlesQuery={articlesQuery} />

    </Box>
  )
}

export default MyArticles
