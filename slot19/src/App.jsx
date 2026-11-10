import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Bai1App from './components/bai1/Bai1App';
import Bai2App from './components/bai2/Bai2App';
import Bai3App from './components/bai3/Bai3App';
import Bai4App from './components/bai4/Bai4App';
import Bai5App from './components/bai5/Bai5App';
import CartBadge from './components/CartBadge';

export default function App() {
  const [activeTab, setActiveTab] = useState('bai1');

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4 shadow-sm mb-4">
        <Navbar.Brand className="fw-bold">Slot 19 — Redux & Redux Toolkit</Navbar.Brand>
        <Nav className="me-auto" variant="pills" activeKey={activeTab}>
          <Nav.Link
            eventKey="bai1"
            onClick={() => setActiveTab('bai1')}
            className={activeTab === 'bai1' ? 'fw-bold' : ''}
          >
            Bài 1: Counter
          </Nav.Link>
          <Nav.Link
            eventKey="bai2"
            onClick={() => setActiveTab('bai2')}
            className={activeTab === 'bai2' ? 'fw-bold' : ''}
          >
            Bài 2: Todo List
          </Nav.Link>
          <Nav.Link
            eventKey="bai3"
            onClick={() => setActiveTab('bai3')}
            className={activeTab === 'bai3' ? 'fw-bold' : ''}
          >
            Bài 3: Users (Thunk)
          </Nav.Link>
          <Nav.Link
            eventKey="bai4"
            onClick={() => setActiveTab('bai4')}
            className={activeTab === 'bai4' ? 'fw-bold' : ''}
          >
            Bài 4: Giỏ hàng
          </Nav.Link>
          <Nav.Link
            eventKey="bai5"
            onClick={() => setActiveTab('bai5')}
            className={activeTab === 'bai5' ? 'fw-bold' : ''}
          >
            Bài 5: CRUD Sinh viên
          </Nav.Link>
        </Nav>
        {activeTab === 'bai4' && (
          <span className="text-white d-flex align-items-center">
            <CartBadge />
          </span>
        )}
      </Navbar>

      <Container>
        {activeTab === 'bai1' && <Bai1App />}
        {activeTab === 'bai2' && <Bai2App />}
        {activeTab === 'bai3' && <Bai3App />}
        {activeTab === 'bai4' && <Bai4App />}
        {activeTab === 'bai5' && <Bai5App />}
      </Container>
    </div>
  );
}
