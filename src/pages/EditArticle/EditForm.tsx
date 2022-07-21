import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import FileInput from 'components/Form/FileInput'
import TextInput from 'components/Form/TextInput'
import MuiContentEditor from 'components/MuiContentEditor'
import { useAuthContext } from 'context/auth'
import { useSnackbar } from 'notistack'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { editArticle, uploadImage } from 'services/mutations'
import { ArticleDetailType, EditArticleMutation } from 'services/types'
import { ROUTES } from 'utils/constants'
import { EditArticleFormType } from 'utils/types'
import { editArticleSchema } from 'utils/validation'

interface Props {
  article: ArticleDetailType
}

const Form = ({ article }: Props) => {
  const { accessToken } = useAuthContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const mutationEditArticle = useMutation((data: EditArticleMutation) =>
    editArticle(article.articleId, data, accessToken),
  {
    onSuccess: () => {
      enqueueSnackbar('Article wa edited!', { variant: 'success' })
      navigate(`${ROUTES.HOME}`, { replace: true })
      queryClient.invalidateQueries('articles')
    },
    onError: () => {
      enqueueSnackbar('Something went wrong!', { variant: 'error' })
    }
  })

  const mutationImage = useMutation((image: FormData) => uploadImage(image, accessToken), {
    onSuccess: (data) => {
      mutationEditArticle.mutate({
        title: methods.getValues('title'),
        perex: methods.getValues('perex'),
        content: methods.getValues('content'),
        imageId: data.data[0].imageId
      })
    },
    onError: () => {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
    }
  })

  const methods = useForm<EditArticleFormType>({
    defaultValues: {
      title: article.title || '',
      perex: article.perex || '',
      content: article.content || '',
      image: null
    },
    resolver: yupResolver(editArticleSchema),
    mode: 'onChange'
  })

  const handleSubmit = methods.handleSubmit((formValues: EditArticleFormType) => {
    const image = new FormData()

    if (formValues.image?.length) {
      image.append('image', formValues.image[0])
      mutationImage.mutate(image)
    } else {
      mutationEditArticle.mutate({
        title: formValues.title,
        perex: formValues.perex,
        content: formValues.content
      })
    }
  })

  return (
    <FormProvider  {...methods}>
      <form onSubmit={handleSubmit} id="editArticle">
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
            multiline
            minRows={4}
            fullWidth
            size="small"
            autoComplete="off"
            placeholder="My First Article"
          />

          <FileInput
            name="image"
            register={methods.register}
            imageId={article.imageId}
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
