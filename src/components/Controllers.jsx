const Controllers = ({
  currentQuestionId,
  handleNextQuestion,
  handlePrevQuestion,
  handleSubmit,
  questionLength,
}) => {
  return (
    <>
      <div className="flex justify-center controller mx-auto md:mx-3">
        <button
          type="button"
          disabled={currentQuestionId === 0}
          style={{
            opacity: currentQuestionId === 0 ? 0.5 : 1,
          }}
          className="bg-blue-500 hover:bg-blue-700 mx-6 text-white font-bold md:py-2 p-2 md:px-4 rounded mt-4 hover:cursor-pointer select-none"
          onClick={() => handlePrevQuestion(currentQuestionId)}
        >
          Prev
        </button>
        <button
          onClick={handleSubmit}
          className="bg-red-500 md:hidden hover:bg-red-700 text-white font-bold md:py-2 p-2 md:px-4 rounded mt-4 mx-auto block hover:cursor-pointer select-none"
        >
          Submit Quiz
        </button>
        <button
          type="button"
          style={{
            opacity: currentQuestionId === questionLength - 1 ? 0.5 : 1,
          }}
          disabled={currentQuestionId === questionLength - 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold md:py-2 p-2 md:px-4 rounded mt-4 select-none mx-6"
          onClick={() => handleNextQuestion(currentQuestionId)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Controllers;
