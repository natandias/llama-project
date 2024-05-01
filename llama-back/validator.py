import json
from urllib.request import urlopen
from dotenv import dotenv_values
from authlib.integrations.flask_oauth2 import ResourceProtector
from authlib.oauth2.rfc7523 import JWTBearerTokenValidator
from authlib.jose.rfc7517.jwk import JsonWebKey


class Auth0JWTBearerTokenValidator(JWTBearerTokenValidator):
    def __init__(self, domain, audience):
        issuer = f"https://{domain}/"
        jsonurl = urlopen(f"{issuer}.well-known/jwks.json")
        public_key = JsonWebKey.import_key_set(json.loads(jsonurl.read()))
        super(Auth0JWTBearerTokenValidator, self).__init__(public_key)
        self.claims_options = {
            "exp": {"essential": True},
            "aud": {"essential": True, "value": audience},
            "iss": {"essential": True, "value": issuer},
        }


def require_auth(arg=None):
    config = dotenv_values(".env")
    require_auth_decorator = ResourceProtector()
    validator = Auth0JWTBearerTokenValidator(
        config["OAUTH_DOMAIN"], config["OAUTH_AUDIENCE"]
    )
    require_auth_decorator.register_token_validator(validator)
    return require_auth_decorator(arg)
