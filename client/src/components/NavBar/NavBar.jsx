import React from 'react';
import './NavBar.css';
import ModalLoginSign from '../../modal/ModalLoginSignup';
import sound1 from "../../assets/sounds/select-menu-47560.mp3";
import { NavLink } from "react-router-dom";

//bootstrap
import { Container, Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {

  const handleMouseDown = () => {
    const clickAudio = new Audio(sound1);
    clickAudio.play();
  }

  return (
    <>
      <Navbar className="nav-bar">
        <Container fluid>
          <Nav className="me-auto my-2 my-lg-0" onMouseDown={handleMouseDown}>
            <ModalLoginSign />
            <NavLink to="/" className="link nav-link">
              Home
            </NavLink>
            <NavLink to="/score" className="link nav-link">
              Score
            </NavLink>
            <NavLink to="/game" className="link nav-link">
              Game
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
