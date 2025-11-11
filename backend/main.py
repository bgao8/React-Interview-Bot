from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from interviewer import Interviewer  # your logic
import openai
from pydantic import BaseModel

class InterviewRequest(BaseModel):
    position: str
    level: str
    company: str
    type: str
    notes: str

app = FastAPI()

# Allow frontend (e.g., React running on localhost:5173 or 3000) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def build_message(data: InterviewRequest):
    messages=[
        {'role':'system', 'content':
                    "You are an interviewer for a competitive position. "
                    "Ask realistic, challenging questions."
                    "Don't be too friendly, but don't just be a robot."
                    "Ask one question at a time, and let the applicant respond. "
                    "Respond to answers appropriately and professionally"
                    "Keep the interview to a realistic length, and wrap up"},
        {'role':'user', 
            'content':f"Interview type: {data.type}, Position: {data.position}, level: {data.level}, company: {data.company}, additional notes: {data.notes}"
                f'Last 16 lines of conversation: {data.conversation[-16:]}'}
    ]

    return messages

@app.post("/interview")
async def ask_question(request: InterviewRequest):
    message = build_message(request)
    try:
        print('Loading...')
        response = openai.chat.completions.create(
            model='gpt-4o-mini',
            messages=message
        )
        question = response.choices[0].message.content.strip()
        return {'question': question}

    except Exception as e:
        return {'error': str(e)}