import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestQuest from "./pages/TestQuest";
import Results from "./pages/Results";
// import TestQuiz from "./pages/TestQuiz";

// import "./App.css"

function App() {
	return (
		<div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestQuest />} />            
          <Route path="/results" element={<Results />} />
          {/* <Route path="/quiz" element={<TestQuiz />} />      */}
        </Routes>
      </BrowserRouter>
		</div>
	)
}

export default App
