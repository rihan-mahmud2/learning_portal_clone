import React from "react";
import Question from "./Question";

function Questions({ question }) {
  const { question: title, options } = question || {};
  let quizNo = 1;
  return (
    <div className="quiz">
      <h4 className="question">
        Quiz {quizNo} - {title}
      </h4>
      <Question options={options} />
    </div>
  );
}

export default Questions;
