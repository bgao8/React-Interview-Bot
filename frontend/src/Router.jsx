import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Interview from './components/Interview';
import InterviewPage from "./components/StartInterview";

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </Router>
  );
}
