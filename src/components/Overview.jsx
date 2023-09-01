import { memo } from "react";
const Overview = ({
  questions,
  visitedQuestions,
  attemptedQuestions,
  currentQuestion,
  handleQuestionClick,
}) => {
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
              const isAttempted =
                attemptedQuestions[question.id - 1] !== undefined;
              console.log({
                isCurrent,
                isVisited,
                isAttempted,
              });
              const color = isCurrent
                ? "blue"
                : isVisited && isAttempted
                ? "green"
                : isVisited && !isAttempted
                ? "red"
                : "gray";
              const textColor =
                isCurrent || isAttempted || isVisited ? "white" : "black";
              const backgroundColor = `bg-${color}-500`;
              console.log({ backgroundColor });
              //   isCurrent
              //     ? `bg-${color}-500`
              //     : `bg-${color}-100`;
              return (
                <div
                  key={question.id}
                  className={`flex items-center justify-center w-8 h-8 rounded-full 
                  ${backgroundColor} text-${textColor} font-bold mb-2 mx-1 cursor-pointer
                   border border-black`}
                  onClick={() => handleQuestionClick(question)}
                >
                  {question.id}
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
