import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { APP_NAME, menuItems } from '../../data/menu';

const Header = () => (
  <Navbar bg="dark" variant="dark" expand="md" sticky="top" className="shadow-sm">
    <Container>
      <Navbar.Brand href="#home" className="fw-bold">{APP_NAME}</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-menu" />
      <Navbar.Collapse id="navbar-menu">
        <Nav className="ms-auto">
          {menuItems.map(({ label, href }) => (
            <Nav.Link key={label} href={href}>
              {label}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;