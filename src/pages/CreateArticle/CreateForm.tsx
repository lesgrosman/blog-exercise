import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useAuthContext } from 'context/auth'
import { useForm } from 'react-hook-form'
import { Store } from 'react-notifications-component'
import { useMutation, useQueryClient } from 'react-query'
import { createArticle } from 'services/mutations'
import { CreateArticleMutation } from 'services/types'
import { CreateArticleFormType } from 'utils/types'
import * as z from 'zod'

const schema = z.object({
  title: z.string().min(1, 'This field is required'),
  perex: z.string()
    .min(1, 'This field is requiered')
    .max(200, 'Maximum character count is 200'),
  content: z.string().min(1, 'This field is required')
})


const CreateForm = () => {
  const { accessToken } = useAuthContext()
  const queryClient = useQueryClient()

  const mutationArticle = useMutation((data: CreateArticleMutation) => createArticle(data, accessToken), {
    onSuccess: () => {
      reset(),
      Store.addNotification({
        title: 'Success',
        message: 'Article wa successfully created!',
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000
        }
      }),
      queryClient.invalidateQueries('articles')
    },
    onError: () => {
      Store.addNotification({
        title: 'Error',
        message: 'Something went wrong:(',
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
  } = useForm<CreateArticleFormType>({
    defaultValues: {
      content: ''
    },
    resolver: zodResolver(schema),
    mode: 'onChange'
  })
  
  return (
    <form>
      <Box display="flex" flexDirection="column" gap={5}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">
            Article title
          </Typography>
          <TextField
            {...register('title')}
            type="text"
            fullWidth
            size="small"
            autoComplete="off"
            placeholder="My First Article"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </Box>

        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">
            Article annotation
          </Typography>
          <TextField
            {...register('perex')}
            type="text"
            fullWidth
            multiline
            minRows={4}
            size="small"
            autoComplete="off"
            placeholder="Article description"
            error={!!errors.perex}
            helperText={errors.perex?.message}
          />
        </Box>
      </Box>
    </form>
  )
}

export default CreateForm
