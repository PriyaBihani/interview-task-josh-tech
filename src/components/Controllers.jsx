const Controllers = ({
  currentQuestionId,
  handleNextQuestion,
  handlePrevQuestion,
  handleSubmit,
  questionLength,
}) => {
  return (
    <>
      <div className="flex justify-between  controller mx-3 md:mx-3">
        <button
          type="button"
          disabled={currentQuestionId === 0}
          style={{
            opacity: currentQuestionId === 0 ? 0.5 : 1,
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 hover:cursor-pointer select-none"
          onClick={() => handlePrevQuestion(currentQuestionId)}
        >
          Prev
        </button>
        <button
          onClick={handleSubmit}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 mx-auto block hover:cursor-pointer select-none"
        >
          Submit Quiz
        </button>
        <button
          type="button"
          style={{
            opacity: currentQuestionId === questionLength - 1 ? 0.5 : 1,
          }}
          disabled={currentQuestionId === questionLength - 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 select-none"
          onClick={() => handleNextQuestion(currentQuestionId)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Controllers;
