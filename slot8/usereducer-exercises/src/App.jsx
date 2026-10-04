import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import StepCounter from './usereducer/StepCounter';
import OrderTracker from './usereducer/OrderTracker';
import KanbanBoard from './usereducer/KanbanBoard';
import CourseWizard from './usereducer/CourseWizard';
import NotesBoard from './usereducer/NotesBoard';

const App = () => {
  const [activeTab, setActiveTab] = useState('b1');

  return (
    <div className="container py-4">
      <header className="mb-4 pb-2 border-bottom">
        <h2 className="fw-bold">Thực hành useReducer trong ReactJS</h2>
        <p className="text-secondary mb-0">Bài tập Slot 8 - Cập nhật 5 bài tập áp dụng thực tế</p>
      </header>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'b1')}
        className="mb-4"
        justify
      >
        <Tab eventKey="b1" title="Bài 1: Step Counter">
          <div className="d-flex justify-content-center">
            <StepCounter />
          </div>
        </Tab>
        <Tab eventKey="b2" title="Bài 2: Order Tracker">
          <div className="d-flex justify-content-center">
            <OrderTracker />
          </div>
        </Tab>
        <Tab eventKey="b3" title="Bài 3: Kanban Board">
          <KanbanBoard />
        </Tab>
        <Tab eventKey="b4" title="Bài 4: Course Wizard">
          <div className="d-flex justify-content-center">
            <CourseWizard initialCourseId="react" />
          </div>
        </Tab>
        <Tab eventKey="b5" title="Bài 5: Notes Board (Undo/Redo)">
          <NotesBoard />
        </Tab>
      </Tabs>
    </div>
  );
};

export default App;