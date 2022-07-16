import { zodResolver } from '@hookform/resolvers/zod'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useAuthContext } from 'context/auth'
import { useForm } from 'react-hook-form'
import { Store } from 'react-notifications-component'
import { useMutation, useQueryClient } from 'react-query'
import { addComment } from 'services/mutations'
import { AddCommentMutation } from 'services/types'
import * as z from 'zod'

type CommentFormType = {
  content: string
}

const schema = z.object({
  content: z.string().min(1, 'Cannot leave empty comment!')
})

interface Props {
  articleId: string
}

const CommentForm = ({
  articleId
}: Props) => {
  const { accessToken, isUser } = useAuthContext()
  const queryClient = useQueryClient()

  const mutationComment = useMutation((data: AddCommentMutation) => addComment(data, accessToken), {
    onSuccess: () => {
      reset(),
      Store.addNotification({
        title: 'Success',
        message: 'Comment was added!',
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000
        }
      }),
      queryClient.invalidateQueries(['articleComments', articleId])
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

  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, isSubmitting, errors }
  } = useForm<CommentFormType>({
    defaultValues: {
      content: ''
    },
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  const handleFormSubmit = (data: CommentFormType) => {
    if (isValid && isUser) {
      mutationComment.mutate({
        articleId,
        content: data.content,
        author: 'Les Grosman'
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
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button type="submit" disabled={isSubmitting}>
          Leave comment
        </Button>
      </Box>

    </form>

  )
}

export default CommentForm