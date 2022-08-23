export interface FormCardProps {
  children: JSX.Element | string,
  formHeading: string,
  width?: string
}

export interface FormItemProps {
  label?: string,
  type: string,
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>,
  onMultiAdd?: React.MouseEventHandler<HTMLDivElement>,
  dropDown?: Array<string>,
  multiList?: Array<string>,
  multiInput?: boolean,
  width?: string,
  inverseColor?: boolean,
}

export interface FormSubmitButtonProps {
  label: string,
  onSubmit?: React.MouseEventHandler<HTMLDivElement>,
  hide?: boolean,
}