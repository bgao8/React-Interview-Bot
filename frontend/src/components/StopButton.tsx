interface StopButtonProps {
    onStop: () => void;
}

function StopButton({ onStop }: StopButtonProps) {
    return (
        <button onClick={onStop}>Stop Recording</button>
    );
}

export default StopButton;