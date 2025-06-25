from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

import os
from dotenv import load_dotenv

load_dotenv()
# Database setup
database_username = os.getenv("DATABASE_USERNAME")
database_password = os.getenv("DATABASE_PASSWORD")
database_name = os.getenv("DATABASE_NAME")

connection_string = f"mysql+pymysql://{database_username}:{database_password}@localhost/{database_name}"

engine = create_engine(connection_string, echo=True)
Base = declarative_base()


class Challenge(Base):
    __tablename__ = 'challenges'
    
    id = Column(Integer, primary_key=True)
    difficulty = Column(String, nullable=False)
    created_by = Column(String, nullable=False) # Clerk user ID
    date_created = Column(DateTime, default=datetime.now)
    title = Column(String, nullable=False)
    options = Column(String, nullable=False)  # String of options like "A,B,C,D"
    correct_answer = Column(Integer, nullable=False)  # Index of the correct answer (0-based)
    explanation = Column(String, nullable=False)

class ChallengeQuota(Base):
    __tablename__ = 'challenge_quota'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(String, nullable=False, unique=True)  # Clerk user ID
    quota_left = Column(Integer, nullable=False, default=10)  # Number of challenges the user can create
    last_date_for_reset = Column(DateTime, default=datetime.now)


Base.metadata.create_all(engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
