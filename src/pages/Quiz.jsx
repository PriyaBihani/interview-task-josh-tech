import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Overview from "../components/Overview";
import Question from "../components/Question";
import Timer from "../components/Timer";
import Controllers from "../components/Controllers";

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]); // will store all the questions fetched from the API
  const [currentQuestion, setCurrentQuestion] = useState({}); // current question
  // initially answers is an array of null values with length equal to that of the number of questions
  const [answers, setAnswers] = useState(questions.map(() => null)); // answers to the attempted questions
  const [visitedQuestions, setVisitedQuestions] = useState([]); // indices of visited questions
  console.log("ans", answers);
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
    const questionIndex = questions.findIndex((q) => q.id === questionId);
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = answer;
      return newAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion.id === questions.length) return;
    const curQuestion = questions.findIndex(
      (question) => question.id === currentQuestion.id
    );
    if (curQuestion != -1) {
      setCurrentQuestion(questions[curQuestion + 1]);
      setVisitedQuestions((prevVisitedQuestions) =>
        !visitedQuestions.includes(curQuestion + 1)
          ? [...prevVisitedQuestions, curQuestion + 1]
          : prevVisitedQuestions
      );
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
    navigate("/report", { state: { answers, questions } });
  };

  return (
    <>
      <Timer timeLimit={1800} handleTimeout={handleSubmit} />
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center items-start w-full">
          <div className="w-3/12 flex justify-left">
            <Overview
              questions={questions}
              visitedQuestions={visitedQuestions}
              attemptedQuestions={answers}
              currentQuestion={currentQuestion}
            />
          </div>
          <div className="w-1/2">
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
      </div>
    </>
  );
};

export default Quiz;
