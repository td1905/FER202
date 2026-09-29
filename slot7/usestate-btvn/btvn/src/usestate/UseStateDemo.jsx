// src/usestate/UseStateDemo.jsx
import { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import FaqAccordion from './FaqAccordion';
import ReviewForm from './ReviewForm';
import BmiCalculator from './BmiCalculator';
import StudentManager from './StudentManager';
import QuizApp from './QuizApp';

export default function UseStateDemo() {
  const [activeTab, setActiveTab] = useState('b1');

  return (
    <Container className="py-4">
      <Nav variant="pills" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Nav.Item><Nav.Link eventKey="b1">Bài 1: FAQ</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="b2">Bài 2: Đánh giá</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="b3">Bài 3: BMI</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="b4">Bài 4: Điểm SV</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="b5">Bài 5: Quiz</Nav.Link></Nav.Item>
      </Nav>

      {activeTab === 'b1' && <FaqAccordion />}
      {activeTab === 'b2' && <ReviewForm />}
      {activeTab === 'b3' && <BmiCalculator />}
      {activeTab === 'b4' && <StudentManager />}
      {activeTab === 'b5' && <QuizApp />}
    </Container>
  );
}