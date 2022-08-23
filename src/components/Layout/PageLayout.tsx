import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import './scss/PageLayout.scss'

interface Props {
  children: JSX.Element | string,
}

const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='PageLayout'>
      <Header />
      <div className="Children">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export { PageLayout }
