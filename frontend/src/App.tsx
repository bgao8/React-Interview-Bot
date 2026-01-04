import React, { useMemo, useRef, useState } from "react";
import Router from "./Router";


// API CONFIG 
// Use relative paths so the Vite dev server proxy (if configured) applies
const VITE_API_BASE = (import.meta as any)?.env?.VITE_API_BASE;
const API_BASE = VITE_API_BASE ?? "";
const API_PATHS = {
  interview: `${API_BASE}/interview`,
  grade: `${API_BASE}/grade`, // implement in FastAPI to call Grader.grade_interview
};


// Small UI primitives
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

// Types 
type Role = "Interviewer" | "Applicant";
type TranscriptEntry = [Role, string];

// Helpers
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


// Main Component
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

  const [selectedMic, setSelectedMic] = useState<MediaDeviceInfo | null>(null);
  

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
        micDeviceId: selectedMic?.deviceId,
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

    return (
      <Router />
    )
  };

  // submit answer
  // const submitAnswer = () => {
  //   if (!userAnswer.trim()) return;
  //   setConversation([...conversation, ["Applicant", userAnswer]]);
  //   setUserAnswer("");
  // };
};