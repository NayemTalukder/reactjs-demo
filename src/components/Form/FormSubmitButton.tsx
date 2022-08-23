import React from 'react'
import { FormSubmitButtonProps } from './interface'
import './scss/FormSubmitButton.scss'

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ label, onSubmit, hide }) => {
  return (
    <div onClick={onSubmit} className={`FormSubmitButton ${hide ? 'd-none' : 'd-block'}`}>
      <div className='SubmitButtonContainer'>
        <div className='SubmitButton'>{label}</div>
      </div>
    </div>
  )
}

export { FormSubmitButton }
