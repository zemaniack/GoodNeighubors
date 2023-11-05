import datetime
import uuid
import jwt

# Replace the example values below (remove the brackets).
# Store secrets securely based on your team's best practices.
# See: https://help.tableau.com/current/online/en-us/connected_apps_direct.htm

secretId = "eebcab3e-c40c-4166-83ff-611731b2fe5b"
secretValue = "Qd9/t67wOqlyRmKVyNwewcrJ531iTsyFwPMx7KnITuE="
clientId = "5a33df84-4b11-45b7-9cfc-6b63630ffdef"
username = "aneshmut@buffalo.edu"
tokenExpiryInMinutes = 10  # Max of 10 minutes.

# Remove 'embed_authoring' scope if Authoring is not needed.
scopes = ["tableau:views:embed","tableau:views:embed_authoring","tableau:ask_data:embed"]

kid = secretId
iss = clientId
sub = username
aud = "tableau"
exp = datetime.datetime.utcnow() + datetime.timedelta(minutes=tokenExpiryInMinutes)
jti = str(uuid.uuid4())
scp = scopes

userAttributes = {
    # User attributes are optional.
    # Add entries to this dictionary if desired.
    # "[User Attribute Name]": "[User Attribute Value]",
}

payload = {
    "iss": clientId,
    "exp": exp,
    "jti": jti,
    "aud": aud,
    "sub": sub,
    "scp": scp,
} | userAttributes
    

def getJwt():
    token = jwt.encode(
        payload,
        secretValue,
        algorithm="HS256",
        headers={
            "kid": kid,
            "iss": iss,
        },
    )

    return token


if __name__ == "__main__":
    token = getJwt()
    print(token)