import Box from '@mui/material/Box'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useController, useFormContext } from 'react-hook-form'

interface Props extends Omit<TextFieldProps, 'name, title'>{
  title: string
  name: string
}

const TextInput = ({
  title,
  name,
  ...rest
}: Props) => {
  const { control } = useFormContext()
  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="h6">
        {title}
      </Typography>
      <TextField
        {...rest}
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error?.message}
      />
    </Box>
  )
}

export default TextInput
