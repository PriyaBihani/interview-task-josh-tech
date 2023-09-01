import { useState } from "react";

const Question = ({ question, handleAnswer, handleSubmit }) => {
  const [selectedOption, setSelectedOption] = useState("");
  console.log(question);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleOptionSubmit = (e) => {
    e.preventDefault();
    handleAnswer(question.id, selectedOption);
    setSelectedOption("");
  };

  return (
    <div className="flex flex-col items-left">
      <h2
        className="text-2xl font-bold mb-4"
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></h2>
      <form
        onSubmit={handleOptionSubmit}
        className="flex flex-col items-start w-full"
      >
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
                  {option}
                </button>
              </div>
            ))}
        </div>
        <div className="flex justify-between w-full">
          <button
            type="submit"
            disabled={!selectedOption}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Prev
          </button>
          <button
            type="submit"
            disabled={!selectedOption}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Question;
