import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { UseQueryResult, useQuery } from 'react-query'
import { fetchArticles } from 'services/queries'
import { ArticlesQueryDataType } from 'services/types'
import ArticlesList from './ArticlesList'

const Home = () => {
  const articlesQuery: UseQueryResult<ArticlesQueryDataType, Error> = 
    useQuery<ArticlesQueryDataType, Error>('articles', fetchArticles)

  return (
    <Grid container>
      <Grid item xs={12} md={9}>
        <Typography variant="h3" mb={5}>
          Recent articles
        </Typography>

        <ArticlesList articlesQuery={articlesQuery} />

      </Grid>
    </Grid>
  )
}

export default Home
