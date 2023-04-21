import { Routes, Route, BrowserRouter } from "react-router-dom";
import Quiz from "./pages/quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
