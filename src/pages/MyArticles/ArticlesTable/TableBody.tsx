import { TableBody as MuiTableBody } from '@mui/material'
import { UseQueryResult } from 'react-query'
import { ArticleItemType, ArticlesQueryDataType } from 'services/types'
import { sortByDate } from 'utils/sort'
import SkeletonRow from './SkeletonRow'
import TableRow from './TableRow'

interface Props {
  articlesQuery: UseQueryResult<ArticlesQueryDataType, Error>
}

const TableBody = ({
  articlesQuery: {
    isLoading,
    isError,
    data: queryData
  }
}: Props) => {

  if (isLoading) {
    const loadingRowsCount = queryData?.items.length || 6

    return (
      <MuiTableBody>
        {[ ...Array(loadingRowsCount) ].map((item, index) => (
          <SkeletonRow key={index + 1} />
        ))}
      </MuiTableBody>
    )
  }

  if (isError || !queryData) return <>Error</>

  const sortedItems = sortByDate(queryData.items)

  return (
    <MuiTableBody>
      {sortedItems?.map((item : ArticleItemType) => (
        <TableRow key={item.articleId} item={item} />
      ))}
    </MuiTableBody>
  )
}

export default TableBody
