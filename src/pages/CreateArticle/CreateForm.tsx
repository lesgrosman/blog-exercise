import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import FileInput from 'components/Form/FileInput'
import TextInput from 'components/Form/TextInput'
import NewEditor from 'components/RichTextEditor'
import { useAuthContext } from 'context/auth'
import { useSnackbar } from 'notistack'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { createArticle, uploadImage } from 'services/mutations'
import { CreateArticleMutation } from 'services/types'
import { ROUTES } from 'utils/constants'
import { CreateArticleFormType } from 'utils/types'
import { createArticleSchema } from 'utils/validation'

const Form = () => {
  const { accessToken } = useAuthContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const mutationCreateArticle = useMutation((data: CreateArticleMutation) => createArticle(data, accessToken), {
    onSuccess: () => {
      navigate(`${ROUTES.HOME}`, { replace: true })
      queryClient.invalidateQueries('articles')
      enqueueSnackbar('Article was successfully added!', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
    }
  })

  const mutationImage = useMutation((image: FormData) => uploadImage(image, accessToken), {
    onSuccess: (data) => {
      mutationCreateArticle.mutate({
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

  const methods = useForm<CreateArticleFormType>({
    defaultValues: {
      title: '',
      perex: '',
      content: '',
      image: null
    },
    resolver: yupResolver(createArticleSchema),
    mode: 'onChange'
  })

  const handleSubmit = methods.handleSubmit((formValues: CreateArticleFormType) => {
    const image = new FormData()

    if (formValues.image) {
      image.append('image', formValues.image[0])
      mutationImage.mutate(image)
    } else {
      mutationCreateArticle.mutate({
        title: formValues.title,
        perex: formValues.perex,
        content: formValues.content
      })
    }
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
            multiline
            minRows={4}
            type="text"
            fullWidth
            size="small"
            autoComplete="off"
            placeholder="My First Article"
          />

          <FileInput
            name="image"
            register={methods.register}
          />

          <Controller 
            name="content"
            control={methods.control}
            render={({
              field: { value, onChange },
              fieldState: { error },
              formState: { isSubmitted }
            }) => {
              return (
                <NewEditor value={value} onChange={onChange} error={error} isSubmitted={isSubmitted} />
              )
            }}
          />
        </Box>
      </form>
    </FormProvider>
  )
}

export default Form
