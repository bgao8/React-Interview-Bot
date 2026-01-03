from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# React running on localhost:5173 or 3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)