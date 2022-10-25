import React from "react"
import { Link } from "react-router-dom"
import './Navbar.scss';

export default function NavbarComponent() {
  return (
    <nav className="navbar_outer">
      <div className="brand_nav">
        <p className="m-0">MuCrest Drive</p>
      </div>
      <div className="profile_nav">
        <p className="m-0"><Link to='/user'> Profile </Link> </p>
      </div>
    </nav>
  )
}
