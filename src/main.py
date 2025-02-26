from appwrite.client import Client
from appwrite.services.users import Users
from appwrite.exception import AppwriteException
import os
import jwt
import datetime
import time

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
    #private_key_path = 'path/to/your/private_key.pem'
    private_key = """-----BEGIN RSA PRIVATE KEY-----
    MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDEWqEAR5ANnR8B
    HV7J+IhuaNvl91E66UXivg3jXbi57fp3+Uv+IllWnc9sonN0A7hqRWk5fUEraYEb
    m8NmxFl39aic42EPF5qRcsji5c273Xn6OHs3Za3LiNLAaXgp/y9sZDhYVZpxa4aI
    DV+hObVa39UVovhQDjLj5jXo0H2we3Rmp6R10cB7mdrSNGoSoqeRFRNhuXX3QNuA
    quslt9NGzYwVFIgwzvXbzbx48QrElPRqiJw8QjEOLboKTcN56iYdB+xCSB7ZAVms
    w0JZ8RG0N60ooma5dHZoW+2vGIyp8JKzwr6Oq56iumFg4wjfjWCufhA4FrMWwCNX
    CiUQbIQJAgMBAAECggEAMQ6akIUQoNIbY64ol0n0ni8tF4LHpPIQr5J/yklJZIyo
    Sg67NYJz8x/I6dGZikf+rHBslnwsitHYe6MaOgP+/WlfJ9loT7q8N7AnsAattMzk
    E4fGgyPwfLxRuVhweP+kY86TRECY7lLowPekZ5XRMWPga0A1DV1KyiUjXWgvquZw
    55CPfvIecOASEulv8fPbtzrcN/Ps/BhJ+CYpjzADdOaZS0sNjw+mhDWFmCtwdDIZ
    hGiAlEFbzIHvt/xp0stNxhvUENbtVz355NizYqimbHNSyCliCbzoHc5WKC0Ffi+5
    FqwOroetgk6qNUjkS2EAc9lDm/VCNuGhCv/jYm+dLQKBgQDx2EiMU9fsIo8Th9sM
    xazlZ2dyFrqsuC+AiqKovm/Z0nvbDXSjOtUsq1RWV4Zb4d4eCCK1dN97vOkXe97q
    KG9jh1t7ZKChotByvPqWpwCdB6NiuZvFg2JG2OW2KMR05zPGNbDW6DtdKPwUiaZY
    ckTmKEnf2OaWMLECMZd+FFY3VQKBgQDP2LokeO1LyzIDxxtM7sd2EyO3aUkPZDg1
    7VlXjkTtY7rQFgfQMjGX0SD5wUsnV3dSXDjVnJsbIhwkKoBQ4Mw0Wz6slowhG8Nm
    2vr101+CIVUAXjlHhjk+ZfzDOKbwWphBijxFBQr4GQ0eZwBQcNPchX81jiEo0GhJ
    um7J1F7x5QKBgEHvwffgdCJBWdjtVV+qFXWGN8H3SHYG0YyuP6LaKQyuQm56wK4w
    QCapn5jazBsI/dIaTbxDXRsTakmo0CHvXE86fEqsKM9o4IQn2fpxFc26Y2VrTXkQ
    VR8Ty61aeBWXY5pK0SgGsQi5P+EpllzO6tIFcf7B2DxikiAS/Ua2rLrxAoGAIqKh
    +jvwhyXYMsr2IK7VrDZqSEESPK9dspbXwYBiuhBZbB2PtcD3hK4DybrNNEQeDSpz
    Ch2rtyzK9bfjZBbh0IO4APihZ08CE9y/30EW9E9ro8EP2Hxkg6JpKXsCTqE6KAnK
    G1JIzqkWB4/wfHcgxum0Fg+WNP/tsQORPK7YF4UCgYBCaE/veKKtqOpKWdjnPEE8
    IvMXjypkB7uvClovbqRhvxpAGF27/eR17TDV7wDjHIAEyFhCNCfwNm7w7UZokKBd
    bCUwaV0LVrmoJ4eYZz2cp7aCT723r67DavW8LaFdtNjKm+T0t5+JHHDrVjIcwReu
    TKQj5gyJbxYL8WMDgssrcQ==
    -----END RSA PRIVATE KEY-----
    """
    
    iat = time.time()
    
    payload = {
    "iss": "horoscope@horoscope-447613.iam.gserviceaccount.com",
      "sub": "horoscope@horoscope-447613.iam.gserviceaccount.com",
    "scope": "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets",
      "aud": "https://oauth2.googleapis.com/token",
      "iat": iat,
      "exp": iat + 3600
    }
    
    token = create_signed_jwt(private_key, payload)
    print(token)    
    return context.res.json(
        {
            "motto": "Build like a team of hundreds_",
            "learn": "https://appwrite.io/docs",
            "connect": "https://appwrite.io/discord",
            "getInspired": "https://builtwith.appwrite.io",
            "token" : token
        }
    )

def create_signed_jwt(private_key, payload, algorithm='RS256'):
    # Read the private key
    # with open(private_key_path, 'r') as key_file:
    #     private_key = key_file.read()

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


