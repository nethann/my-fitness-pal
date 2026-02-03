import type { ReactNode } from 'react'
import { Modal, Button } from 'react-bootstrap'

interface CustomModalProps {
  show: boolean
  onHide: () => void
  title: string
  children: ReactNode
  onSave?: () => void
  saveText?: string
  cancelText?: string
}

function CustomModal({ 
  show, 
  onHide, 
  title, 
  children, 
  onSave,
  saveText = 'Save',
  cancelText = 'Cancel'
}: CustomModalProps) {
  return (
    <Modal data-bs-theme="dark" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {children}
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {cancelText}
        </Button>
        {onSave && (
          <Button variant="primary" onClick={onSave}>
            {saveText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default CustomModal