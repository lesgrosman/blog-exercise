import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { COLS } from './constants'


const SkeletonRow: React.FC = () => (
  <TableRow>
    <TableCell style={COLS.title}>
      <Skeleton animation="wave" variant="text" width="100%" />
    </TableCell>
    <TableCell style={COLS.perex}>
      <Skeleton animation="wave" variant="text" width="100%" />
    </TableCell>
    <TableCell style={COLS.creationDate}>
      <Skeleton animation="wave" variant="text" width="100%" />
    </TableCell>
    <TableCell style={COLS.actions}>
      <Box display="flex" gap={2}>
        <Skeleton
          animation="wave"
          variant="circular"
          width={36}
          height={36}
        />
        <Skeleton
          animation="wave"
          variant="circular"
          width={36}
          height={36}
        />
      </Box>
    </TableCell>
  </TableRow>
)

export default SkeletonRow
