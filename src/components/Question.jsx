import { useState } from "react";

const Question = ({ question, handleAnswer }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    handleAnswer(question.id, option);
  };

  return (
    <div className="flex flex-col items-left">
      <h2
        className="text-2xl font-bold mb-4"
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></h2>
      <div className="flex flex-col items-start w-full">
        <div className="flex justify-between w-full">
          {question.options &&
            question.options.map((option) => (
              <div key={option} className="m-4 w-1/2">
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
    </div>
  );
};

export default Question;
