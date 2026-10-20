// src/layouts/MainLayout.jsx – NC6: Layout chung với Navbar + Outlet
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Alert } from 'react-bootstrap';

const MainLayout = () => {
  const location = useLocation();
  const msg = location.state?.message;

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={NavLink} to="/">📡 DemoAxios</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to="/posts"
                style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
              >
                Bài viết
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/posts/new"
                style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
              >
                + Tạo mới
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/demo"
                style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
              >
                Demo tất cả
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4 mb-5">
        {/* Thông báo sau navigate (NC6) */}
        {msg && (
          <Alert variant="success" dismissible>
            {msg}
          </Alert>
        )}
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
