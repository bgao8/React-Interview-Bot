import speech_recognition as sr
# import pyaudio

class Applicant:
    def __init__(self):
        self.r = sr.Recognizer()
        self.talking = False
        self.r.dynamic_energy_threshold = True
        self.r.pause_threshold = 10
    
    def get_mic_index(self):
        return self.mic_index
    
    def is_recording(self):
        return self.talking

    def start_talking(self):
        self.talking = True

    def stop_talking(self):
        self.talking = False

    def record_once(self, mic_index):
        audio_chunks = []
        with sr.Microphone(device_index=mic_index) as mic:
            print("Listening...")

            self.r.adjust_for_ambient_noise(mic, duration=0.5)
            while self.talking:
                try:
                    audio = self.r.listen(
                        mic,
                        timeout=1.5,
                        phrase_time_limit=4           # 4 second chunks
                    )
                    text = self.r.recognize_vosk(audio)
                    if text:
                        audio_chunks.append(text)

                except sr.WaitTimeoutError:
                    continue

        return ''.join(audio_chunks)