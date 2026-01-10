type TranscriptLine = {
  role: string;
  text: string;
};

interface TranscriptViewerProps {
  transcript: TranscriptLine[];
  isOpen: boolean;
  onToggle: () => void;
}

function TranscriptViewer({ transcript, isOpen, onToggle }: TranscriptViewerProps) {
  return (
    <div className="transcript-container">
      <button 
        onClick={onToggle}>
        {isOpen ? "Hide Transcript" : "View Transcript"}
      </button>

      {isOpen && (
        <div className="transcript-view">
          {transcript.length === 0 ? (
            <p>No transcript yet.</p>
          ) : (
            transcript.map((line, i) => (
              <p key={i}>
                <strong>{line.role}:</strong> {line.text}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TranscriptViewer;