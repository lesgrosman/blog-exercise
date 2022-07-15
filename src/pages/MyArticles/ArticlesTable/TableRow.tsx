import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TableRow as MuiTableRow } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { useAuthContext } from 'context/auth'
import { Store } from 'react-notifications-component'
import { useMutation, useQueryClient } from 'react-query'
import { deleteArticle } from 'services/mutations'
import LocalizedDate from 'utils/components/LocalizedDate'
import { ArticleItemType } from 'utils/types'
import { COLS } from './constants'

export const useStyles = makeStyles(() => ({
  perex: {
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
  const classes = useStyles()
  const { accessToken } = useAuthContext()
  const queryClient = useQueryClient()

  const mutation = useMutation((id: string) => deleteArticle(id, accessToken), {
    onSuccess: () => {
      Store.addNotification({
        title: 'Success',
        message: 'Article wa removed!',
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000
        }
      }),
      queryClient.invalidateQueries(['articles'])
    },
    onError: () => {
      Store.addNotification({
        title: 'Error',
        message: 'Try again later!',
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000
        }
      })
    }
  })

  const handleDelete = () => {
    mutation.mutate(item.articleId)
  }

  return (
    <MuiTableRow>
      <TableCell style={COLS.title}>
        <Typography>
          {item.title}
        </Typography>
      </TableCell>
      <TableCell style={COLS.perex}>
        <Box className={classes.perex}>
          <Typography>
            {item.perex}
          </Typography>
        </Box>
      </TableCell>
      <TableCell  style={COLS.creationDate}>
        <Typography>
          <LocalizedDate date={item.createdAt} placeholder="-" isRow />
        </Typography>
      </TableCell>
      <TableCell style={COLS.actions}>
        <IconButton
          color="primary"
          className="iconButton-error mr-3"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={handleDelete}
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