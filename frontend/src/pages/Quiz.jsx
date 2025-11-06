import { useEffect, useState } from "react";
import axios from "axios"; // Use axios for consistency
import { useParams } from "react-router-dom";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [user, setUser] = useState(null);
  const { type } = useParams(); // Get the quiz type from the URL

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user && type) {
      axios.get(`http://localhost:5000/api/quiz/${type}`)
        .then((res) => setQuestions(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, type]);

  if (!user) {
    return <p>Please log in to view the quiz.</p>;
  }

  const handleSubmit = async () => {
    if (!user) {
      alert("Please log in to submit the quiz.");
      return;
    }
    const ansArray = questions.map((q, i) => answers[i]);
    try {
      const res = await axios.post('http://localhost:5000/api/quiz/submit', {
        userId: user._id,
        answers: ansArray,
        category: type // Send the quiz category to the backend
      });
      alert("Your score: " + res.data.score);
    } catch (error) {
      console.error("Error submitting quiz:", error.response?.data || error.message);
      alert("Error submitting quiz. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">{type} Quiz</h2>
      {questions.length === 0 && <p className="text-center">No questions available for this category.</p>}
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
        <button className="btn btn-success me-md-2" onClick={handleSubmit}>Submit</button>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}