import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import { useMemo } from 'react'
import { UseQueryResult } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { ArticlesQueryDataType } from 'services/types'
import { sortByDate } from 'utils/sort'
import SkeletonItem from './SkeletonItem'

export const useStyles = makeStyles(() => ({
  perex: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical'
  },
  link: {
    textDecoration: 'none'
  }
}))

interface Props {
  relatedArticles: UseQueryResult<ArticlesQueryDataType, Error>
}

const List = ({
  relatedArticles: {
    data,
    isLoading,
    isError
  }
}: Props) => {
  const classes = useStyles()
  const { articleId } = useParams()
  if (isLoading) {
    const loadingRowsCount = data?.items.length || 4

    return (
      <Box display="flex" flexDirection="column" gap={4}>
        {[ ...Array(loadingRowsCount) ].map((item, index) => (
          <SkeletonItem key={index + 1} />
        ))}
      </Box>
    )
  }

  if (isError || !data) return <>Error :/</>

  const newestRelated = sortByDate(data.items.filter(item => item.articleId !== articleId)).slice(0, 5)

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={4}>
      {newestRelated.map(item => (
        <Box key={item.articleId} display="flex" flexDirection="column">
          <Link to={`/articles/${item.articleId}`} className={classes.link}>
            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
              {item.title}
            </Typography>
          </Link>

          <Typography variant="body2" className={classes.perex}>
            {item.perex}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default List
