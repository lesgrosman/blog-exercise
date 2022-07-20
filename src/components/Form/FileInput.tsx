import { FormHelperText } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Image from 'components/Image'
import React, { useEffect, useState } from 'react'
import { UseFormRegister, useController, useFormContext } from 'react-hook-form'
import { CreateArticleFormType } from 'utils/types'

export const useStyles = makeStyles((theme: Theme) => ({
  image: {
    objectFit: 'cover',
    objectPosition: 'center',
    width: theme.typography.pxToRem(150),
    height: theme.typography.pxToRem(100)
  }
}))

interface Props  {
  name: keyof CreateArticleFormType,
  register: UseFormRegister<CreateArticleFormType>
}

const FileInput = ({
  name,
  register
}: Props) => {
  const classes = useStyles()
  const { control } = useFormContext()
  const {
    field: { onChange },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')

  useEffect(() => {
    if (!file) {
      setPreview('')
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const onSelectFile = (e:  React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null)
      return
    }

    onChange(e.target.files)

    setFile(e.target.files[0])
  }

  return (
    <Box display="flex" gap={5}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="h6">
          Upload File
        </Typography>
        <Box display="flex" justifyContent="flex-start">
          <Button variant="contained" component="label">
            Upload
            <input
              {...register(name)}
              onChange={onSelectFile}
              hidden
              accept="image/*"
              type="file"
            />
          </Button>
        </Box>
        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      </Box>
      <Image
        src={preview}
        className={classes.image}
      />
    </Box>

  )
}

export default FileInput
