import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MicSelector from "../components/MicSelector";
import "../styles/StartInterview.css";

function InterviewPage() {
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  async function startInterview() {
    const data = { position, level, company, type, notes };

    try {
      const response = await fetch("http://localhost:8000/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.question) {
        // navigate after success
        navigate("/interview", {
          state: {
            initialQuestion: result.question,
            position,
            level,
            company,
            type,
            notes,
          },
        });
      } else if (result.error) {
        console.error("API error:", result.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <div className='start-page-container'>
      <h1 className="heading">Configure your interview </h1>
      <div className="info-container">
        <input placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} />
        <input placeholder="Level" value={level} onChange={e => setLevel(e.target.value)} />
        <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
        <input placeholder="Type" value={type} onChange={e => setType(e.target.value)} />
        <input placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
      </div>

      <button 
        className='start-interview-button' 
        onClick={startInterview}
        >
          Start Interview
      </button>
    </div>
  );
}

export default InterviewPage;