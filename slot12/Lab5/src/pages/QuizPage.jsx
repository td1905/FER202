import React, { useState } from 'react';
import { Container, Alert, Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { questions } from '../data/questions';
import QuizList from '../components/QuizList';
import QuestionItem from '../components/QuestionItem';

const QuizPage = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  // Handle selecting an answer for a specific question
  const handleSelectOption = (questionId, optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Submit quiz and calculate score
  const handleSubmitQuiz = () => {
    let currentScore = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        currentScore += 1;
      }
    });

    setScore(currentScore);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset quiz
  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <Container className="pb-5">
      <h2 style={{ color: '#c9302c' }} className="fw-normal mb-4">
        Quiz Application
      </h2>

      {/* QuizList Component with React Router links and status bar */}
      <QuizList
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        score={score}
        isSubmitted={isSubmitted}
        onSubmitQuiz={handleSubmitQuiz}
        onResetQuiz={handleResetQuiz}
      />

      {/* Result Alert when submitted */}
      {isSubmitted && (
        <Alert
          variant={percentage >= 70 ? 'success' : 'warning'}
          className="p-4 mb-4 shadow-sm rounded-3 border-0"
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h4 className="alert-heading fw-bold mb-1">
                {percentage >= 70
                  ? '🎉 Xuất sắc! Bạn đã vượt qua bài Quiz!'
                  : '⚠️ Hãy cố gắng hơn ở lần sau nhé!'}
              </h4>
              <p className="mb-0">
                Bạn trả lời đúng <strong>{score}</strong> trên tổng số{' '}
                <strong>{totalQuestions}</strong> câu hỏi ({percentage}%).
                Xem lại giải thích chi tiết cho từng câu hỏi bên dưới.
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-dark" onClick={handleResetQuiz}>
                Làm lại
              </Button>
              <Link to="/news" className="btn btn-primary">
                Đọc tin tức
              </Link>
            </div>
          </div>
        </Alert>
      )}

      {/* List of Questions using QuestionItem component */}
      <div className="questions-container">
        {questions.map((question, index) => (
          <QuestionItem
            key={question.id}
            question={question}
            index={index}
            selectedOption={userAnswers[question.id]}
            onSelectOption={handleSelectOption}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>

      {/* Bottom Action Bar */}
      <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
        <Link to="/" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-1"></i> Quay lại Trang chủ
        </Link>
        {!isSubmitted ? (
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmitQuiz}
            disabled={answeredCount === 0}
            className="px-4 shadow-sm"
          >
            Nộp bài kiểm tra ({answeredCount}/{totalQuestions})
          </Button>
        ) : (
          <Button variant="warning" onClick={handleResetQuiz} className="px-4">
            Làm lại bài kiểm tra
          </Button>
        )}
      </div>
    </Container>
  );
};

export default QuizPage;
