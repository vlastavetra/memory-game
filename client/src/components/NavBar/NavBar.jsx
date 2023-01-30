import React from 'react';
import './NavBar.css';
import ModalLoginSign from '../../modal/ModalLoginSignup';

//bootstrap
import { Container, Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
  return (
    <>
      <Navbar className="nav-bar">
        <Container fluid>
          <Nav className="me-auto my-2 my-lg-0">
            <ModalLoginSign />
            <Nav.Link href="/score" className="link">
              Score
            </Nav.Link>
            <Nav.Link href="/game" className="link">
              Game
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
