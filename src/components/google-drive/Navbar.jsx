import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import './Navbar.scss';

export default function NavbarComponent() {
  return (
    // <Navbar expand="sm" className="navbar_outer">
    //   <Navbar.Brand as={Link} to="/">
    //     MuCrest Drive
    //   </Navbar.Brand>
    //   <Nav>
    //     <Nav.Link as={Link} to="/user">
    //       Profile
    //     </Nav.Link>
    //   </Nav>
    // </Navbar>
    <nav className="navbar_outer">
      <div className="brand_nav">
        <p className="m-0">MuCrest Drive</p>
      </div>
      <div className="profile_nav">
        <p className="m-0"><Link to ='/user'> Profile </Link> </p>
      </div>
    </nav>
  )
}
