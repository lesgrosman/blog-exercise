import { yupResolver } from '@hookform/resolvers/yup'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { addComment } from 'services/mutations'
import { AddCommentMutation } from 'services/types'
import { useAuthContext } from 'store/auth'
import * as yup from 'yup'

type CommentFormType = {
  name: string
  content: string
}

const schema = yup.object({
  name: yup.string().required('Enter your name'),
  content: yup.string().required('Cannot leave empty comment!')
})

interface Props {
  articleId: string
}

const CommentForm = ({
  articleId
}: Props) => {
  const { token, isUser } = useAuthContext()
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const mutationComment = useMutation((data: AddCommentMutation) => addComment(data, token?.accessToken), {
    onSuccess: () => {
      reset(),
      enqueueSnackbar('Comment was added', { variant: 'success' })
      queryClient.invalidateQueries(['articleComments', articleId])
    },
    onError: () => {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
    }
  })

  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, isSubmitting, errors }
  } = useForm<CommentFormType>({
    defaultValues: {
      content: ''
    },
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const handleFormSubmit = (data: CommentFormType) => {
    if (isValid && isUser) {
      mutationComment.mutate({
        articleId,
        content: data.content,
        author: data.name
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container>
        <Grid item xs={2} sm={1}>
          <Avatar src="/broken-image.jpg" />
        </Grid>
        <Grid item xs={10} sm={11}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              {...register('content')}
              type="text"
              fullWidth
              size="small"
              autoComplete="off"
              placeholder="Join the discussion!"
              error={!!errors.content}
              helperText={errors.content?.message}
            />
            <Grid item container>
              <Grid item>
                <TextField
                  {...register('name')}
                  type="text"
                  size="small"
                  autoComplete="off"
                  placeholder="Your name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item>
                <Button type="submit" disabled={isSubmitting}>
                  Leave comment
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

    </form>

  )
}

export default CommentForm
