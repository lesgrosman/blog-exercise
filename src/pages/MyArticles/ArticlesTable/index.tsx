import { Theme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { UseQueryResult } from 'react-query'
import { ArticlesQueryDataType } from 'services/types'
import { COLS } from './constants'
import TableBody from './TableBody'

export const useStyles = makeStyles((theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.action.hover,
    '& .MuiTypography-root': {
      fontWeight: 600
    }
  }
}))

interface Props {
  articlesQuery: UseQueryResult<ArticlesQueryDataType, Error>
}

const ArticlesTable = ({ articlesQuery }: Props) => {
  const classes = useStyles()

  return (
    <Table className="mb-2">
      <TableHead className={classes.head}>
        <TableRow>
          <TableCell style={COLS.title}>
            <Typography>
              Articles Title
            </Typography>
          </TableCell>
          <TableCell style={COLS.perex}>
            <Typography>
              Perex
            </Typography>
          </TableCell>
          <TableCell style={COLS.creationDate}>
            <Typography>
              Date of creation
            </Typography>
          </TableCell>
          <TableCell style={COLS.actions}>
            <Typography>
              Actions
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody articlesQuery={articlesQuery} />
    
    </Table>
  )
}

export default ArticlesTable
