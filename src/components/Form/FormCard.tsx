import React from 'react'
import { FormCardProps } from './interface'
import '../Form/scss/FormCard.scss'

const FormCard: React.FC<FormCardProps> = ({ children, formHeading, width }) => {

  return (
    <div className='FormCard' style={{ width: width }} >
      <div className="FormHeadingContainer">
        <div className="FormHeading">{formHeading}</div>
      </div>
      <div className='FormBox'>
        <form action="">
          {children}
        </form>
      </div>
    </div>
  )
}

export { FormCard }
