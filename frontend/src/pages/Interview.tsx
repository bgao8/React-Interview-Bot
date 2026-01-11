import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RecordControls from "../components/RecordControls";
import Terminate from "../components/Terminate";
import { useNavigate } from "react-router-dom";
import "../styles/Interview.css";

function Interview() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [currentQuestion, setCurrentQuestion] = useState<string>(
    state?.initialQuestion ?? ""
  );

  // run once
  useEffect(() => {
    if (state?.initialQuestion) {
      setCurrentQuestion(state.initialQuestion);
    }
  }, [state]);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [audioError, setAudioError] = useState(false);

  const startRecording = async () => {
    if (isRecording) return;

    try {
      setIsRecording(true);

      const res = await fetch("http://localhost:8000/start-recording", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to start recording");
      }

    } catch (err) {
      console.error(err);
      setIsRecording(false);
    }

    console.log("Started recording")
  };

  const stopRecording = async () => {
    if (!isRecording || loading) return;

    try {
      setLoading(true);
      setIsRecording(false);

      const res = await fetch("http://localhost:8000/stop-recording", {
        method: "POST",
      });

      const data = await res.json();

      if (!data.question) {
        console.warn("No audio captured — interview not advanced");
        setAudioError(true)
        return;
      }
      setAudioError(false)
      setCurrentQuestion(data.question);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const terminateInterview = async () => {
    const res = await fetch("http://localhost:8000/terminate-interview", {
      method: "POST",
    });
    
    if (!res.ok) {
      console.error("Terminate failed");
      return;
    }

    navigate("/");
  }

  return (
    <div className="interview-container">
      <div className="question-section">
        <p className="question-container">
          {currentQuestion}
        </p>
      </div>

      <div className="controls-section">
        <RecordControls
          isRecording={isRecording}
          loading={loading}
          onStart={startRecording}
          onStop={stopRecording}
        />
      </div>

      {loading && <p>Processing response…</p>}
      {audioError && (
        <>
          Audio not captured. Please try again.
        </>
      )}

      <Terminate handleTerminate={terminateInterview}/>

    </div>
  );
}

export default Interview;