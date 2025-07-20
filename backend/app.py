from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
import os

app = Flask(__name__)

# Load environment variables from .env file
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Import routes (assuming routes are defined in a separate module)
from notifications import send_notification  # Example import
from models import User  # Example import

@app.route('/')
def home():
    return "Welcome to the backend application!"

if __name__ == '__main__':
    app.run(debug=True)