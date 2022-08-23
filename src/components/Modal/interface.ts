export interface ModalProps {
  onClose: React.MouseEventHandler<HTMLDivElement>,
  onDone: React.MouseEventHandler<HTMLDivElement>,
}

export interface ModalState {
  show: boolean,
  mainHeader: string,
  subHeader: string,
  inputText: string,
}