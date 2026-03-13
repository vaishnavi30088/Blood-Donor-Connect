import requests

# API Endpoint
donors_url = "http://localhost:5000/api/donors/donors"

# Use the token from the login response
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0Mzc4NTIzNiwiZXhwIjoxNzQzNzg4ODM2fQ.1XnW1_9Dqr6VKGyHlQmBST-DHqMAPK5o0rLQOEZRJwE"

# Headers including the token
headers = {
    "Authorization": f"Bearer {token}"  # Token must be sent in Authorization header
}

# Make the request
response = requests.get(donors_url, headers=headers)

# Print the response
print("Status Code:", response.status_code)
print("Response:", response.json())
