import React from 'react'
import { ButtonProps } from './interface'
import './scss/Button.scss'


const Button: React.FC<ButtonProps> = ({ label, hide, customClass = '', onClick }) => {
  return (
    <div onClick={onClick} className={`Button ${customClass} ${hide ? 'd-none' : 'd-block'}`} >
      <div className="ButtonInner">{label}</div>
    </div>
  )
}

export { Button }
