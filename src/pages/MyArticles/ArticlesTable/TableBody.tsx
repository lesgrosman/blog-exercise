import { TableBody as MuiTableBody } from '@mui/material'
import { UseQueryResult } from 'react-query'
import { ArticleItemType, ArticlesQueryDataType } from 'services/types'
import { getComparator } from 'utils/sort'
import { Order } from 'utils/types'
import SkeletonRow from './SkeletonRow'
import TableRow from './TableRow'
import { TableItem } from './types'

interface Props {
  articlesQuery: UseQueryResult<ArticlesQueryDataType, Error>,
  order: Order
  orderBy: keyof TableItem,
  page: number,
  rowsPerPage: number
}

const TableBody = ({
  articlesQuery: {
    isLoading,
    isError,
    data
  },
  order,
  orderBy,
  page,
  rowsPerPage
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

  const createData = (data: ArticleItemType) => {
    return {
      id: data.articleId,
      title: data.title,
      perex: data.perex,
      date: data.createdAt
    }
  }

  const rows: TableItem[] = data.items.map((item) => createData(item))


  return (
    <MuiTableBody>
      {rows.slice().sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, i) => (
          <TableRow key={row.id} row={row} />
        ))
      }
    </MuiTableBody>
  )
} 

export default TableBody
