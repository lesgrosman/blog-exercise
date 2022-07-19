import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TableRow as MuiTableRow } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Modal from 'components/Modal'
import { useAuthContext } from 'context/auth'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { deleteArticle } from 'services/mutations'
import { ArticleItemType } from 'services/types'
import LocalizedDate from 'utils/components/LocalizedDate'
import { ROUTES } from 'utils/constants'
import { COLS } from './constants'

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
  item: ArticleItemType
}

const TableRow = ({ item } : Props) => {
  const navigate = useNavigate()
  const classes = useStyles()
  const { accessToken } = useAuthContext()
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const mutation = useMutation(() => deleteArticle(item.articleId, accessToken), {
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
    navigate(`${ROUTES.EDIT_ARTICLE}/${item.articleId}`, { replace: true })
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        title="Confirmation"
        content="Are you sure you want to delete article?"
        onConfirm={handleDelete}
        onClose={() => setModalIsOpen(false)}
      />
      <MuiTableRow>
        <TableCell style={COLS.title}>
          <Box className={classes.textCell}>
            <Typography>
              {item.title}
            </Typography>
          </Box>

        </TableCell>
        <TableCell style={COLS.perex}>
          <Box className={classes.textCell}>
            <Typography>
              {item.perex}
            </Typography>
          </Box>
        </TableCell>
        <TableCell  style={COLS.creationDate}>
          <Typography>
            <LocalizedDate date={item.createdAt} placeholder="-" isRaw />
          </Typography>
        </TableCell>
        <TableCell style={COLS.actions}>
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
    </>

  )
}

export default TableRow
