import { useState, useEffect, useRef } from "react";

function Question({ questions, occupiedIds, onUpdate, hideAnswer, index }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [confirmAnswer, setConfirmAnswer] = useState("");
  const prevValues = useRef({ selectedValue: "", answer: "" });

  useEffect(() => {
    const trimmedAnswer = answer.trim();
    const trimmedConfirm = confirmAnswer.trim();
    const isLengthValid =
      trimmedAnswer.length >= 5 && trimmedAnswer.length <= 255;
    const isValid = isLengthValid && trimmedAnswer === trimmedConfirm;
    const currentAnswer = isValid ? trimmedAnswer : "";

    if (
      prevValues.current.selectedValue !== selectedValue ||
      prevValues.current.answer !== currentAnswer
    ) {
      onUpdate(index, selectedValue, currentAnswer);
      prevValues.current = { selectedValue, answer: currentAnswer };
    }
  }, [selectedValue, answer, confirmAnswer, index, onUpdate]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const availableQuestions = questions.filter(
    (question) =>
      !occupiedIds.includes(question.qId.toString()) ||
      question.qId.toString() === selectedValue,
  );

  return (
    <div className="question-wrapper">
      <label className="input-label">Security Question {index + 1}</label>
      <select
        value={selectedValue}
        onChange={handleSelectChange}
        className="select-field"
      >
        <option value="" disabled hidden>
          -- Please Select A Question --
        </option>
        {availableQuestions.map((question) => (
          <option key={question.qId} value={question.qId}>
            {question.qText}
          </option>
        ))}
      </select>

      {selectedValue && (
        <div className="answer-section">
          <div
            className={`split-input-container ${confirmAnswer && answer.trim() !== confirmAnswer.trim() ? "error-border" : ""}`}
          >
            <input
              type={hideAnswer ? "password" : "text"}
              placeholder="Your Answer"
              className="split-input-field"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />

            <div className="split-divider"></div>

            <input
              type={hideAnswer ? "password" : "text"}
              placeholder="Confirm Answer"
              className="split-input-field"
              value={confirmAnswer}
              onChange={(e) => setConfirmAnswer(e.target.value)}
              required
            />
          </div>

          <div className="validation-box">
            {answer.trim().length > 0 && answer.trim().length < 5 && (
              <p className="error-text">Min 5 characters required</p>
            )}
            {answer.trim() &&
              confirmAnswer.trim() &&
              answer.trim() !== confirmAnswer.trim() && (
                <p className="error-text">Answers must match exactly</p>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Question;
