import React from 'react'
import {  Container, Nav,   Navbar } from 'react-bootstrap'
import  {NavLink}  from 'react-router-dom'
import './MainNavigation.css'

const MainNavigation = () => {
  return (
    <>
    <Navbar  expand="lg" className="custom-navbar">
      <Container fluid>
          <Navbar.Brand href="/">
          <h3>Expense Tracker</h3>
          </Navbar.Brand>

          {/* <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link as={NavLink} to="#" >Home</Nav.Link>
            <Nav.Link as={NavLink} to="#">Procuct</Nav.Link>
            <Nav.Link as={NavLink} to="#">About us</Nav.Link>
          </Nav> */}

          <Nav className="d-flex align-items-center">
                   <Nav.Link as={NavLink} to="/authpage" >SignIn</Nav.Link>
                   <Nav.Link as={NavLink} to="/profilepage" >Profile</Nav.Link>
          </Nav>     
      </Container>
    </Navbar>
    </>
  )
}

export default MainNavigation
