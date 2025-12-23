import { useState } from 'react';

function InterviewPage() {
    const [position, setPosition] = useState<string>('');
    const [level, setLevel] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [question, setQuestion] = useState<string | null>(null);

    async function startInterview() {
        const data = { position, level, company, type, notes };

        try {
            const response = await fetch('http://localhost:8000/interview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        
            const result = await response.json();
            if (result.question) {
                console.log('Interviewer question:', result.question)
                setQuestion(result.question)
            }
            else if (result.error) {
                console.error('API error:', result.error);
            }
        }
        catch (error) {
            console.error('Fetch error:', error);
        }
    }

    return (
        <div>
            <input placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} />
            <input placeholder="Level" value={level} onChange={e => setLevel(e.target.value)} />
            <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
            <input placeholder="Type" value={type} onChange={e => setType(e.target.value)} />
            <input placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />

            {/* <button onClick={startInterview}>Submit */}
            <button onClick={startInterview}>Start</button>

            { question && (
                <div>
                    <h3>Interview question: </h3>
                    <p>{question}</p>
                </div>
            )}
        </div>
    )
}

export default InterviewPage;