import { memo } from "react";

const Overview = ({
  questions,
  visitedQuestions,
  attemptedQuestions,
  currentQuestion,
  goToQuestion,
}) => {
  console.log({
    questions,
    visitedQuestions,
    attemptedQuestions,
    currentQuestion,
    goToQuestion,
  });
  const rows = [];
  for (let i = 0; i < questions.length; i += 3) {
    const row = questions.slice(i, i + 3);
    rows.push(row);
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row m-2">
            {row.map((question) => {
              const isCurrent = question.id === currentQuestion.id;
              const isVisited = visitedQuestions.includes(question.id);
              const isAttempted = attemptedQuestions[question.id] !== undefined;
              const color = isCurrent
                ? "rgb(59 130 246)"
                : isVisited && isAttempted
                ? "rgb(34 197 94)"
                : isVisited && !isAttempted
                ? "rgb(239 68 68)"
                : "rgb(229 231 235)";
              const textColor =
                isCurrent || isAttempted || isVisited ? "#fff" : "#000";

              return (
                <div
                  key={question.id}
                  style={{ backgroundColor: color, color: textColor }}
                  className={`flex items-center justify-center w-8 h-8 rounded-full 
                  font-bold mb-2 mx-1 cursor-pointer
                   border border-black`}
                  onClick={() => goToQuestion(question.id)}
                >
                  {question.id + 1}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Overview);
