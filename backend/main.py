from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from interviewer import Interviewer
from pydantic import BaseModel

class InterviewRequest(BaseModel):
    position: str
    level: str
    company: str
    type: str
    notes: str | None = None

class StartRecordingRequest(BaseModel):
    mic_device_id: str

app = FastAPI()

# Allow frontend (e.g., React running on localhost:5173 or 3000) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

interviewer = Interviewer()

@app.post("/interview")
def ask_question():
    try:
        question = interviewer.ask_question()
        return {"question": question}

    except Exception as e:
        print("Error in /interview:", e)
        return {"error": str(e)}
    
@app.post("/start-recording")
def start_recording():
    interviewer.start_recording(None)
    return {"status": "ok"}

@app.post("/stop-recording")
def stop_recording():
    question = interviewer.stop_recording()
    return {"question": question}

@app.post("/start-interview")
def start_interview(data: InterviewRequest):
    interviewer.position = data.position
    interviewer.level = data.level
    interviewer.company = data.company
    interviewer.type = data.type
    interviewer.notes = data.notes or ""

    print("SAVED:", interviewer.__dict__)
    return {"status": "ok"}
