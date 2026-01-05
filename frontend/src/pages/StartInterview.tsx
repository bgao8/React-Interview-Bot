import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserInfo from "../components/UserInfo";
import "../styles/StartInterview.css";
import MicSelector from "../components/MicSelector";

function StartInterview() {
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

  const [selectedMic, setSelectedMic] = useState<MediaDeviceInfo | null>(null);

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

      const result = await res.json();

      // Navigate with the greeting question
      navigate("/interview", {
        state: {
          initialQuestion: result.question,
        },
      });
    } catch (err) {
      console.error("Error starting interview:", err);
    }
  }

  return (
    <div className="start-page-container">
      <h1 className="heading">Configure Your Interview</h1>

      <div className="info-container">
        <UserInfo
          position={position}
          setPosition={setPosition}

          level={level}
          setLevel={setLevel}

          company={company}
          setCompany={setCompany}

          type={type}
          setType={setType}
          
          notes={notes}
          setNotes={setNotes}
        />
      </div>

      <div className="mic-selector">
        <MicSelector 
          value={selectedMic?.deviceId} 
          onSelect={setSelectedMic} 
        />
      </div>

      <button
        className="start-interview-button"
        onClick={startInterview}
      >
        Start Interview
      </button>
      
    </div>
  );
}

export default StartInterview;