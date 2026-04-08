import { useState, useEffect, useCallback } from "react";
import Question from "./Question";
import api from "../utils/api";
import "./QuestionForm.css";

function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selections, setSelections] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get("/questions");
        setQuestions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, []);

  const handleSelectionUpdate = useCallback((index, qId, submission) => {
    setSelections((prev) => ({
      ...prev,
      [index]: { qId, submission },
    }));
  }, []);

  const handleFinalSubmit = (event) => {
    event.preventDefault();
    const payload = {
      submissions: Object.values(selections),
    };
    api.post("/submissions", payload).catch((err) => {
      console.error(err);
    });
  };

  const occupiedIds = Object.values(selections)
    .map((selection) => selection.qId)
    .filter((id) => id !== "");

  const allQuestionsAnswered =
    questions.length > 0 &&
    Object.keys(selections).length === questions.length &&
    Object.values(selections).every(
      (s) => s.qId && s.submission.length >= 5 && s.submission.length <= 255,
    );

  return (
    <div className="form-container">
      <h1 className="form-title">Security Questions</h1>
      <form onSubmit={handleFinalSubmit}>
        {questions.map((_, index) => (
          <div key={index} className="question-group">
            <Question
              index={index}
              questions={questions}
              occupiedIds={occupiedIds}
              hideAnswer={isChecked}
              onUpdate={handleSelectionUpdate}
            />
          </div>
        ))}

        <div className="settings-box">
          <div className="checkbox-container">
            <input
              id="hide-checkbox"
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="hide-checkbox" className="checkbox-label">
              Hide Answer(s)
            </label>
          </div>
          <p className="instruction-text">
            Answers must be between 5 and 255 characters.
          </p>
        </div>

        <button
          type="submit"
          disabled={!allQuestionsAnswered}
          className="submit-button"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
