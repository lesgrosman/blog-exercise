import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TableRow as MuiTableRow } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import { makeStyles } from '@mui/styles'
import Modal from 'components/Modal'
import { useAuthContext } from 'context/auth'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { deleteArticle } from 'services/mutations'
import LocalizedDate from 'utils/components/LocalizedDate'
import { ROUTES } from 'utils/constants'
import { COLS } from './constants'
import { TableItem } from './types'

export const useStyles = makeStyles(() => ({
  textCell: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  }
}))

interface Props {
  row: TableItem
}
const TableRow = ({
  row
}: Props) => {
  const classes = useStyles()
  const { accessToken } = useAuthContext()
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const mutation = useMutation(() => deleteArticle(row.id, accessToken), {
    onSuccess: () => {
      enqueueSnackbar('Article wa deleted', { variant: 'success' })
      queryClient.invalidateQueries(['articles'])
    },
    onError: () => {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
    }
  })

  const handleDelete = () => {
    setModalIsOpen(false)
    mutation.mutate()
  }

  const handleEdit = () => {
    navigate(`${ROUTES.EDIT_ARTICLE}/${row.id}`, { replace: true })
  }

  return (
    <MuiTableRow hover>
      <Modal
        isOpen={modalIsOpen}
        title="Confirmation"
        content="Are you sure you want to delete article?"
        onConfirm={handleDelete}
        onClose={() => setModalIsOpen(false)}
      />
      <TableCell
        className={classes.textCell}
        component="th"
        scope="row"
        style={COLS.title}
      >
        <Box className={classes.textCell}>
          {row.title}
        </Box>
      </TableCell>
      <TableCell
        className={classes.textCell}
        align="left"
        style={COLS.perex}
      >
        <Box className={classes.textCell}>
          {row.perex}
        </Box>
      </TableCell>
      <TableCell
        align="left"
        style={COLS.creationDate}
      >
        <LocalizedDate date={row.date} isRaw/>
      </TableCell>
      <TableCell 
        align="left"
        style={COLS.actions}
      >
        <IconButton
          onClick={handleEdit}
          color="primary"
          className="iconButton-error mr-3"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => setModalIsOpen(true)}
          disabled={mutation.isLoading}
          color="error"
          className="iconButton-error"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </MuiTableRow>
  )
}

export default TableRow
