import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Interview from "./components/Interview";
import InterviewPage from "./components/StartInterview";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/start" element={<InterviewPage />} />
        <Route path="/interview" element={<Interview question="Welcome to your interview!" />} />
      </Routes>
    </BrowserRouter>
  );
}