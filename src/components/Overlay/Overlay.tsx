import React from 'react'
import { OverlayProps } from './interface';
import './scss/Overlay.scss'

const Overlay: React.FC<OverlayProps> = ({ toggle }) => {
  return (
    <div className={`Overlay ${toggle ? 'd-block' : 'd-none'}`}></div>
  )
}

export { Overlay }
