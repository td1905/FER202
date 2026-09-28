import { useState } from 'react';
import { Button } from 'react-bootstrap';

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);

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
      <Button
        variant="light"
        className="px-4 py-1 fw-normal border text-dark mb-3"
        style={{ fontSize: '1.2rem', minWidth: '100px' }}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {isVisible ? 'Hide' : 'Show'}
      </Button>

      {isVisible && (
        <h2 className="m-0 fw-normal" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
          Toggle me!
        </h2>
      )}
    </div>
  );
}

export default ToggleVisibility;