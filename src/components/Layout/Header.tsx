import React from 'react'
import { NavLink } from "react-router-dom";
import { Button } from '../Button/Button'
import './scss/Header.scss'

interface Props {

}

interface activeStyle {
  color: string,
  textDecoration: string,

}

const Header: React.FC<Props> = ({ }) => {
  const activeStyle: activeStyle = { color: "red", textDecoration: "none" }
  return (
    <div className='Header'>
      <div className="NavContainer">
        <div className="MainNavContainer">
          <NavLink to='/' style={({ isActive }) =>
            isActive ? activeStyle : {}
          } className="NavItem">Item Info List</NavLink>
          <NavLink to='/item-info' style={({ isActive }) =>
            isActive ? activeStyle : {}
          } className="NavItem">Item Info</NavLink>
          <NavLink to='/item-info-create' style={({ isActive }) =>
            isActive ? activeStyle : {}
          } className="NavItem">Item Info Create</NavLink>
        </div>
      </div>
    </div>
  )
}

export { Header }
