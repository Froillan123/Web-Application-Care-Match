import jwt  # Import the JWT library
import datetime

SECRET_KEY = 'your_secret_key'  # Use the same secret key used for encoding

def decode_auth_token(auth_token):
    try:
        # Decode the JWT token
        payload = jwt.decode(auth_token, SECRET_KEY, algorithms=['HS256'])
        return payload['username']  # Extract the username or user ID
    except jwt.ExpiredSignatureError:
        return None  # Token has expired
    except jwt.InvalidTokenError:
        return None  # Invalid token

def encode_auth_token(username):
    # Create a JWT token
    token = jwt.encode({
        'username': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # Token expires in 1 day
    }, SECRET_KEY, algorithm='HS256')
    return token
