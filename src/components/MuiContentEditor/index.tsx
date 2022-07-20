import { FormHelperText } from '@mui/material'
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { EditorState, RawDraftContentState, convertToRaw } from 'draft-js'
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js'
import MUIRichTextEditor from 'mui-rte'
import { useState } from 'react'
import { FieldError } from 'react-hook-form'

export const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    backgroundColor: theme.palette.grey[200]
  },
  editor: {
    minHeight: theme.spacing(40),
    borderRadius: theme.spacing(1),
    padding: '4px '
  },
  editorError: {
    border: '1px solid rgb(255, 76, 48)',
    '&:hover': {
      border: '1px solid rgb(255, 76, 48)'
    }
  },
  editorNoError: {
    border: '1px solid rgba(196, 196, 196, 1)',
    '&:hover': {
      border: '1px solid'
    }
  }
}))

interface Props {
  value?: string
  onChange?: (v: any) => void
  error?: FieldError
  isSubmitted?: boolean
}

const controls = [
  'title',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'highlight',
  'undo',
  'redo',
  'link',
  'numberList',
  'bulletList',
  'quote',
  'code',
  'clear',
  'save'
]

const MuiContentEditor = ({
  value,
  onChange,
  error,
  isSubmitted
}: Props) => {
  const classes = useStyles()

  const [defaultValue] = useState<RawDraftContentState>(markdownToDraft(value || ''))

  const handleSave = (data: any) => {
    if (onChange) {
      onChange(draftToMarkdown(JSON.parse(data)))
    }
  }

  const handleChange = (data: EditorState) => {
    if (onChange) {
      const content = data.getCurrentContent()
      const rawObject = convertToRaw(content)
      const markdownString = draftToMarkdown(rawObject)
      onChange(markdownString)
    }
  }

  const isError = !!(error && isSubmitted)

  return (
    <Box>
      {isError && <FormHelperText error={!!error}>{error?.message}</FormHelperText>}    
      <Box>  
        <MUIRichTextEditor
          classes={{
            toolbar: classes.toolbar,
            editorContainer: clsx({
              [classes.editor]: true,
              [classes.editorError]: isError,
              [classes.editorNoError]: !isError
            })
          }}
          controls={controls}
          defaultValue={JSON.stringify(defaultValue)}
          onSave={handleSave}
          onChange={handleChange}
          inlineToolbar={true}
        />
      </Box>
    </Box>

  )
}

export default MuiContentEditor
