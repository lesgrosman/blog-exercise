import { Pagination as MuiPagination } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import React, { useCallback } from 'react'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4)
  }
}))


interface Props {
  total?: number,
  limit?: number,
  offset?: number,
  inputName?: string,
  onChange: (value: number) => void,
}


const Pagination = ({
  total = 1,
  limit = 1,
  offset = 0,
  onChange
}: Props) => {
  const classes = useStyles()

  const pageCount = Math.ceil(total / limit) || 1
  const currentPage = offset === 0 ? 1 : Math.trunc(offset / limit) + 1

  const handleChange = useCallback(
    (e: React.ChangeEvent<unknown>, newPage: number) => {
      onChange((newPage - 1) * limit)
    },
    [ limit, onChange ]
  )

  return (
    <MuiPagination
      className={classes.root}
      color="primary"
      count={pageCount}
      page={currentPage}
      onChange={handleChange}
    />
  )
}

export default Pagination
