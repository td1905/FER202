import React from 'react';
import { Card, Form, Alert, Badge } from 'react-bootstrap';

const QuestionItem = ({
  question,
  index,
  selectedOption,
  onSelectOption,
  isSubmitted,
}) => {
  const isAnswered = selectedOption !== undefined && selectedOption !== null;
  const isCorrect = isSubmitted && selectedOption === question.correctAnswer;
  const isWrong = isSubmitted && isAnswered && selectedOption !== question.correctAnswer;

  return (
    <Card className="mb-4 shadow-sm border question-card">
      <Card.Header className="bg-light d-flex justify-content-between align-items-center py-3">
        <h5 className="mb-0 text-dark fw-bold">
          <Badge bg="primary" className="me-2 px-2 py-1">
            Câu {index + 1}
          </Badge>
          {question.question}
        </h5>
        {isSubmitted && (
          <Badge bg={isCorrect ? 'success' : 'danger'} className="px-3 py-2 fs-6">
            {isCorrect ? '✓ Chính xác' : '✗ Chưa đúng'}
          </Badge>
        )}
      </Card.Header>

      <Card.Body>
        <Form>
          {question.options.map((option, optIdx) => {
            let optionClass = 'quiz-option-label p-3 mb-2 rounded border d-flex align-items-center';

            if (isSubmitted) {
              if (optIdx === question.correctAnswer) {
                optionClass += ' bg-success-subtle border-success text-success fw-bold';
              } else if (selectedOption === optIdx && optIdx !== question.correctAnswer) {
                optionClass += ' bg-danger-subtle border-danger text-danger fw-bold';
              } else {
                optionClass += ' opacity-50';
              }
            } else if (selectedOption === optIdx) {
              optionClass += ' bg-primary-subtle border-primary text-primary fw-bold';
            } else {
              optionClass += ' bg-white hover-option';
            }

            return (
              <div
                key={optIdx}
                className={optionClass}
                style={{ cursor: isSubmitted ? 'default' : 'pointer', transition: 'all 0.2s' }}
                onClick={() => {
                  if (!isSubmitted) {
                    onSelectOption(question.id, optIdx);
                  }
                }}
              >
                <Form.Check
                  type="radio"
                  name={`question-${question.id}`}
                  id={`q${question.id}-opt${optIdx}`}
                  checked={selectedOption === optIdx}
                  disabled={isSubmitted}
                  onChange={() => onSelectOption(question.id, optIdx)}
                  label={<span className="ms-2">{option}</span>}
                  className="mb-0 w-100 cursor-pointer"
                />
              </div>
            );
          })}
        </Form>

        {isSubmitted && question.explanation && (
          <Alert variant={isCorrect ? 'success' : 'info'} className="mt-3 mb-0">
            <strong>Giải thích:</strong> {question.explanation}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default QuestionItem;
