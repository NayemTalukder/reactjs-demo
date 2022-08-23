import React from 'react'
import './scss/Footer.scss'

interface Props {

}

const Footer: React.FC<Props> = () => {
  return (
    <div className='Footer'>
      <div className="FooterText">All rights reserved © 2022</div>
    </div>
  )
}

export { Footer }
