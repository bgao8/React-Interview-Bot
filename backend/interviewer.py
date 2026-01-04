import os
import openai
from applicant import Applicant
from dotenv import load_dotenv
import threading
# from grader import Grader

load_dotenv('key.env')
openai.api_key = os.getenv('OPENAI_API_KEY')

class Interviewer:
    def __init__(self):
        self.applicant = Applicant()
        # self.grader = Grader()
        self._stop_event = threading.Event()
        self.recording_thread = None
        
        self.position = ''
        self.level = ''
        self.company = ''
        self.type = ''
        self.notes = ''

    def is_recording(self):
        return self.applicant.is_recording()

    def start_recording(self, mic_index):
        if self.recording_thread:
            return  # already recording
        
        self.applicant.start_talking()

        def record():
            print("LISTENING STARTED")
            text = self.applicant.record_once(mic_index)
            print("AUDIO CAPTURED:", text)
            self._last_applicant_text = text

        self._last_applicant_text = None
        self.recording_thread = threading.Thread(target=record)
        self.recording_thread.start()

    def stop_recording(self):
        if not self.recording_thread:
            return None

        self.applicant.stop_talking()
        self.recording_thread.join()
        self.recording_thread = None

        if not self._last_applicant_text:
            print("NO AUDIO CAPTURED")
            return None

        self.add_to_transcript("Applicant", self._last_applicant_text)
        return self.ask_question()

    def build_message(self):
        if os.path.exists('transcript.txt'):
            with open('transcript.txt', 'r') as file:
                transcript = ''.join(file.readlines())

        messages=[
            {'role':'system', 'content':
                "Given the interview type, position, level, company, and additional notes,"
                "Ask realistic, relevant, challenging questions."
                "Use online resources to ensure questions are accurate and relevant for the company and position."
                "Ask one question at a time."
                "Respond to answers appropriately and professionally"
                "Keep the interview to a realistic length, and wrap up"
                "Do not use speaker labels like 'Interviewer: '"},
            {'role':'user', 
                'content':f"Interview type: {self.type}, Position: {self.position}, level: {self.level}, company: {self.company}, additional notes: {self.notes}"
                    f'Recent conversation: {transcript}'}
        ]

        return messages

    def ask_question(self):
        message = self.build_message()
        try:
            print('Loading...')
            response = openai.chat.completions.create(
                model='gpt-4o-mini',
                messages=message
            )
            question = response.choices[0].message.content.strip()
            self.add_to_transcript('Interviewer', question)
            return question

        except Exception as e:
            raise e

    def add_to_transcript(self, role, text):
        with open('transcript.txt' , 'a') as file:
            file.write(f'{role}: {text}\n')

    # For future use
    '''
    def get_transcript(self):
        as_string = ''
        as_string += "============== TRANSCRIPT ============== \n"
        as_string += "Applicant details: \n"
        as_string += f'Position: {self.position}, Level: {self.level}, Company: {self.company}, Type: {self.type}, Notes: {self.notes} \n'
        with open('transcript.txt' , 'r') as file:
            lines = file.readlines()
            for line in lines:
                as_string += line

        return as_string

    def get_last_response(self):
        if not os.path.exists('transcript.txt'):
            return None
        
        with open('transcript.txt' , 'r') as file:
            lines = file.readlines()
            for line in lines:
                stripped = line.strip()
                if stripped:
                    lines.append(stripped)

        return lines[-1] if lines else None

    def terminate(self):
        self.stop_recording()
        self._stop_event.set()

    def grade_interview(self):
        return self.grader.grade_interview(self.type)
    '''
