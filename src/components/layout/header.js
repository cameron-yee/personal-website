import React from "react"
import { Link } from 'gatsby'
import PropTypes from "prop-types"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import ThemeToggle from '../atoms/theme-toggle'

export default function Header(props) {
  return (
    // <header style={{background: 'rgba(25, 12, 199, 1)'}}>
    <header>
      <nav className="d-flex justify-content-start">
        {/* <h1 className="p-3">{props.siteTitle}</h1> */}
        <Link to="/" className="p-3 align-self-center">About</Link>
        <Link to="/tech-stack" className="p-3 align-self-center">Tech Stack</Link>
        <Link to="/projects" className="p-3 align-self-center">Projects</Link>
        <a href="https://github.com/cameron-yee" className="p-3 align-self-center" rel="noopener noreferrer" target="_blank">
          <i className="fab fa-github fa-2x github"></i>
        </a>
        <ThemeToggle className="p-3 ml-auto" />
      </nav>
    </header>
    // <Navbar expand="lg" style={{background: 'rgba(25, 12, 199, 1)'}}>
    //   {/* <Navbar.Brand href="#home"></Navbar.Brand> */}
    //   <Link to="/"><h1>{props.siteTitle}</h1></Link>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="mr-auto">
    //       <Nav.Link href="#home">Home</Nav.Link>
    //       <Nav.Link href="#link">Link</Nav.Link>
    //     </Nav>
    //     <Form inline>
    //       <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    //       <Button variant="outline-success" className="mr-2">Search</Button>
    //     </Form>
    //     <ThemeToggle />
    //   </Navbar.Collapse>
    // </Navbar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}