import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import TextInput from 'components/Form/TextInput'
import MuiContentEditor from 'components/MuiContentEditor'
import { useAuthContext } from 'context/auth'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Store } from 'react-notifications-component'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { editArticle } from 'services/mutations'
import { ArticleDetailType, CreateArticleMutation } from 'services/types'
import { ROUTES } from 'utils/constants'
import { CreateArticleFormType } from 'utils/types'
import { articleDetailSchema } from 'utils/validation'

interface Props {
  initValues: ArticleDetailType
}

const Form = ({ initValues }: Props) => {
  const { accessToken } = useAuthContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutationEditArticle = useMutation((data: CreateArticleMutation) =>
    editArticle(initValues.articleId, data, accessToken),
  {
    onSuccess: () => {
      Store.addNotification({
        title: 'Success',
        message: 'Article wa successfully edited!',
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000
        }
      }),
      navigate(`${ROUTES.HOME}`, { replace: true })
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

  const methods = useForm<CreateArticleFormType>({
    defaultValues: {
      title: initValues.title || '',
      perex: initValues.perex || '',
      content: initValues.content || ''
    },
    resolver: zodResolver(articleDetailSchema),
    mode: 'onChange'
  })

  const handleSubmit = methods.handleSubmit((formData: CreateArticleFormType) => {
    mutationEditArticle.mutate(formData)
  })

  return (
    <FormProvider  {...methods}>
      <form onSubmit={handleSubmit} id="createArticle">
        <Box display="flex" flexDirection="column" gap={5}>
          <TextInput
            name="title"
            title="Article Title"
            type="text"
            fullWidth
            size="small"
            autoComplete="off"
            placeholder="My First Article"
          />
          <TextInput
            name="perex"
            title="Article annotation"
            type="text"
            fullWidth
            size="small"
            autoComplete="off"
            placeholder="My First Article"
          />
          <Controller 
            name="content"
            control={methods.control}
            render={({ field: { value, onChange } }) => {
              return (
                <MuiContentEditor value={value} onChange={onChange} />
              )
            }}
          />
        </Box>
      </form>
    </FormProvider>
  )
}

export default Form
