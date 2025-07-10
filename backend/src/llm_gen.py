import os
import json
from groq import Groq
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_challenge_llm(difficulty)->Dict[str, Any]:
    
    system_prompt = """You are an expert coding challenge MCQ generator. Your task is to create a multiple-choice question (MCQ) coding challenge based on the specified difficulty level.
    
    For easy questions: Focus on basic syntax, simple algorithms, and fundamental programming concepts.
    
    For medium questions: Cover more intermediate topics like more complex algorithms, data structures, problem-solving skills and language features.
    
    For hard questions: Include advanced topics such as optimization problems, complex algorithms, and in-depth understanding of programming paradigms. Also cover topics like concurrency, memory management, design patterns, system design, cloud computing, distributed systems, and more.

    Return the challenge in the following JSON format:
    {
        "title": "The full question including any code snippets or examples",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correct_answer_id": 0, # Index of the correct answer in the options array (0-3)
        "explanation": "Detailed explanation of the correct answer and why the other options are incorrect."
    }

    Make sure the options are plausible and relevant to the question. The correct answer should be one of the options provided.
    """
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"},
            temperature=0.7,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Generate a {difficulty} level coding challenge MCQ"}
            ]
        )
        
        question_data = json.loads(response.choices[0].message.content)
        required_fields = ["title", "options", "correct_answer_id", "explanation"]
        print(question_data)
        if not all(field in question_data for field in required_fields):
            raise ValueError("Generated question is missing required field.")
        
        return question_data
    
    except Exception as e:
        print(f"Error generating challenge: {e}")
        return {
            "title": "Error",
            "options": ["An error occurred while generating the challenge."],
            "correct_answer_id": 0,
            "explanation": str(e)
        }