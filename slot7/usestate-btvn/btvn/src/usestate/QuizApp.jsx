// src/usestate/QuizApp.jsx
import { useState } from 'react';
import { Container, Card, Button, ProgressBar, ListGroup, Badge } from 'react-bootstrap';

const QUESTIONS = [
  { id: 'q1', text: 'Hook nào dùng để lưu trạng thái cục bộ?', options: ['useEffect', 'useState', 'useRef', 'useMemo'], answer: 1 },
  { id: 'q2', text: 'Gọi setCount(count + 1) ba lần trong một sự kiện, count tăng bao nhiêu?', options: ['1', '2', '3', '0'], answer: 0 },
  { id: 'q3', text: 'Cách đúng để thêm phần tử vào mảng state?', options: ['list.push(x)', 'setList(list.push(x))', 'setList([...list, x])', 'list[list.length] = x'], answer: 2 },
  { id: 'q4', text: 'Checkbox có điều khiển dùng prop nào?', options: ['value', 'checked', 'selected', 'defaultValue'], answer: 1 },
];

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Component Quiz con: tự quản lý tiến độ làm bài
function Quiz({ onRestart }) {
  // Lazy initializer: chỉ chạy xáo mảng một lần duy nhất lúc mount
  const [questions] = useState(() => shuffle(QUESTIONS));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const selected = answers[current.id];
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = index === questions.length - 1;

  const handleSelectOption = (optIdx) => {
    setAnswers((prev) => ({ ...prev, [current.id]: optIdx }));
  };

  if (finished) {
    const score = questions.filter((q) => answers[q.id] === q.answer).length;
    return (
      <Card>
        <Card.Header as="h5">Kết quả bài thi</Card.Header>
        <Card.Body>
          <h4 className="text-center mb-4 text-primary">
            Bạn đúng {score}/{questions.length} câu!
          </h4>
          <ListGroup className="mb-4">
            {questions.map((q, i) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.answer;
              return (
                <ListGroup.Item key={q.id}>
                  <div className="fw-bold mb-1">
                    Câu {i + 1}: {q.text}
                  </div>
                  <div className="small">
                    Lựa chọn của bạn:{' '}
                    <Badge bg={isCorrect ? 'success' : 'danger'}>
                      {userAns !== undefined ? q.options[userAns] : 'Chưa chọn'}
                    </Badge>
                  </div>
                  {!isCorrect && (
                    <div className="small text-success mt-1">
                      Đáp án đúng: <strong>{q.options[q.answer]}</strong>
                    </div>
                  )}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <div className="text-center">
            <Button variant="primary" onClick={onRestart}>
              Làm lại bài thi
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>Câu {index + 1} / {questions.length}</span>
        <span className="small text-muted">Đã chọn: {answeredCount}/{questions.length}</span>
      </Card.Header>
      <ProgressBar now={((index + 1) / questions.length) * 100} style={{ height: '6px' }} />
      <Card.Body>
        <Card.Title className="h5 mb-3">{current.text}</Card.Title>
        <ListGroup className="mb-4">
          {current.options.map((opt, optIdx) => {
            const isSelected = selected === optIdx;
            return (
              <ListGroup.Item
                key={optIdx}
                action
                active={isSelected}
                onClick={() => handleSelectOption(optIdx)}
              >
                {opt}
              </ListGroup.Item>
            );
          })}
        </ListGroup>

        <div className="d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            disabled={index === 0}
            onClick={() => setIndex((i) => i - 1)}
          >
            ← Trước
          </Button>

          {isLastQuestion ? (
            <Button
              variant="success"
              disabled={answeredCount < questions.length}
              onClick={() => setFinished(true)}
            >
              Nộp bài
            </Button>
          ) : (
            <Button
              variant="primary"
              disabled={selected === undefined}
              onClick={() => setIndex((i) => i + 1)}
            >
              Tiếp →
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

// Component cha: Reset toàn bộ Quiz thông qua việc thay đổi `key`
export default function QuizApp() {
  const [attempt, setAttempt] = useState(1);

  return (
    <Container className="my-4" style={{ maxWidth: '600px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Bài 5: Quiz trắc nghiệm</h4>
        <Badge bg="info">Lượt làm bài thứ {attempt}</Badge>
      </div>
      {/* Đổi key làm unmount Quiz cũ và mount Quiz mới với initial state ban đầu */}
      <Quiz key={attempt} onRestart={() => setAttempt((a) => a + 1)} />
    </Container>
  );
}