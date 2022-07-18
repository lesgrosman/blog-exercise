import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Pagination from 'components/Pagination'
import { usePaginationContext } from 'context/pagination'
import { UseQueryResult, useQuery } from 'react-query'
import { fetchArticles } from 'services/queries'
import { ArticlesQueryDataType } from 'services/types'
import ArticlesList from './ArticlesList'

const Home = () => {
  const { offset, setOffset, limit } = usePaginationContext()

  const articlesQuery: UseQueryResult<ArticlesQueryDataType, Error> = 
    useQuery<ArticlesQueryDataType, Error>(['articles', offset], () => fetchArticles(limit, offset))

  const handleChangePage = (value: number) => {
    setOffset(value)
  }

  return (
    <Grid container>
      <Grid item xs={12} md={9}>
        <Typography variant="h3" mb={5}>
          Recent articles
        </Typography>

        <ArticlesList articlesQuery={articlesQuery} />

        <Pagination
          limit={limit}
          offset={offset}
          total={articlesQuery?.data?.pagination?.total}
          onChange={handleChangePage}
        />
      </Grid>
    </Grid>
  )
}

export default Home
