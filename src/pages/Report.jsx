import { useLocation } from "react-router-dom";

const Report = () => {
  const { state: { questions, answers } = {} } = useLocation();
  const calculateScore = () => {
    let score = 0,
      incorrect = 0,
      unanswered = 0;

    answers.forEach((answer, index) => {
      if (answer === questions[index].correct_answer) {
        score++;
      } else if (answer === undefined) {
        unanswered++;
      } else {
        incorrect++;
      }
    });
    unanswered += questions.length - answers.length;
    return { score, incorrect, unanswered };
  };
  const { score, incorrect, unanswered } = calculateScore();

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold my-4">Quiz Report</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-1/2">
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Score</h3>
          <p className="text-3xl font-bold text-right">
            {score}/{questions.length}
          </p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Incorrect</h3>
          <p className="text-3xl font-bold text-right">
            {incorrect}/{questions.length}
          </p>
        </div>
        <div className="bg-gray-400 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Unanswered</h3>
          <p className="text-3xl font-bold text-right">
            {unanswered}/{questions.length}
          </p>
        </div>
      </div>
      {questions.map((question, index) => (
        <div
          key={index}
          className="my-4 w-1/2 bg-white p-4 rounded-lg shadow-md"
        >
          <h3
            className="text-lg font-bold mb-2"
            dangerouslySetInnerHTML={{
              __html: `${index + 1}. ${question.question}`,
            }}
          ></h3>
          <p
            className="text-gray-600 font-bold mb-2"
            style={{
              color:
                question.correct_answer !== answers[index]
                  ? "red"
                  : answers[index] === undefined
                  ? "gray"
                  : "green",
            }}
          >
            Your answer:{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: `${answers[index] || "Not answered"}`,
              }}
            ></span>
          </p>
          <p className="text-green-600 font-bold">
            Correct answer:{" "}
            <span
              dangerouslySetInnerHTML={{ __html: question.correct_answer }}
            ></span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Report;
