from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import FlashCard, Base

# ✅ Create tables if they don't exist
Base.metadata.create_all(bind=engine)

def seed():
    db: Session = SessionLocal()
    
    sample_cards = [
        FlashCard(question="What is a Stack?", answer="A linear data structure that follows LIFO order.", category="DSA"),
        FlashCard(question="Define Queue.", answer="A linear structure which follows FIFO order.", category="DSA"),
        FlashCard(question="GRE: What does 'Abate' mean?", answer="To reduce in amount, degree, or severity.", category="GRE"),
        FlashCard(question="Bubble Sort: What is the basic idea?", answer="Repeatedly swap adjacent elements if they are in the wrong order.",
        category="DSA"),
        FlashCard(question="Bubble Sort: Steps / Pseudocode", answer="For i = 0 to n-1:\n  For j = 0 to n-i-1:\n    If arr[j] > arr[j+1]: swap",
        category="DSA"),
        FlashCard(
            question="Selection Sort: What is the basic idea?",
            answer="Find the minimum element and place it at the beginning.",
            category="DSA"
        ),
        FlashCard(
            question="Selection Sort: Steps / Pseudocode",
            answer="For i = 0 to n-1:\n  minIndex = i\n  For j = i+1 to n:\n    If arr[j] < arr[minIndex]: minIndex = j\n  Swap arr[i] and arr[minIndex]",
            category="DSA"
        ),

        FlashCard(
            question="Selection Sort: What is the basic idea?",
            answer="Find the minimum element and place it at the beginning.",
            category="DSA"
        ),
        FlashCard(
            question="Selection Sort: Steps / Pseudocode",
            answer="For i = 0 to n-1:\n  minIndex = i\n  For j = i+1 to n:\n    If arr[j] < arr[minIndex]: minIndex = j\n  Swap arr[i] and arr[minIndex]",
            category="DSA"
        ),
        FlashCard(
            question="Insertion Sort: What is the basic idea?",
            answer="Build the sorted array one item at a time by comparing backward.",
            category="DSA"
        ),
        FlashCard(
            question="Insertion Sort: Steps / Pseudocode",
            answer="For i = 1 to n-1:\n  key = arr[i]\n  j = i - 1\n  While j >= 0 and arr[j] > key:\n    arr[j+1] = arr[j]\n    j--\n  arr[j+1] = key",
            category="DSA"
        ),
        FlashCard(
            question="Merge Sort: What is the basic idea?",
            answer="Divide the array into halves, sort recursively, and merge them.",
            category="DSA"
        ),
        FlashCard(
            question="Merge Sort: Steps / Pseudocode",
            answer="If left < right:\n  mid = (left + right) / 2\n  mergeSort(left, mid)\n  mergeSort(mid+1, right)\n  merge(left, mid, right)",
            category="DSA"
        ),
        FlashCard(
            question="Quick Sort: What is the basic idea?",
            answer="Pick a pivot and partition the array such that left < pivot < right, then sort recursively.",
            category="DSA"
        ),
        FlashCard(
            question="Quick Sort: Steps / Pseudocode",
            answer="If low < high:\n  pi = partition(arr, low, high)\n  quickSort(arr, low, pi - 1)\n  quickSort(arr, pi + 1, high)",
            category="DSA"
        ),
        FlashCard(
            question="Heap Sort: What is the basic idea?",
            answer="Convert array to max heap, then repeatedly extract max and rebuild heap.",
            category="DSA"
        ),
        FlashCard(
            question="Heap Sort: Steps / Pseudocode",
            answer="Build max heap\nFor i = n-1 to 1:\n  Swap arr[0] and arr[i]\n  Heapify arr[0..i-1]",
            category="DSA"
        )


    ]

    db.add_all(sample_cards)
    db.commit()
    db.close()

if __name__ == "__main__":
    seed()
