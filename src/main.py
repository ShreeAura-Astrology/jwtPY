from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.exception import AppwriteException
import os
import jwt
import datetime
import time
import requests
import json
# This Appwrite function will be executed every time your function is triggered
def main(context):
    # You can use the Appwrite SDK to interact with other services
    # For this example, we're using the Users service
    client = (
        Client()
        .set_endpoint(os.environ["APPWRITE_FUNCTION_API_ENDPOINT"])
        .set_project(os.environ["APPWRITE_FUNCTION_PROJECT_ID"])
        .set_key(context.req.headers["x-appwrite-key"])
    )
    users = Users(client)

    try:
        response = users.list()
        # Log messages and errors to the Appwrite Console
        # These logs won't be seen by your end users
        context.log("Total users: " + str(response["total"]))
    except AppwriteException as err:
        context.error("Could not list users: " + repr(err))

    # The req object contains the request data
    if context.req.path == "/ping":
        # Use res object to respond with text(), json(), or binary()
        # Don't forget to return a response!
        return context.res.text("Pong")
    # Example usage
    private_key_path = '/usr/local/server/src/function/src/private.key'  
    iat = time.time()
    
    payload = {
    "iss": "horoscope@horoscope-447613.iam.gserviceaccount.com",
      "sub": "horoscope@horoscope-447613.iam.gserviceaccount.com",
    "scope": "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets",
      "aud": "https://oauth2.googleapis.com/token",
      "iat": iat,
      "exp": iat + 3600
    }
    
    token = create_signed_jwt(private_key_path, payload)
    print(token)
    url = "https://oauth2.googleapis.com/token"
    payload = 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + token
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)
    return context.res.json(
        {
            "motto": "Build like a team of hundreds_",
            "learn": "https://appwrite.io/docs",
            "connect": "https://appwrite.io/discord",
            "getInspired": "https://builtwith.appwrite.io",
            "assertion" : token,
            "token" : json.loads(response.text)
        }
    )

def create_signed_jwt(private_key_path, payload, algorithm='RS256'):
    # Read the private key
    with open('/usr/local/server/src/function/src/private.key', 'r') as key_file:
        private_key = key_file.read()

    # Define the headers and payload
    headers = {
    "alg": "RS256",
    "typ": "JWT",
    "kid":"2f2a285fbc29dccad3596141688196d641cc9ca7"
    }

    # Add standard claims to the payload
    payload.update({
        "iat": datetime.datetime.utcnow(),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=3600)
    })

    # Create the JWT
    token = jwt.encode(payload, private_key, algorithm=algorithm, headers=headers)
    return token


