import { ReactNode } from 'react'
import ReactModal, { ModalProps } from 'react-responsive-modal'

type Props = {
  children: ReactNode
} & ModalProps

const Modal = (props: Props) => {
  const { children, animationDuration = 200, ...rest } = props

  return (
    <div>
      <ReactModal animationDuration={animationDuration} center {...rest}>
        {children}
      </ReactModal>
    </div>
  )
}

export default Modal
