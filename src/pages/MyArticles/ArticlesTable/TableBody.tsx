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
    data
  }
}: Props) => {

  if (isLoading) {
    const loadingRowsCount = data?.items.length || 6

    return (
      <MuiTableBody>
        {[ ...Array(loadingRowsCount) ].map((item, index) => (
          <SkeletonRow key={index + 1} />
        ))}
      </MuiTableBody>
    )
  }

  if (isError || !data) return <>Error</>

  return (
    <MuiTableBody>
      {data.items.map((item : ArticleItemType) => (
        <TableRow key={item.articleId} item={item} />
      ))}
    </MuiTableBody>
  )
}

export default TableBody
