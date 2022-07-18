import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import RichTextEditor, { EditorValue } from 'react-rte'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: theme.spacing(40),
    borderRadius: theme.spacing(1),
    '&:hover': {
      border: '1px solid'
    }
  }
}))

interface Props {
  defaultValue: string,
  onChange: (v: any) => void
}

const ContentEditor = ({
  defaultValue,
  onChange
}: Props) => {
  const classes = useStyles()

  const [innerValue, setInnerValue] = useState(RichTextEditor.createValueFromString(defaultValue, 'markdown'))

  const handleOnChange = (value: EditorValue) => {
    setInnerValue(value)
    if (onChange) {
      onChange(value.toString('markdown'))
    }
  }

  return (
    <RichTextEditor
      value={innerValue}
      onChange={handleOnChange}
      className={classes.root}
    />
  )
}


export default ContentEditor
