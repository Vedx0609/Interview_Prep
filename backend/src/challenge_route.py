from fastapi import APIRouter, Request, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
import json
from datetime import datetime

from .database.db import *
from .database.models import get_db
from .utils import get_clerk_user_credentials
from .llm_gen import generate_challenge_llm

router = APIRouter()

class ChallengeCreateRequest(BaseModel):
    difficulty: str
    class Config:
        json_schema_extra = {
            "example": {
                "difficulty": "easy"
            }
        }

@router.post("/generate-challenge")
async def generate_challenge(request: ChallengeCreateRequest, request_obj: Request, db: Session = Depends(get_db)):
    try:
        user_details = get_clerk_user_credentials(request_obj)
        # print(user_details)
        user_id = user_details.get("user_id")
        # print(user_id)
        quota = get_challenge_quota(db, user_id)
        
        if not quota:
            quota = create_challenge_quota(db, user_id)
        
        quota = reset_quota(db, quota)
        
        if quota.quota_left <= 0:
            raise HTTPException(
                status_code=403,
                detail="Quota exceeded. Please try again later."
            )

        challenge_data = generate_challenge_llm(request.difficulty)
        # print(challenge_data)
        
        new_challenge = create_challenge(
            db=db,
            difficulty=request.difficulty,
            created_by=user_id,
            title=challenge_data["title"],
            options=json.dumps(challenge_data["options"]),
            correct_answer_id=challenge_data["correct_answer_id"],
            explanation=challenge_data["explanation"]
        )

        quota.quota_left -= 1
        db.commit()

        return {
            "id": new_challenge.id,
            "difficulty": new_challenge.difficulty,
            "title": new_challenge.title,
            "options": json.loads(new_challenge.options),
            "correct_answer_id": new_challenge.correct_answer_id,
            "explanation": new_challenge.explanation,
            "timestamp": new_challenge.date_created.isoformat()
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Internal Server Error: " + str(e),
        )

@router.get("/quota")
async def get_quota(request: Request, db: Session = Depends(get_db)):
    user_details = get_clerk_user_credentials(request)
    user_id = user_details.get("user_id")
    quota = get_challenge_quota(db,user_id)
    if not quota:
        return {
            "user_id": user_id,
            "quota_left": 0,
            "last_date_for_reset": datetime.now()
        }
    quota = reset_quota(db, quota)
    return quota

@router.get("/history")
async def get_challenge_history(request: Request, db: Session = Depends(get_db)):
    user_details = get_clerk_user_credentials(request)
    user_id = user_details.get("user_id")
    
    challenges = get_user_challenges(db, user_id)
    
    return {"challenges": challenges}
    