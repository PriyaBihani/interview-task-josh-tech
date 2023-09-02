import { useState } from "react";

const Question = ({ question, handleAnswer }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    handleAnswer(question.id, option);
  };

  return (
    <div className="flex flex-grow flex-col my-4 md:my-0 items-left mx-3 md:mx-0">
      <h2
        style={{ minHeight: "70px" }}
        className="text-lg md:text-2xl font-bold select-none"
        dangerouslySetInnerHTML={{
          __html: `${question.id + 1}. ` + question.question,
        }}
      ></h2>
      <div
        style={{ minHeight: "160px" }}
        className="grid grid-cols-2  gap-1 md:gap-2  w-full"
      >
        {question.options &&
          question.options.map((option, index) => (
            <div key={option} className="w-full mt-3">
              <button
                style={{
                  float: index % 2 === 0 ? "left" : "right",
                }}
                type="button"
                onClick={() => handleOptionClick(option)}
                className={`p-2 border border-gray-400 rounded-lg flex items-center flex-wrap justify-center ${
                  selectedOption === option
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <div
                  className="text-md"
                  dangerouslySetInnerHTML={{ __html: option }}
                ></div>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Question;
