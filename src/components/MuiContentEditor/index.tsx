import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { EditorState, RawDraftContentState, convertToRaw } from 'draft-js'
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js'
import MUIRichTextEditor from 'mui-rte'
import { useState } from 'react'


export const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    backgroundColor: theme.palette.grey[200]
  },
  editor: {
    minHeight: theme.spacing(40),
    border: '1px solid rgba(196, 196, 196, 1)',
    borderRadius: theme.spacing(1),
    padding: '4px ',
    '&:hover': {
      border: '1px solid'
    }
  }
}))

interface Props {
  value?: string
  onChange?: (v: any) => void
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
  onChange
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

  return (
    <MUIRichTextEditor
      classes={{
        toolbar: classes.toolbar,
        editorContainer: classes.editor
      }}
      controls={controls}
      defaultValue={JSON.stringify(defaultValue)}
      onSave={handleSave}
      onChange={handleChange}
      inlineToolbar={true}
    />
  )
}

export default MuiContentEditor
