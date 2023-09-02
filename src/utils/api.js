export const fetchQuestions = async () => {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=15&type=multiple"
    );
    const data = await response.json();
    return data.results.map((question, index) => ({
      question: question.question,
      options: [...question.incorrect_answers, question.correct_answer],
      correct_answer: question.correct_answer,
      id: index,
    }));
  } catch (error) {
    console.log("Fetch error", error);
  }
};
