import { useState, useEffect } from "react";
// import RecordButton from "../components/RecordButton";
// import StopButton from "../components/StopButton"
import RecordControls from "../components/RecordControls";
import "../styles/Interview.css";

function Interview() {
  const [currentQuestion, setCurrentQuestion] = useState<string>(
    "Nice to meet you. How are you doing today?"
  );
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

  return (
    <div className="interview-container">
      <p className="question-container">
        {currentQuestion}
      </p>

      <div>
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
    </div>
  );
}

export default Interview;