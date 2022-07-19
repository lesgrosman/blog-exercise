import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'

interface Props {
  title: string
  content?: string
  confirm?: string
  cancel?: string
  isOpen: boolean,
  onClose: () => void
  onConfirm: () => void
}

const Modal = ({
  title,
  content, 
  confirm = 'Yes',
  cancel = 'Cancel',
  isOpen,
  onClose,
  onConfirm
}: Props) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle>
      {title}
    </DialogTitle>
    {content && (
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
    )}
    <DialogActions>
      <Button onClick={onConfirm}>{confirm}</Button>
      <Button onClick={onClose}>
        {cancel}
      </Button>
    </DialogActions>
  </Dialog>
)

export default Modal
