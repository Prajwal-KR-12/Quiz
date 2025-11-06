import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  const handleQuizSelect = (quizType) => {
    navigate(`/quiz/${quizType}`);
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Welcome!</h2>
      <p className="lead mb-4">Please select a quiz:</p>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-primary btn-lg" onClick={() => handleQuizSelect('python')}>Python Quiz</button>
        <button className="btn btn-info btn-lg" onClick={() => handleQuizSelect('html')}>HTML Quiz</button>
      </div>
    </div>
  );
}
