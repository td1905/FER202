import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';

const HeaderNav = () => {
  return (
    <header className="border-bottom py-3 mb-4 bg-white shadow-sm">
      <Container>
        <Nav className="gap-4 align-items-center flex-wrap">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active-nav' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active-nav' : ''}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active-nav' : ''}`
            }
          >
            News
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active-nav' : ''}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/quiz"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active-nav' : ''}`
            }
          >
            Quiz
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active-nav' : ''}`
            }
          >
            Contact
          </NavLink>
        </Nav>
      </Container>
    </header>
  );
};

export default HeaderNav;
