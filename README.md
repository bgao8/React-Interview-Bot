## Hone
Hone is an AI-powered interview practice platform designed to help users prepare technical and behavioral interviews through live simulation. 
Hone was built with a Python backend, a Typescript/React frontend, and FastAPI middleware.

The project was motivated by my own experiences with preparing for interviews. 
I wanted to make a tool that could ask the right questions, listen to the user's responses, and follow up on those responses.
My goal was to streamline the practice process through customizability and user-friendly UI.

This project represents my first end-to-end React application.
The focus was on building a production-style application that connects frontend interaction with live AI-driven functionality.

## Key Features
- **Interview configuration** allows users to provide context regarding role, level, company, and interview type.
- **Live interview simulation** using device microphone with context-aware questions and responses.
- Real-time audio capture and transcription

## Installation
1. Clone the repository:
```bash 
https://github.com/bgao8/React-Interview-Bot.git
```
```bash
cd React-Interview-Bot
```
2. Install frontend dependencies (npm):
```bash
npm install
```
3. Install backend Python dependencies:
```bash
pip install -r requirements.txt
```

4. Run backend and frontend in separate terminal tabs:
```bash
uvicorn main:app --reload
```
```bash
npm run dev
```

## Usage Guide
1. Click **Configure Interview** on the home screen.
2. Fill in the blanks with as much detail as possible, then press **Start Interview**.
3. Press **Start Recording**, and respond to the questions as you would in a real interview.
4. Press **Stop Recording**. You may need to wait a few seconds for the response.
5. Press **End Interview** at the bottom of the page at any time to go back to the home screen.
6. Repeat steps **3-5**, and eventually the interviewer will wrap. You will need to press **End Interview** to officially terminate the interview (I'm working on automating this).
