from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from interviewer import Interviewer  # your logic
import openai
from pydantic import BaseModel
from typing import List, Any


class InterviewRequest(BaseModel):
    position: str
    level: str
    company: str
    type: str
    notes: str
    conversation: List[List[Any]] = []

app = FastAPI()

# Allow frontend (e.g., React running on localhost:5173 or 3000) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

def build_message_from_request(data: InterviewRequest):
    messages = [
        {
            'role': 'system',
            'content': (
                "You are an interviewer for a competitive position. "
                "Ask realistic, challenging questions. "
                "Don't be too friendly, but don't just be a robot. "
                "Ask one question at a time, and let the applicant respond. "
                "Respond to answers appropriately and professionally. "
                "Keep the interview to a realistic length, and wrap up."
            ),
        }
    ]

    user_content = (
        f"Interview type: {data.type}, Position: {data.position}, level: {data.level}, company: {data.company}, additional notes: {data.notes}. "
    )

    try:
        last_lines = data.conversation[-16:]
        user_content += f" Last lines: {last_lines}"
    except Exception:
        pass

    messages.append({'role': 'user', 'content': user_content})

    return messages

interviewer = Interviewer()


@app.post("/interview")
async def ask_question(request: InterviewRequest):
    try:
        messages = build_message_from_request(request)

        print("Loading...")
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages
        )

        ai_question = response.choices[0].message.content.strip()

        interviewer.conversation.append(("Interviewer", ai_question))

        return {"question": ai_question}

    except Exception as e:
        print("Error in /interview:", e)
        return {"error": str(e)}