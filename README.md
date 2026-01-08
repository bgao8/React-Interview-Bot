## Hone
Hone is an AI-powered interview practice platform designed to help users prepare technical and behavioral interviews through live simulation. 
Hone was built with a Python backend, a Typescript/React frontend, and FastAPI middleware.

The project was motivated by my own experiences with preparing for interviews. 
I wanted to make a tool that could ask the right questions, listen to the user's responses, and follow up on those responses.

This project represents my first end-to-end React application, with a focus on building a production-style system that connects frontend interaction with live, AI-driven backend functionality.

## Tech Stack
- **Frontend:** React, Typescript, Vite
- **Backend:** Python, FastAPI
- **Audio & AI:** Live microphone input, speech-to-text, AI-driven response logic

## Key Features
- **Interview configuration** customize role, level, company, and interview type
- **Live interview simulation** with context-aware questions and responses
- **Real-time audio capture and transcription**

## Installation
**Prerequisites**
- Node.js 18+ (https://nodejs.org)
- Python 3.9+

**1. Clone the repository and navigate to project directory:**
```bash 
git clone https://github.com/bgao8/React-Interview-Bot.git
cd React-Interview-Bot
```

**2. Backend setup**
```bash
cd backend
```
- Install Python dependencies:
```bash
pip install -r requirements.txt
```
- Start API backend:
```bash
uvicorn main:app --reload
```
**3. Frontend setup (in a separate terminal)**
```bash
cd frontend
```
- Install Javascript dependencies:
```bash
npm install
```
- Start Vite development server:
```bash
npm run dev
```

## Usage Guide
1. Click **Configure Interview** on the home screen.
2. Fill in configuration fields, then press **Start Interview**.
3. Press **Start Recording**, and respond to the questions as you would in a real interview.
4. Press **Stop Recording**. You may need to wait a few seconds for AI response.
5. Press **End Interview** at the bottom of the page at any time to go back to the home screen.
6. Repeat steps **3-5** until the interviewer wraps up (manually termination required for now).
