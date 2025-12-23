interface InterviewProps {
    question: string;
}

export default function Interview({ question }: InterviewProps) {
    return ( 
        <div>
            <h1>Interview 1</h1>
            <p>{question}</p>
        </div>
    );
}