import openai

class Grader:
    def __init__(self):
        self.b_parameters = ['Professionalism', 'Interpersonal skills', 'Attitude', 'Experience']
        self.t_parameters = ['Problem-solving ability', 'Accuracy', 'Reasoning']

    def build_message(self, conversation):
        message=[
            {'role':'system', 'content':
                f"You are given an interview transcript. Grade the applicant"
                "according to these parameters: {', '.join(self.b_parameters)}"
                "Each parameter can be graded out of 5. Output ex:"
                "Professionalism: 5, Interpersonal skills: 4, etc."
                "Then the sum is the total score"
                "Include the type of interview in the intro"
            },
            {'role':'user', 
                'content':f"Grade this transcript: {conversation}"
            }
        ]

        return message

    def grade_interview(self, transcript, type):
        message=self.build_message(transcript, type)
        try:
            print('Loading...')
            response = openai.chat.completions.create(
                model='gpt-4o-mini',
                messages=message
            )
            grade = response.choices[0].message.content.strip()

            return grade

        except Exception as e:
            raise e