 // import { useState } from "react";
import MicSelector from "./MicSelector";
import StopButton from "./StopButton";

interface RecordButtonProps {
    onClick: () => void;
}

function RecordButton({ onClick }: RecordButtonProps) {
    // const [ isRecording, setIsRecording ] = useState(false);
    // const [ selectedMic, setSelectedMic ] = useState(null);
    // const [ mediaStream, setMediaStream ] = useState(null);

    // const handleMicSelect = (mic) => {
    //     setSelectedMic(mic);
    //     console.log('Selected mic:', mic);
    // };

    // const handleStartClick = async(micDevice) => {
    //     setIsRecording(true);
    //     console.log("Started recording with", selectedMic);

    //     try {
    //         const stream = await navigator.mediaDevices.getUserMedia({ deviceId: micDevice.deviceId });
    //         setMediaStream(stream);
    //     }
    //     catch(err) {
    //         console.error("Could not access input device", err);
    //     }
    // }

    return (
        <div>
            {/* { isRecording && <MicSelector onSelect={handleMicSelect} />}
            { isRecording && <StopButton onClick={handleStop} />} */}
            <button onClick={onClick}>
                Start Recording
            </button>
        </div>
    )
}

export default RecordButton;