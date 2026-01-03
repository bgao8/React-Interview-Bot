## Hone
Hone is an AI-powered interview practice platform designed to help users prepare technical and behavioral interviews through live simulation. 
Hone was built with a Python backend and Typescript/React frontend.

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
cd hone
```
2. Install frontend dependencies:
```bash
npm install
```
3. Install backend dependencies:
```bash
pip install -r requirements.txt
```
4. Install Vosk speech recognition:
https://github.com/alphacep/vosk-api

5. Run backend and frontend in separate terminal tabs:
```bash
uvicorn main:app --reload
npm run dev
```

## Usage Guide
1. Click **Configure Interview** on the home screen.
2. Fill in the blanks, then press **Start Interview**.
3. Press **Start Recording**, and respond as you would in a real interview.
4. Press **Stop Recording**. You may need to wait a few seconds for the response. 
5. Repeat steps **3-4**, eventually the interviewer will wrap.
6. You will need to manually clear **transcript.txt** file locally, then press back arrow on your browser until back at the home screen. [This will be updated]
