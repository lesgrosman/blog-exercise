import { CSSProperties } from '@mui/material/styles/createTypography'
import { HeadCell } from './types'

export const headCells: HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    label: 'Title'
  },
  {
    id: 'perex',
    numeric: false,
    label: 'Perex'
  },
  {
    id: 'date',
    numeric: false,
    label: 'Creation Date'
  },
  {
    id: 'actions',
    numeric: false,
    label: 'Actions'
  }
]

export const COLS = {
  title: {
    minWidth: 250,
    maxWidth: 250
  } as CSSProperties,
  perex: {
    minWidth: 400,
    maxWidth: 400
  } as CSSProperties,
  creationDate: {
    minWidth: 150,
    maxWidth: 150
  } as CSSProperties,
  actions: {
    minWidth: 150,
    maxWidth: 150,
    boxSizing: 'content-box'
  } as CSSProperties
}

