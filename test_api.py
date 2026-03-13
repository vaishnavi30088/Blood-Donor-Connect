import requests

# API Endpoint
donor_url = "http://localhost:5000/api/donors/register_donor"

# Use the token from the login response
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0Mzc4NTIzNiwiZXhwIjoxNzQzNzg4ODM2fQ.1XnW1_9Dqr6VKGyHlQmBST-DHqMAPK5o0rLQOEZRJwE"

# Data to register a donor
donor_data = {
    "name": "John Doe",
    "blood_type": "O+",
    "location": "New York",
    "phone": "1234567890"
}

# Headers including the token
headers = {
    "Authorization": f"Bearer {token}"  # Token must be sent in Authorization header
}

# Make the request
response = requests.post(donor_url, json=donor_data, headers=headers)

# Print the response
print("Status Code:", response.status_code)
print("Response:", response.json())
