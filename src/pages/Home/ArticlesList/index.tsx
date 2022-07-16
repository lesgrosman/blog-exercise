import Box from '@mui/material/Box'
import { UseQueryResult } from 'react-query'
import { sortByDate } from 'utils/sort'
import { ArticlesQueryDataType } from 'utils/types'
import ArticleCard from './ArticleCard'
import SkeletonCard from './SkeletonCard'

interface Props { 
  articlesQuery: UseQueryResult<ArticlesQueryDataType, Error>
}

const ArticlesList = ({
  articlesQuery: {
    isLoading,
    isError,
    data
  }
}: Props) => {
  if (isLoading) {
    const loadingRowsCount = data?.items.length || 4

    return (
      <Box display="flex" flexDirection="column" gap={8}>
        {[ ...Array(loadingRowsCount) ].map((item, index) => (
          <SkeletonCard key={index + 1} />
        ))}
      </Box>
    )
  }

  if (isError || !data) return <>Error :/</>




  return (
    <Box display="flex" flexDirection="column" gap={8}>
      {sortByDate(data.items).map(item => (
        <ArticleCard key={item.articleId} article={item} />
      ))}
    </Box>
  )
}

export default ArticlesList
