from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import engine, SessionLocal
import models

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables on startup
models.Base.metadata.create_all(bind=engine)

# DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic model
class FlashCardCreate(BaseModel):
    question: str
    answer: str
    category: str

# GET all flashcards (with optional category filter)
@app.get("/flashcards")
def get_flashcards(category: str = None, db: Session = Depends(get_db)):
    if category:
        return db.query(models.FlashCard).filter(models.FlashCard.category == category).all()
    return db.query(models.FlashCard).all()

@app.post("/flashcards")
def add_flashcard(card: FlashCardCreate, db: Session = Depends(get_db)):
    new_card = models.FlashCard(**card.dict())
    db.add(new_card)
    db.commit()
    db.refresh(new_card)
    return new_card
