import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Overview from "../components/Overview";
import Question from "../components/Question";
import Timer from "../components/Timer";

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("https://opentdb.com/api.php?amount=15");
      const data = await response.json();
      const formattedQuestions = data.results.map((question, index) => ({
        question: question.question,
        options: [...question.incorrect_answers, question.correct_answer],
        correct_answer: question.correct_answer,
        id: index + 1,
      }));
      setQuestions(formattedQuestions);
      setCurrentQuestion(formattedQuestions[0]);
      setVisitedQuestions([1]);
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAttemptedQuestions((prevAttemptedQuestions) => {
      const newAttemptedQuestions = [...prevAttemptedQuestions];
      newAttemptedQuestions[questionId - 1] = answer;
      return newAttemptedQuestions;
    });
    if (currentQuestion.answer === answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = questions.find(
      (question) => !visitedQuestions.includes(question.id)
    );
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
      setVisitedQuestions((prevVisitedQuestions) => [
        ...prevVisitedQuestions,
        nextQuestion.id,
      ]);
    } else {
      navigate("/report");
    }
  };

  const handlePrevQuestion = () => {
    const prevQuestion = questions
      .slice(0, currentQuestion.id - 1)
      .reverse()
      .find((question) => visitedQuestions.includes(question.id));
    if (prevQuestion) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNextQuestion();
  };

  const handleTimeout = () => {
    handleNextQuestion();
  };

  return (
    <>
      <Timer timeLimit={1800} handleTimeout={handleTimeout} />
      <div className="flex flex-col items-center">
        {/* <h1 className="text-4xl font-bold mb-8">Quiz</h1> */}
        <div className="flex flex-row justify-center items-start w-full">
          <div className="w-3/12 flex justify-left">
            <Overview
              questions={questions}
              visitedQuestions={visitedQuestions}
              attemptedQuestions={attemptedQuestions}
              currentQuestion={currentQuestion}
            />
          </div>
          <div className="w-1/2">
            <Question
              question={currentQuestion}
              handleAnswer={handleAnswer}
              handleSubmit={handleSubmit}
              handlePrevQuestion={handlePrevQuestion}
              handleNextQuestion={handleNextQuestion}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit Quiz
        </button>
      </div>
    </>
  );
};

export default Quiz;
