import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const { type } = useParams(); // Get the quiz type from the URL

  useEffect(() => {
    if (type) {
      axios.get(`${process.env.REACT_APP_API_URL}/quiz/${type}`)
        .then((res) => setQuestions(res.data))
        .catch((err) => console.error(err));
    }
  }, [type]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">{type} Quiz</h2>
      {questions.length === 0 && <p className="text-center">Loading questions...</p>}
      {questions.map((q, index) => (
        <div key={index} className="card mb-3 question-card">
          <div className="card-body">
            <h5 className="card-title">{index + 1}. {q.question}</h5>
            <div className="options mt-3">
              {q.options.map((opt, i) => (
                <div key={i} className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`q${index}`}
                    id={`q${index}-opt${i}`}
                    value={opt}
                    onChange={() => setAnswers({ ...answers, [index]: opt })}
                  />
                  <label className="form-check-label" htmlFor={`q${index}-opt${i}`}>
                    {opt}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
        <Link to="/" className="btn btn-primary">Back to Quiz Selection</Link>
      </div>
    </div>
  );
}