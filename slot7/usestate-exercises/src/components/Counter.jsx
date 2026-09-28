import { useState } from 'react';
import { Button } from 'react-bootstrap';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center mx-auto rounded shadow"
      style={{
        backgroundColor: '#282c34',
        width: '320px',
        height: '240px',
        color: '#ffffff',
      }}
    >
      {/* Cặp nút Decrement & Increment */}
      <div className="d-flex gap-2 mb-4">
        <Button
          variant="light"
          size="sm"
          className="px-2 py-1 fw-normal border"
          onClick={() => setCount((prev) => prev - 1)}
        >
          - Decrement
        </Button>
        <Button
          variant="light"
          size="sm"
          className="px-2 py-1 fw-normal border"
          onClick={() => setCount((prev) => prev + 1)}
        >
          + Increment
        </Button>
      </div>

      {/* Chữ Count màu trắng rõ ràng */}
      <h2 className="m-0 fw-normal" style={{ fontSize: '2rem', color: '#ffffff' }}>
        Count: {count}
      </h2>
    </div>
  );
}

export default Counter;