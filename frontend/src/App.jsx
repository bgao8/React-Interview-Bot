import { useState } from 'react'
import './App.css'
import MicSelector from './components/MicSelector'
import RecordButton from './components/RecordButton'
import StopButton from './components/StopButton'
import InterviewPage from './components/StartInterview'
import UserInfo from './components/UserInfo'
import { useNavigate } from "react-router-dom";


function App() {
  // const [ isRecording, setIsRecording ] = useState(false);
  const navigate = useNavigate();
  const [ position, setPosition ] = useState('');
  const [ level, setLevel ] = useState('');
  const [ company, setCompany ] = useState('');
  const [ type, setType ] = useState('');
  const [ notes, setNotes ] = useState('');
  const [ selectedMic, setSelectedMic ] = useState(null);
  const [ mediaStream, setMediaStream ] = useState(null);
  // const [ isStarted, setIsStarted ] = useState(false);
  const [ isRecording, setIsRecording ] = useState(false);
  const [ question, setQuestion ] = useState(null);

  // const [ isSubmitted, setIsSubmitted ] = useState(false);
  const data = { position, level, company, type, notes };

  const handleMicSelect = (mic) => {
      setSelectedMic(mic);
      console.log('Selected mic:', mic.label);
  };

  // const handleStartClick = async() => {
  //     setIsStarted(true);
  //     console.log("Started interview");

  // }

  const handleRecordClick = async() => {
      setIsRecording(true);
      console.log("Started recording with", selectedMic);

      try {
          const stream = await navigator.mediaDevices.getUserMedia({ deviceId: selectedMic.deviceId });
          setMediaStream(stream);
      }
      catch(err) {
          console.error("Could not access input device", err);
      }
  }

  const handleStop = () => {
      if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
          setMediaStream(null);
      }
      setIsRecording(false);
      setSelectedMic(null);
  }

  // const handleSubmitInfo =() => {
  //     console.log('Position:', position);
  //     console.log('Level:', level);
  //     console.log('Company:', company);
  //     console.log('Type:', type);
  //     console.log('Additional notes:', notes);

  //     setPosition('');
  //     setLevel('');
  //     setCompany('');
  //     setType('');
  //     setNotes('');

  //     // setIsSubmitted(true);
  //     navigate("/interview");
  // };

  return (
    <div>
      { <MicSelector onSelect={handleMicSelect} />}

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

      <InterviewPage />

      {/* { isStarted && <RecordButton onClick={handleRecordClick}/>} */}
      { isRecording && <StopButton onClick={handleStop} />}

      {/* { !isRecording && <UserInfo />} */}

      {/* <button
        onClick={() => startInterview({
          position: "Software engineer",
          level: "Intern",
          company: "Google",
          type: "Behavioral",
          notes: "None"
        })}
      >
        Submit
      </button> */}

      {/* {question && <p>{question}</p>} */}
    </div>
  )
}

export default App;