import Grid from '@mui/material/Grid'
import Hidden from '@mui/material/Hidden'
import Divider from '@mui/material/Divider'
import Detail from './Detail'
import RelatedArticles from './RelatedArticles'
import Comments from './Comments'

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
