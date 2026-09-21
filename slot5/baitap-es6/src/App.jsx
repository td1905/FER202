import Container from 'react-bootstrap/Container';
import WelcomeCard from './components/WelcomeCard';
import StudentCard from './components/StudentCard';

const students = [
  {
    id: 'SE1701',
    name: 'Nguyễn Văn An',
    major: 'Software Engineering',
    gpa: 8.5,
    avatar: 'https://i.pravatar.cc/200?img=12',
    contact: { email: 'an.nv@fpt.edu.vn', phone: '0901 234 567' },
  },
  {
    id: 'SE1702',
    name: 'Trần Thị Bình',
    major: 'Artificial Intelligence',
    gpa: 9.0,
    avatar: 'https://i.pravatar.cc/200?img=25',
    contact: { email: 'binh.tt@fpt.edu.vn', phone: '0902 345 678' },
  },
  {
    id: 'SE1703',
    name: 'Lê Hoàng Cường',
    major: 'Digital Marketing',
    gpa: 7.8,
    avatar: 'https://i.pravatar.cc/200?img=33',
    contact: { email: 'cuong.lh@fpt.edu.vn', phone: '0903 456 789' },
  },
];

function App() {
  return (
    <Container className="my-4">
      <h2 className="mb-4">Bài 1: Card chào mừng</h2>
      <WelcomeCard />

      <hr className="my-4" />

      <h2 className="mb-4">Bài 2: StudentCard</h2>
      <div className="d-flex gap-3 flex-wrap">
        {students.map((st) => (
          <StudentCard key={st.id} student={st} />
        ))}
      </div>
    </Container>
  );
}

export default App;