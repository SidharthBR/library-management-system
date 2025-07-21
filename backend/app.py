from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from werkzeug.security import check_password_hash
from models import Base, User, Notification, Book
from notifications import notify_user_via_email
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

# --------------------
# Load environment
# --------------------
load_dotenv()

# Setup
app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "fallback-secret")
jwt = JWTManager(app)

# --------------------
# Database connection
# --------------------
db_url = os.getenv("SQLALCHEMY_DATABASE_URI")
if not db_url:
    raise RuntimeError("❌ SQLALCHEMY_DATABASE_URI is not set in .env")

engine = create_engine(db_url)
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)

# --------------------
# Auth
# --------------------
from flask import request, jsonify
from flask_jwt_extended import create_access_token

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    print(f"Received: email={email}, password={password}")

    session = SessionLocal()
    user = session.query(User).filter_by(email=email).first()
    if user and user.password == password:
        token = create_access_token(identity=user.id)
        return jsonify({"token": token, "username": user.username}), 200

    print("User not found or password mismatch.")
    return jsonify({"msg": "Invalid credentials"}), 401


# --------------------
# Admin dashboard
# --------------------
@app.route("/api/admin/summary")
@jwt_required()
def admin_summary():
    session = SessionLocal()
    books_count = session.query(Book).count()
    members_count = session.query(User).filter(User.is_active == True).count()
    return jsonify({"books": books_count, "members": members_count})

@app.route("/api/admin/notifications")
@jwt_required()
def admin_notifications():
    session = SessionLocal()
    notifications = session.query(Notification).all()
    result = [{
        "message": n.message,
        "sent_at": n.sent_at.isoformat(),
        "channel": n.channel,
        "user_id": n.user_id
    } for n in notifications]
    return jsonify(result)

# --------------------
# Member profile
# --------------------
@app.route("/api/member/profile")
@jwt_required()
def member_profile():
    user_id = get_jwt_identity()
    session = SessionLocal()
    user = session.query(User).filter_by(id=user_id).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    borrowed_books = session.query(Book).filter_by(borrowed_by=user.id).all()
    borrowed_titles = [b.title for b in borrowed_books]
    return jsonify({
        "username": user.username,
        "email": user.email,
        "borrowedBooks": borrowed_titles
    })

# --------------------
# Books
# --------------------
@app.route("/api/books", methods=["GET"])
@jwt_required()
def list_books():
    session = SessionLocal()
    books = session.query(Book).all()
    result = [{
        "id": b.id,
        "title": b.title,
        "author": b.author,
        "borrowed_by": b.borrowed_by
    } for b in books]
    return jsonify(result)

@app.route("/api/books/borrow", methods=["POST"])
@jwt_required()
def borrow_book():
    session = SessionLocal()
    user_id = get_jwt_identity()
    data = request.get_json()
    book_id = data.get("book_id")

    book = session.query(Book).filter_by(id=book_id).first()
    if not book:
        return jsonify({"msg": "Book not found"}), 404
    if book.borrowed_by:
        return jsonify({"msg": "Book already borrowed"}), 400

    book.borrowed_by = user_id
    book.due_date = datetime.utcnow().date() + timedelta(days=14)  # 📆 due in 14 days
    session.commit()
    return jsonify({"msg": "Book borrowed successfully", "due_date": book.due_date.isoformat()})

@app.route("/api/books/return", methods=["POST"])
@jwt_required()
def return_book():
    session = SessionLocal()
    user_id = get_jwt_identity()
    data = request.get_json()
    book_id = data.get("book_id")

    book = session.query(Book).filter_by(id=book_id).first()
    if not book or book.borrowed_by != user_id:
        return jsonify({"msg": "You have not borrowed this book"}), 400

    book.borrowed_by = None
    book.due_date = None
    session.commit()
    return jsonify({"msg": "Book returned successfully"})

# --------------------
# Notify users of expiring books
# --------------------
@app.route("/api/admin/notify-expiring-books", methods=["POST"])
@jwt_required()
def notify_expiring_books():
    db = SessionLocal()
    today = datetime.utcnow().date()
    threshold = today + timedelta(days=2)

    books_due_soon = (
        db.query(Book)
        .filter(Book.borrowed_by.isnot(None))
        .filter(Book.due_date <= threshold)
        .all()
    )

    notified_users = set()

    for book in books_due_soon:
        user = db.query(User).filter_by(id=book.borrowed_by).first()
        if not user or user.id in notified_users:
            continue

        subject = "Library Notice: Book due soon"
        message = f"""
        Dear {user.username},

        This is a reminder that your borrowed book "{book.title}" is due on {book.due_date}.
        Please return or renew it on time to avoid penalties.

        Thank you,
        Library Team
        """

        notify_user_via_email(db, user.id, user.email, subject.strip(), message.strip())
        notified_users.add(user.id)

    return jsonify({"msg": f"Notifications sent to {len(notified_users)} users."}), 200


if __name__ == "__main__":
    app.run(debug=True)
