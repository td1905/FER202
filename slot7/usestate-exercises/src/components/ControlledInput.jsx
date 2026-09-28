import { useState } from 'react';
import { Form } from 'react-bootstrap';

function ControlledInput() {
  const [text, setText] = useState('');

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center mx-auto rounded shadow"
      style={{
        backgroundColor: '#282c34',
        width: '360px',
        height: '240px',
        color: '#ffffff',
      }}
    >
      {/* Ô input text */}
      <Form.Control
        type="text"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mb-4 text-center"
        style={{
          width: '240px',
          borderRadius: '4px',
          padding: '6px 12px',
        }}
      />

      {/* Hiển thị văn bản theo thời gian thực */}
      <h3 className="m-0 fw-normal" style={{ fontSize: '1.5rem', color: '#ffffff' }}>
        Input text: {text}
      </h3>
    </div>
  );
}

export default ControlledInput;