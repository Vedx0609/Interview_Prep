import { useState } from "react";
import "./MCQPage.css";

export default function MCQPage({ challenge, showExplanation = false }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [wantExplanation, setWantExplanation] = useState(showExplanation);

  const options =
    typeof challenge.options === "string"
      ? JSON.parse(challenge.options)
      : challenge.options;

  const handleOptionSelect = (index) => {
    if (selectedOption !== null) return; // Prevent re-selection
    setSelectedOption(index);
    setWantExplanation(true);
  };

  const getOptionClass = (index) => {
    if (selectedOption === null) return "option";
    if (index === challenge.correct_answer_id) return "option correct";
    if (index === selectedOption && index !== challenge.correct_answer_id)
      return "option incorrect";
    return "option";
  };

  return (
    <div className="mcq-challenge">
      <p>
        <strong>Difficulty</strong>: {challenge.difficulty}
      </p>
      <p className="question-title">{challenge.title}</p>
      <div className="options">
        {options.map((option, index) => (
          <div
            className={getOptionClass(index)}
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={selectedOption !== null}
          >
            {option}
          </div>
        ))}
      </div>
      {wantExplanation && selectedOption !== null && (
        <div className="explanation">
          <p className="explanation-text">
            <strong>Explanation:</strong> {challenge.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
