import { RichTextEditor as Editor } from '@mantine/rte'
import { Box } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import { useState } from 'react'
import { FieldError } from 'react-hook-form'
import showdown from 'showdown'
import TurndownService from 'turndown'

interface Props {
  value: string
  onChange: (v: any) => void
  error?: FieldError
  isSubmitted: boolean
}

const RichTextEditor = ({
  value,
  onChange,
  error,
  isSubmitted
}: Props) => {
  const converter = new showdown.Converter()
  const turndownService = new TurndownService()

  const [innerValue, setInnerValue] = useState<string>(converter.makeHtml(value))

  const handleChange = (value: string) => {
    setInnerValue(value)

    const markdown = turndownService.turndown(value)

    if (onChange) {
      onChange(markdown)
    }
  }

  const isError = (error && isSubmitted)

  return (
    <Box>
      <Editor
        value={innerValue}
        onChange={handleChange}
        sx={() => ({

          border: isError ? '1px solid red' : '1px solid rgba(196, 196, 196, 1)',
          '&:hover': {
            border: isError ? '1px solid red' : '1px solid'
          }
        })}
      />
      {isError && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}    
    </Box>

  )
}

export default RichTextEditor 
