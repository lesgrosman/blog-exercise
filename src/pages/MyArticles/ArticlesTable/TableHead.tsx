import { TableHead as MuiTableHead, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import React from 'react'
import { Order } from 'utils/types'
import { headCells } from './constants'
import { HeadCell, TableItem } from './types'

interface Props {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableItem) => void
  order: Order
  orderBy: string
}

const TableHead = ({
  onRequestSort,
  order,
  orderBy
}: Props) => {
  const createSortHandler = (property: keyof TableItem) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }
  
  return (
    <MuiTableHead>
      <TableRow>
        {headCells.map((headCell: HeadCell, i) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : undefined}
          >
            {i === (headCells.length - 1) ? (
              <Typography fontWeight={600}>
                {headCell.label}
              </Typography>
            ): (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id as keyof TableItem)}
              >
                <Typography fontWeight={600}>
                  {headCell.label}
                </Typography>
              </TableSortLabel>
            )}

          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  )
}

export default TableHead
