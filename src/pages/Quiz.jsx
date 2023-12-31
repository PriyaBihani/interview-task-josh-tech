import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Overview from "../components/Overview";
import Question from "../components/Question";
import Timer from "../components/Timer";
import Controllers from "../components/Controllers";
import { fetchQuestions } from "../utils/api";
import Loader from "../components/Loader";
import Guide from "../components/Guide";

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]); // will store all the questions fetched from the API
  const [currentQuestion, setCurrentQuestion] = useState({}); // current question
  // initially answers is an array of null values with length equal to that of the number of questions
  const [answers, setAnswers] = useState(
    new Array(questions?.length || 0).fill(null)
  ); // answers to the attempted questions
  const [visitedQuestions, setVisitedQuestions] = useState([]); // indices of visited questions

  useEffect(() => {
    const getFormattedQuestions = async () => {
      const formattedQuestions = await fetchQuestions();
      setQuestions(formattedQuestions);
      setCurrentQuestion(formattedQuestions[0]);
      setVisitedQuestions([0]);
    };
    getFormattedQuestions();
  }, []);

  const handleAnswer = (questionIndex, answer) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = answer;
      return newAnswers;
    });
  };

  const addToVisitedQuestions = (questionIndex) => {
    setVisitedQuestions((prevVisitedQuestions) =>
      !prevVisitedQuestions.includes(questionIndex)
        ? [...prevVisitedQuestions, questionIndex]
        : prevVisitedQuestions
    );
  };

  const handleNextQuestion = (questionIndex) => {
    if (questionIndex === questions.length - 1) return;

    setCurrentQuestion(questions[questionIndex + 1]);
    addToVisitedQuestions(questionIndex + 1);
  };

  const handlePrevQuestion = (questionIndex) => {
    if (questionIndex === 0) return;

    setCurrentQuestion(questions[questionIndex - 1]);
    addToVisitedQuestions(questionIndex - 1);
  };

  const goToQuestion = (questionIndex) => {
    setCurrentQuestion(questions[questionIndex]);
    addToVisitedQuestions(questionIndex);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/report", { state: { answers, questions } });
  };

  if (questions.length === 0) return <Loader />;

  return (
    <>
      <div className="flex flex-col items-center m-4 md:m-8 md:flex-row md:justify-between md:items-center">
        <Guide />
        <Timer timeLimit={1800} handleTimeout={handleSubmit} />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start w-full">
        <div className="justify-center w-full md:w-1/5 flex justify-left">
          <Overview
            questions={questions}
            visitedQuestions={visitedQuestions}
            attemptedQuestions={answers}
            currentQuestion={currentQuestion}
            goToQuestion={goToQuestion}
            handleQuestionClick={goToQuestion}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="w-full flex flex-col md:flex-col  md:w-4/5 px-3 md:pr-10">
          <Question question={currentQuestion} handleAnswer={handleAnswer} />
          <Controllers
            currentQuestionId={currentQuestion.id}
            handleNextQuestion={handleNextQuestion}
            handlePrevQuestion={handlePrevQuestion}
            handleSubmit={handleSubmit}
            questionLength={questions.length}
          />
        </div>
      </div>
    </>
  );
};

export default Quiz;
