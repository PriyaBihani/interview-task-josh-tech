import { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("email", email);
    setEmail("");
    navigate("/quiz");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-4xl font-bold mb-8">Start Quiz</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="email" className="text-lg font-medium mb-2">
          Enter your email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full shadow-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
