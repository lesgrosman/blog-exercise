import * as yup from 'yup'

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg']

export const editArticleSchema = yup.object({
  title: yup.string().required(),
  perex: yup.string().max(300, 'Maximum character count is 300').required(),
  content: yup.string().required(),
  image: yup.mixed()
    .test('fileSize', 'File is too large',
      value => !value || !value.length || (value && value.length && value[0]?.size < 2_000_000))
    .test('fileFormat', 'Unsupported Format',
      value => !value || !value.length || (value && value.length && SUPPORTED_FORMATS.includes(value[0].type))
    )
})

export const createArticleSchema = yup.object({
  title: yup.string().required('Add title'),
  perex: yup.string().max(300, 'Maximum character count is 300').required('Add perex'),
  content: yup.string().required('Add content'),
  image: yup.mixed()
    .required('Please upload an image')
    .test('fileSize', 'File is too large',
      value => value && value.length && value[0]?.size < 2_000_000)
    .test('fileFormat', 'Unsupported Format',
      value => value && value.length && SUPPORTED_FORMATS.includes(value[0].type)
    )
})
