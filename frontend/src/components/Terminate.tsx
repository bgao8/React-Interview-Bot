import "../styles/Interview.css";

interface TerminateProps {
    handleTerminate: () => void;
}

function Terminate({handleTerminate}: TerminateProps) {
    return (
        <button className="terminate-button" onClick={handleTerminate}>
            End Interview
        </button>
    )
}

export default Terminate;