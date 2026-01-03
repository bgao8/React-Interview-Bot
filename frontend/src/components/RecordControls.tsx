import "../styles/Interview.css"

interface RecordControlsProps {
    isRecording:boolean;
    loading:boolean;
    onStart: () => void;
    onStop: () => void;
}

function RecordControls({
    isRecording,
    loading,
    onStart,
    onStop
}: RecordControlsProps) {
    return (
        <div>
            {!isRecording && (
                <button 
                    className="record-controls-button"
                    type='button'
                    onClick={onStart}
                >
                    Start Recording
                </button>
            )}

            {isRecording && (
                <button
                    className="record-controls-button"
                    type='button'
                    onClick={onStop}
                >
                    Stop Recording
                </button>
            )}
        </div>
    )
}

export default RecordControls;