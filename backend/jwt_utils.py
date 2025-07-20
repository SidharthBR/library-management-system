from datetime import datetime, timedelta
import jwt
import os

# Load the secret key from environment variables
SECRET_KEY = os.getenv('SECRET_KEY', 'your_default_secret_key')

def encode_token(payload):
    """Encode a payload to create a JWT token."""
    payload['exp'] = datetime.utcnow() + timedelta(days=1)  # Token expires in 1 day
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def decode_token(token):
    """Decode a JWT token and return the payload."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return {'error': 'Token has expired'}
    except jwt.InvalidTokenError:
        return {'error': 'Invalid token'}

def verify_token(token):
    """Verify the validity of a JWT token."""
    return decode_token(token)  # Reuse decode_token for verification