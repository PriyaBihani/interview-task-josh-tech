const Controllers = ({
  currentQuestionId,
  handleNextQuestion,
  handlePrevQuestion,
  handleSubmit,
  questionLength,
}) => {
  return (
    <>
      <div className="flex justify-between w-full">
        {currentQuestionId != 1 && (
          <button
            type="button"
            disabled={currentQuestionId === 1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handlePrevQuestion}
          >
            Prev
          </button>
        )}
        {currentQuestionId != questionLength && (
          <button
            type="button"
            disabled={currentQuestionId === questionLength}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Submit Quiz
      </button>
    </>
  );
};

export default Controllers;
