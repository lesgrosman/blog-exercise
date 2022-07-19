import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { UseQueryResult, useQuery } from 'react-query'
import { fetchArticles } from 'services/queries'
import { ArticlesQueryDataType } from 'services/types'
import List from './List'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderLeft: '1px solid',
    borderColor: theme.palette.divider
  }
}))

const RelatedArticles = () => {
  const classes = useStyles()
  const relatedArticles: UseQueryResult<ArticlesQueryDataType, Error> = 
    useQuery<ArticlesQueryDataType, Error>('relatedArticles', fetchArticles)

  return (
    <Box display="flex" flexDirection="column" gap={6} className={classes.root}>
      <Typography variant="h4">
        Related Articles
      </Typography>

      <List
        relatedArticles={relatedArticles}
      />

    </Box>
  )
}

export default RelatedArticles
