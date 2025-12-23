import React, { useMemo, useRef, useState } from "react";
/**
* Interview Bot – Single‑file React Frontend
* -----------------------------------------------------------
* This UI wires up to a FastAPI backend suggested by your files:
* - POST /interview -> { question: string } (uses position, level, company, type, notes)
* - POST /grade -> { grade: string } given { transcript: [ ["Interviewer", msg], ["Applicant", msg], ... ], type: "b"|"t" }
*
* If your backend exposes different routes, tweak API_PATHS below.
* The UI lets you: configure an interview, pull the next question, type answers,
* and request a grade at any time based on the running transcript.
*
* Styling: Tailwind (no import needed in ChatGPT canvas). Minimal shadcn/ui usage
* is inlined as simple utility components to avoid external setup.
*/


// ====== API CONFIG ======
const API_BASE = (import.meta as any)?.env?.VITE_API_BASE || "http://localhost:8000";
const API_PATHS = {
interview: `${API_BASE}/interview`,
grade: `${API_BASE}/grade`, // implement in FastAPI to call Grader.grade_interview
};


// ====== Small UI primitives (shadcn-like) ======
const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
<div className={`rounded-2xl shadow-md border border-zinc-800/40 bg-zinc-900 ${className}`}>{children}</div>
);
const CardHeader: React.FC<React.PropsWithChildren<{ title?: string; sub?: string }>> = ({ title, sub, children }) => (
<div className="p-4 border-b border-zinc-800">
{title && <h2 className="text-xl font-semibold">{title}</h2>}
{sub && <p className="text-sm text-zinc-400 mt-1">{sub}</p>}
{children}
</div>
);
const CardContent: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
<div className={`p-4 ${className}`}>{children}</div>
);
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = "", children, ...props }) => (
<button
className={`px-4 py-2 rounded-xl bg-white text-black font-medium hover:opacity-90 disabled:opacity-50 ${className}`}
{...props}
>
{children}
</button>
);
const GhostButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = "", children, ...props }) => (
<button
className={`px-3 py-2 rounded-xl border border-zinc-800 text-zinc-200 hover:bg-zinc-800/40 disabled:opacity-50 ${className}`}
{...props}
>
{children}
</button>
);
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = "", ...props }) => (
<input className={`w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-500 ${className}`} {...props} />
);
const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = "", ...props }) => (
<textarea className={`w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-500 ${className}`} {...props} />
);


// ====== Types ======
type Role = "Interviewer" | "Applicant";


type TranscriptEntry = [Role, string];


// ====== Helpers ======
async function postJSON<T>(url: string, body: any): Promise<T> {
const res = await fetch(url, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(body),
});
if (!res.ok) {
const text = await res.text();
throw new Error(`${res.status} ${res.statusText}: ${text}`);
}
return res.json();
}


// ====== Main Component ======
export default function App() {
  // interview setup
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

  // conversation state
  const [conversation, setConversation] = useState<TranscriptEntry[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // get next question
  const askQuestion = async () => {
    if (!position || !level || !company || !type) {
      alert("Please fill in all interview details first");
      return;
    }

    setIsLoading(true);
    try {
      const data = await postJSON<{ question: string }>(API_PATHS.interview, {
        position,
        level,
        company,
        type,
        notes,
        conversation: conversation.slice(-16), // last 16 entries
      });
      setCurrentQuestion(data.question);
      setConversation([...conversation, ["Interviewer", data.question]]);
    } catch (error) {
      console.error("Failed to get question:", error);
      alert("Failed to get question. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  // submit answer
  const submitAnswer = () => {
    if (!userAnswer.trim()) return;
    setConversation([...conversation, ["Applicant", userAnswer]]);
    setUserAnswer("");
  };

  // grade interview
  const gradeInterview = async () => {
    if (conversation.length === 0) {
      alert("No conversation to grade yet");
      return;
    }

    setIsLoading(true);
    try {
      const data = await postJSON<{ grade: string }>(API_PATHS.grade, {
        transcript: conversation,
        type: type || "b", // behavioral or technical
      });
      alert(`Grade: ${data.grade}`);
    } catch (error) {
      console.error("Failed to grade:", error);
      alert("Failed to grade interview. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader title="Interview Bot" sub="Configure your mock interview" />
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Position (e.g., Software Engineer)"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
              <Input
                placeholder="Level (e.g., Senior)"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
              <Input
                placeholder="Company (e.g., Google)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <Input
                placeholder="Type (b for behavioral, t for technical)"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Additional notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
            <Button onClick={askQuestion} disabled={isLoading}>
              {isLoading ? "Loading..." : "Start Interview"}
            </Button>
          </CardContent>
        </Card>

        {currentQuestion && (
          <Card>
            <CardHeader title="Current Question" />
            <CardContent>
              <p className="text-lg mb-4">{currentQuestion}</p>
              <Textarea
                placeholder="Your answer..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2 mt-4">
                <Button onClick={submitAnswer} disabled={!userAnswer.trim()}>
                  Submit Answer
                </Button>
                <GhostButton onClick={askQuestion} disabled={isLoading}>
                  Next Question
                </GhostButton>
                <GhostButton onClick={gradeInterview} disabled={isLoading}>
                  Grade Interview
                </GhostButton>
              </div>
            </CardContent>
          </Card>
        )}

        {conversation.length > 0 && (
          <Card>
            <CardHeader title="Conversation History" />
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {conversation.map(([role, message], i) => (
                  <div key={i} className={`p-3 rounded-lg ${role === "Interviewer" ? "bg-zinc-800" : "bg-zinc-700"}`}>
                    <strong className="text-sm text-zinc-400">{role}:</strong>
                    <p className="mt-1">{message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}