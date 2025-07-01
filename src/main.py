from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.exception import AppwriteException
from appwrite.services.functions import Functions
import os
import jwt
import datetime
import time
import requests
import json
from PIL import Image
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
    # Initialize the Functions service
    functions = Functions(client)

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
    
    # The req object contains html the request data
    if context.req.path == "/horoscope":
        # Use res object to respond with text(), json(), or binary()
        # Don't forget to return a response!
        # Read the private key
        with open('/usr/local/server/src/function/src/horoscope.html', 'r') as html_file:
            html = html_file.read()
        return context.res.text(html, 200, {
            "content-type": "text/html"
        })
    
     # The req object contains html the request data
    if context.req.path == "/bnn":
        # Use res object to respond with text(), json(), or binary()
        # Don't forget to return a response!
        # Read the private key
        with open('/usr/local/server/src/function/src/BNN.html', 'r') as html_file:
            html = html_file.read()
        return context.res.text(html, 200, {
            "content-type": "text/html"
        })
    
     # The req object contains html the request data
    if context.req.path == "/BNN_Comb.js":
        # Use res object to respond with text(), json(), or binary()
        # Don't forget to return a response!
        # Read the private key
        with open('/usr/local/server/src/function/src/BNN_Comb.js', 'r') as js_file:
            js = js_file.read()
        return context.res.text(js, 200, {
            "content-type": "text/javascript"
        })
     # The req object contains html the request data
    if context.req.path == "/transit.js":
        # Use res object to respond with text(), json(), or binary()
        # Don't forget to return a response!
        # Read the private key
        with open('/usr/local/server/src/function/src/transit.js', 'r') as js_file:
            js = js_file.read()
        return context.res.text(js, 200, {
            "content-type": "text/javascript"
        })
    # The req object contains significator.js the request data
    if context.req.path == "/significator.js":
        # Use res object to respond with text(), json(), or binary()
        # Don't forget to return a response!
        # Read the private key
        with open('/usr/local/server/src/function/src/significator.js', 'r') as js_file:
            js = js_file.read()
        return context.res.text(js, 200, {
            "content-type": "text/javascript"
        })
    # The req object contains the request data
    if context.req.path == "/kundali.png":
        # Serve the New-Kundali.png image
        with Image.open('/usr/local/server/src/function/src/New-Kundali.png') as img:
        #with open('/usr/local/server/src/function/src/New-Kundali.png', 'rb') as img_file:
            imag = img
        return context.res.binary(imag, 200, {
            "content-type": "image/png"
        })
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
    responsejson = json.loads(response.text)
    resp = {
            "assertion" : token,
            "token" : responsejson["access_token"]
        }
    # return set_response_header(resp,functions)
    return context.res.json(
        {
            "assertion" : token,
            "token" : responsejson["access_token"]
        }, 200, {
            "Access-Control-Allow-Origin": "*"
        }
    )

# Define the function to set the context response header
def set_response_header(r,functions):
    response = functions.create_execution(
        function_id='67bf6bce002ee43082da',
        data=  json.dumps(r)
    )
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

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


