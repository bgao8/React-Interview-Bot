 // import { useState } from "react";

interface RecordButtonProps {
    onClick: () => void;
    disabled?:boolean;
    type:'button';
    children:React.ReactNode;
}

function RecordButton({ onClick, disabled, type, children }: RecordButtonProps) {
    return (
        <div>
            {/* { isRecording && <MicSelector onSelect={handleMicSelect} />}
            { isRecording && <StopButton onClick={handleStop} />} */}
            <button 
                type={type}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
                Start Recording
            </button>
        </div>
    )
}

export default RecordButton;