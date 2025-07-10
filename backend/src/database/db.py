from sqlalchemy.orm import Session
from . import models
from datetime import datetime
from datetime import timedelta

def get_challenge_quota(db: Session, user_id: str):
    return db.query(models.ChallengeQuota).filter(models.ChallengeQuota.user_id == user_id).first()

def create_challenge_quota(db: Session, user_id: str):
    new_quota = models.ChallengeQuota(user_id=user_id)
    db.add(new_quota)
    db.commit()
    db.refresh(new_quota)
    return new_quota

def reset_quota(db: Session, quota: models.ChallengeQuota):
    now = datetime.now()
    if now - quota.last_date_for_reset > timedelta(days=1):
        quota.quota_left = 10
        quota.last_date_for_reset = now
        db.commit()
        db.refresh(quota)
    return quota

def create_challenge(db: Session, difficulty: str, created_by: str, title: str, options: str, correct_answer_id: int, explanation: str):
    new_challenge = models.Challenge(
        difficulty=difficulty,
        created_by=created_by,
        title=title,
        options=options,
        correct_answer_id=correct_answer_id,
        explanation=explanation
    )
    db.add(new_challenge)
    db.commit()
    db.refresh(new_challenge)
    return new_challenge

def get_user_challenges(db, user_id):
    return db.query(models.Challenge).filter(models.Challenge.created_by == user_id).all()