import React from "react";
import Question from "./Question";

function Questions() {
  return (
    <div className="quiz">
      <h4 className="question">
        Quiz 1 - What is a Debounce function in JavaScript?
      </h4>
      <Question />
    </div>
  );
}

export default Questions;
