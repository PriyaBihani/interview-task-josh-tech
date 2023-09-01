import { useState } from "react";

const Question = ({ question, handleAnswer }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    handleAnswer(question.id, option);
  };

  return (
    <div className="flex flex-col items-left mx-3 md:mx-0">
      <h2
        style={{ minHeight: "50px" }}
        className="text-2xl font-bold"
        dangerouslySetInnerHTML={{
          __html: `${question.id + 1}. ` + question.question,
        }}
      ></h2>
      <div
        style={{ minHeight: "50px" }}
        className="grid grid-cols-2 gap-2 w-auto"
      >
        {question.options &&
          question.options.map((option) => (
            <div key={option} className="m-4 w-3/4">
              <button
                type="button"
                onClick={() => handleOptionClick(option)}
                className={`p-2 border border-gray-400 rounded-lg flex items-center flex-wrap justify-center ${
                  selectedOption === option
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: option }}></div>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Question;
