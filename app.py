from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sqlite3
from auth import encode_auth_token, decode_auth_token  # Import JWT functions

app = Flask(__name__, static_folder='my-app/build/static', template_folder='my-app/build')
app.secret_key = 'supersecretkey'
CORS(app)

# Function to connect to SQLite database
def connect_db():
    conn = sqlite3.connect('database.db')
    conn.execute('PRAGMA foreign_keys = ON')  # Enable foreign key support
    return conn

# Register route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Received data:", data)  # Log incoming data

    required_fields = ['username', 'password', 'email', 'firstName', 'lastName', 'birthday', 'maritalStatus', 'address', 'contactInfo']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"message": f"'{field}' is required"}), 400

    username = data['username']
    password = data['password']
    email = data['email']
    first_name = data['firstName']
    last_name = data['lastName']
    birthday = data['birthday']
    marital_status = data['maritalStatus']
    address = data['address']
    contact_info = data['contactInfo']

    conn = connect_db()
    cursor = conn.cursor()

    try:
        # Check if the username or email already exists
        cursor.execute("SELECT * FROM users WHERE username = ? OR email = ?", (username, email))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({"message": "Username or email already exists!"}), 400

        # Insert new user
        cursor.execute(
            "INSERT INTO users (username, password, email, first_name, last_name, birthday, marital_status, address, contact_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            (username, password, email, first_name, last_name, birthday, marital_status, address, contact_info)
        )

        # Get the last inserted rowid and update user_id starting from 100
        last_rowid = cursor.lastrowid
        cursor.execute("UPDATE users SET user_id = ? WHERE id = ?", (last_rowid + 100, last_rowid))

        conn.commit()
        return jsonify({"message": "User registered successfully!"}), 201
    except sqlite3.IntegrityError as e:
        print("Integrity Error during registration:", e)  # Log the error
        return jsonify({"message": "Registration failed due to a database integrity error."}), 500
    except Exception as e:
        print("Error during registration:", e)  # Log the error
        return jsonify({"message": f"Registration failed: {str(e)}"}), 500
    finally:
        conn.close()

@app.route('/api/userdata', methods=['GET'])
def get_user_data():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"message": "Authorization header is missing"}), 401

    auth_token = auth_header.split(" ")[1]
    username = decode_auth_token(auth_token)

    if not username:
        return jsonify({"message": "Invalid token"}), 401

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT first_name, last_name, location, bio FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()

    if not user:
        return jsonify({"message": "User not found"}), 404

    user_data = {
        "first_name": user[0],
        "last_name": user[1],
        "location": user[2],
        "bio": user[3]
    }

    return jsonify(user_data), 200


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = connect_db()
    cursor = conn.cursor()

    # Check if the user exists
    cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
    user = cursor.fetchone()

    if user:
        session['username'] = username
        token = encode_auth_token(username)

        user_info = {
            "user_id": user[0],  # Assuming user ID is the first column
            "username": user[1],  # Adjust indexes based on your schema
            "email": user[2],
            "first_name": user[3],
            "last_name": user[4],
            "birthday": user[5],
            "marital_status": user[6],
            "address": user[7],
            "contact_info": user[8]
        }
        return jsonify({"message": "Login successful!", "user": user_info, "token": token}), 200
    else:
        return jsonify({"message": "Invalid username or password!"}), 401

if __name__ == '__main__':
    app.run(debug=True)
