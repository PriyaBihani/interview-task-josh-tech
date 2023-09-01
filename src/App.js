import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
