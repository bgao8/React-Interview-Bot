import os
import openai
from applicant import Applicant
from dotenv import load_dotenv
import threading
from grader import Grader

load_dotenv('key.env')
openai.api_key = os.getenv('OPENAI_API_KEY')

class Interviewer:
    def __init__(self):
        self.applicant = Applicant()
        self.grader = Grader()
        self._stop_event = threading.Event()
        self.recording_thread = None
        

        self.position = ''
        self.level = ''
        self.company = ''
        self.type = ''
        self.notes = ''
        
        self.conversation = []

    def is_recording(self):
        return self.applicant.is_recording()

    def start_recording(self, mic_index):
        self._stop_event.clear()
        self.applicant.start_talking()

        def recording_loop():
            while not self._stop_event.is_set():
                response = self.applicant.log_response(mic_index)
                self.add_to_conversation('Applicant', response)
        # self.answer_question(mic_index)

        self.recording_thread = threading.Thread(target=recording_loop)
        self.recording_thread.start()

    def stop_recording(self):
        self._stop_event.set()
        self.applicant.stop_talking()
        if self.recording_thread:
            self.recording_thread.join()

    def build_message(self):
        messages=[
            {'role':'system', 'content':
                     "You are an interviewer for a competitive position. "
                     "Given the interview type, position, level, company, and additional notes,"
                     "Ask realistic, relevant, challenging questions."
                     "Use online resources to ensure questions are accurate and relevant for the company and position."
                     "Ask one question at a time, and let the applicant respond. "
                     "Respond to answers appropriately and professionally"
                     "Keep the interview to a realistic length, and wrap up"},
            {'role':'user', 
                'content':f"Interview type: {self.type}, Position: {self.position}, level: {self.level}, company: {self.company}, additional notes: {self.notes}"
                    f'Last 16 lines of conversation: {self.conversation[-16:]}'}
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
            self.add_to_conversation('Interviewer', question)
            return question

        except Exception as e:
            raise e

    def add_to_conversation(self, role, text):
        if (role == 'Applicant'):
            self.conversation.append((role, text))
        
        elif (role == 'Interviewer'):
            self.conversation.append((role, text))

    def get_conversation(self):
        as_string = ''
        as_string += "============== TRANSCRIPT ============== \n"
        as_string += "Applicant details: \n"
        as_string += f'Position: {self.position}, Level: {self.level}, Company: {self.company}, Type: {self.type}, Notes: {self.notes} \n'
        for element in self.conversation:
            as_string += f'{element[0]}: '
            as_string += f'{element[1]} \n'

        return as_string

    def get_last_response(self):
        return (self.conversation[-1][1])

    def terminate(self):
        self.stop_recording()
        self.conversation.clear()
        self._stop_event.set()

    def grade_interview(self):
        return self.grader.grade_interview(self.conversation, self.type)

# def main():
#     interview = Interviewer()
#     interview.start_interview()
#     print(interview.print_conversation())
# main()