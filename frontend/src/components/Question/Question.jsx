import React, { useState } from 'react';
import './Question.css'

const QuestionCard = ({ id, question, options, onChange }) => {
  const [selected, setSelected] = useState([]);

  const handleToggle = (option) => {
    let updated;

    if (selected.includes(option)) {
      updated = selected.filter((o) => o !== option);
    } else {
      updated = [...selected, option];
    }

    setSelected(updated);
    onChange(id, updated);
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">Q{id + 1}.</span>
        <span className="question-text">{question}</span>
      </div>

      <div className="options-list">
        {options.map((opt, idx) => (
          <label key={idx} className="option-item">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => handleToggle(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
