import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyNavbar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="sm" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img alt="React Logo" src="/logo192.png" width="30" height="30" className="d-inline-block align-top"/>{" "}Lizard Assessment
          </Navbar.Brand>
          {/* Responsive dropdown menu */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default MyNavbar