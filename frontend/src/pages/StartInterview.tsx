import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
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
      const res = await fetch("http://localhost:8000/start-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to start interview");
      }

      navigate("/interview", {
        state: {
          position,
          level,
          company,
          type,
          notes,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='start-page-container'>
      <h1 className="heading">Configure your interview </h1>
      <div className="info-container">
        <UserInfo 
          position={position} setPosition={setPosition}
          level={level} setLevel={setLevel}
          company={company} setCompany={setCompany}
          type={type} setType={setType}
          notes={notes} setNotes={setNotes}
        />
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