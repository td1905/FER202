import { useReducer, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { undoable, createHistory } from './undoable';
import { notesReducer, initialNotes, COLORS } from './notesReducer';

const notesWithHistory = undoable(notesReducer);

const NotesBoard = () => {
  const [history, dispatch] = useReducer(notesWithHistory, initialNotes, createHistory);
  const [text, setText] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const { past, present, future } = history;
  const notes = [...present.items].sort((a, b) => Number(b.pinned) - Number(a.pinned));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: 'ADD_NOTE', payload: { text, color } });
    setText('');
  };

  const handleKeyDown = (e) => {
    if (!e.ctrlKey) return;
    if (e.key === 'z') { e.preventDefault(); dispatch({ type: 'UNDO' }); }
    if (e.key === 'y') { e.preventDefault(); dispatch({ type: 'REDO' }); }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0} style={{ outline: 'none' }}>
      <div className="d-flex flex-wrap gap-2 mb-3">
        <Form onSubmit={handleAdd} className="flex-grow-1">
          <InputGroup>
            <Form.Control placeholder="Nội dung ghi chú" value={text} onChange={(e) => setText(e.target.value)} />
            <Form.Select style={{ maxWidth: 120 }} value={color} onChange={(e) => setColor(e.target.value)} aria-label="Màu">
              {COLORS.map((c, i) => (
                <option key={c} value={c}>{`Màu ${i + 1}`}</option>
              ))}
            </Form.Select>
            <Button type="submit" disabled={!text.trim()}>Thêm</Button>
          </InputGroup>
        </Form>
        <ButtonGroup>
          <Button variant="outline-dark" disabled={past.length === 0} onClick={() => dispatch({ type: 'UNDO' })}>
            {`↶ Hoàn tác (${past.length})`}
          </Button>
          <Button variant="outline-dark" disabled={future.length === 0} onClick={() => dispatch({ type: 'REDO' })}>
            {`↷ Làm lại (${future.length})`}
          </Button>
        </ButtonGroup>
        <Button variant="outline-danger" onClick={() => dispatch({ type: 'CLEAR_ALL' })}>Xóa hết</Button>
      </div>

      <Row xs={1} md={3} className="g-3">
        {notes.map(({ id, text: noteText, color: noteColor, pinned }) => (
          <Col key={id}>
            <Card style={{ background: noteColor }} className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Text className="flex-grow-1">{pinned && '📌 '}{noteText}</Card.Text>
                <div className="d-flex gap-1 align-items-center">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-label={`Đổi màu ${c}`}
                      onClick={() => dispatch({ type: 'CHANGE_COLOR', payload: { id, color: c } })}
                      style={{ width: 18, height: 18, borderRadius: '50%', background: c, border: c === noteColor ? '2px solid #333' : '1px solid #999', cursor: 'pointer' }}
                    />
                  ))}
                  <Button size="sm" variant="link" className="ms-auto p-0" onClick={() => dispatch({ type: 'TOGGLE_PIN', payload: id })}>
                    {pinned ? 'Bỏ ghim' : 'Ghim'}
                  </Button>
                  <Button size="sm" variant="link" className="text-danger p-0 ms-2" onClick={() => dispatch({ type: 'DELETE', payload: id })}>
                    Xóa
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {notes.length === 0 && <p className="text-muted mt-3">Chưa có ghi chú. Thử bấm Hoàn tác.</p>}
    </div>
  );
};

export default NotesBoard;