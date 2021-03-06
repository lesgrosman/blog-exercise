import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Hidden from '@mui/material/Hidden'
import Comments from './Comments'
import Detail from './Detail'
import RelatedArticles from './RelatedArticles'

const ArticleDetail = () => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Detail />
        <Divider />
        <Comments />
      </Grid>

      <Hidden mdDown>
        <Grid item xs={4}>
          <RelatedArticles />
        </Grid>
      </Hidden>
    </Grid>
  )
}

export default ArticleDetail
