// src/usestate/StarRating.jsx
import { useState } from 'react';

const LABELS = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

export default function StarRating({ value, onChange, max = 5 }) {
  // hovered chỉ là state thuần giao diện (UI state)
  const [hovered, setHovered] = useState(0);

  const display = hovered || value;

  return (
    <div className="d-flex align-items-center gap-2" onMouseLeave={() => setHovered(0)}>
      <div className="d-inline-flex" style={{ cursor: 'pointer', fontSize: '1.75rem' }}>
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <span
            key={star}
            onMouseEnter={() => setHovered(star)}
            onClick={() => onChange(star === value ? 0 : star)}
            style={{ color: star <= display ? '#ffc107' : '#e4e5e9', transition: 'color 0.15s' }}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-muted fw-semibold small">
        {LABELS[display] || 'Chưa đánh giá'}
      </span>
    </div>
  );
}