---
title: "jwt"
slug: "jwt"
excerpt: ""
hidden: false
createdAt: "Wed Feb 01 2023 13:31:34 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Jun 21 2024 13:18:30 GMT+0000 (Coordinated Universal Time)"
---
This module is available to use in your EdgeWorkers code bundles to verify JWT tokens using digital signatures. This module considers JWT tokens as defined in the [RFC-7519](https://datatracker.ietf.org/doc/html/rfc7519) standards document. It exports implementations of the JWTValidator class that contains functions to validate JWT tokens. 

You can import the [jwt module](https://github.com/akamai/edgeworkers-examples/tree/master/delivery/common/jwt) from the EdgeWorkers GitHub repo.

# JWTValidator

Constructor for new `JWTValidator` Object. It performs type checks on the `jwtOptions` Object fields.

```javascript
JWTValidator(jwtOptions: JWTOptions)
```

# JWTOptions Object

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "h-3": "Exceptions",
    "0-0": "issuer",
    "0-1": "String",
    "0-2": "**(Optional)** The issuer to check with an `iss` claim in the JWT payload.",
    "0-3": "Error(`Invalid jwtOptions: issuer must be non empty string`)",
    "1-0": "subject",
    "1-1": "String",
    "1-2": "**(Optional)** The subject to check with a `sub` claim in the JWT payload.",
    "1-3": "Error(`Invalid jwtOptions: subject must be non empty string`)",
    "2-0": "audience",
    "2-1": "String",
    "2-2": "**(Optional) **The audience to check with an `aud` claim in the JWT payload.",
    "2-3": "Error(`Invalid jwtOptions: audience must be non empty string`)",
    "3-0": "ignoreExpiration",
    "3-1": "Boolean",
    "3-2": "**(Optional) **If false, validate the expiry of the token.  \n  \nDefault is true.",
    "3-3": "Error(`Invalid jwtOptions: ignoreExpiration must be boolean`)",
    "4-0": "ignoreNotBefore",
    "4-1": "Boolean",
    "4-2": "**(Optional)** If false, validate the `not before` claim of the token.  \n  \nDefault is true.",
    "4-3": "Error(`Invalid jwtOptions: ignoreNotBefore must be boolean`)",
    "5-0": "allowUnsecuredToken",
    "5-1": "Boolean",
    "5-2": "**(Optional)** If true, allow unsecured JWT tokens.  \nFor example, alg = NONE  \n  \nDefault is false",
    "5-3": "If false, throws unsupported unsecured JWT tokens error whenever unsecured JWT tokens are passed.",
    "6-0": "clockTolerance",
    "6-1": "Number",
    "6-2": "**(Optional)** Number of seconds to tolerate when checking the `nbf` and `exp` claims.  \n  \nDefault is 60 seconds.",
    "6-3": "Error('`Invalid jwtOptions: clockTimestamp must be number`)"
  },
  "cols": 4,
  "rows": 7,
  "align": [
    "left",
    "left",
    "left",
    "left"
  ]
}
[/block]


# JWTJson

Holds JWTHeader and JWTPayload in JSON format.

## JWTHeader

| Parameter | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alg       | String | Has the same meaning, syntax, and processing rules as the `alg` Header parameter defined in [Section 4.1.1](https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.1) of the RFC 7515 JSON Web Signature (JWS) Tracking document. This Header parameter also identifies the cryptographic algorithm used to encrypt or determine the value of the Content Encryption Key (CEK). Refer to the [JSON Web Encryption (JWE) document](https://www.rfc-editor.org/rfc/rfc7516) for more details. |
| typ       | String | Is defined by JWS and JWE. It's used by JWT applications to declare the media type IANA. Refer to the [Registered Claim Names](https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1) for more details.                                                                                                                                                                                                                                                                                    |

## JWTPayload

|     | Type   | Description                                                                                                                                  |
| :-- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| iss | String | The **issuer claim** identifies the principal that issued the JWT.                                                                           |
| sub | String | The **subject claim** identifies the principal that is the subject of the JWT.                                                               |
| aud | String | The **audience claim** identifies the intended recipients for the JWT.                                                                       |
| exp | Number | The **expiration time claim** identifies the expiration of the JWT.  The JWT is not available for processing on or after the specified time. |
| nbf | Number | The **not before claim** identifies the time before which the JWT is not accepted for processing.                                            |
| iat | Number | The **issued at claim** identifies the issue time of the JWT.                                                                                |
| jti | String | The **JWT ID claim** provides a unique identifier for the JWT. You can use the `jti` claim  to prevent the JWT from being replayed.          |

# async validate()

Decodes the base64 url encoded token, applies JWT default rules, and performs signature verification using keys. Returns a `Promise<JWTJson>` .

```javascript
async validate( base64JWTToken: string, keys: CryptoKey[])
```

The following default rules apply to signature verification.

- A token should have a header and a payload. JWT tokens secured in a valid base64 format should also have a signature.
- If you enable issuer verification, the issuer string needs to match the `iss` claim.
- If you enable subject verification, the subject string needs to match the `sub` field.
- If you enable audience verification, the audience string needs to match the `aud` field.
- Set `ignoreExpiration` to false, to validate the JWT `exp` field.
- Set `ignoreNotBefore` to false, to validate the JWT `nbf` field.

| Parameter      | Type   | Description                                                                                                   |
| :------------- | :----- | :------------------------------------------------------------------------------------------------------------ |
| base64JWTToken | String | The JWT token, encoded in a valid base64url format.                                                           |
| keys           | Array  | An array of CryptoKeys used for verification. A token is valid if the signature is verifiable by any one key. |

## Exceptions

Throws an error with appropriate message if type checks fails for arguments.

> 👍 You can configure the validation options using the `jwtOptions` parameter. You will only receive validation errors for options that you have enabled.

[block:parameters]
{
  "data": {
    "h-0": "Error",
    "h-1": "Description",
    "0-0": "Error(`Invalid token type, expected string!`)",
    "0-1": "Argument type check fails.",
    "1-0": "Error(`Invalid hex string`)",
    "1-1": "Key passed is not valid hex format.",
    "2-0": "Error(`InvalidLengthError: JWT signature is not correctly encoded`)",
    "2-1": "The JWT signature is not valid base64url encoded.",
    "3-0": "Error(`JWT malformed: invalid iss, expected ${jwtOptions.issuer}`)",
    "3-1": "Issuer validation does not match the `iss` field from the JWT payload.",
    "4-0": "Error(`JWT malformed: invalid sub, expected ${jwtOptions.subject}`)",
    "4-1": "Subject validation does not match the `sub` field from the JWT payload.",
    "5-0": "Error(`JWT malformed: invalid aud, expected ${jwtOptions.audience}`)",
    "5-1": "Audience validation is not present in the `aud` field from the JWT payload.",
    "6-0": "Error(`JWT malformed: exp must be number`)",
    "6-1": "Expiry validation type checks fail for the `exp` field from the JWT payload.",
    "7-0": "Error(`JWT expired`)",
    "7-1": "You have enabled expiry validation and the token is expired.",
    "8-0": "Error(`JWT malformed: nbf must be number`)",
    "8-1": "Not before validation type checks fail for the `nbf` field from the JWT payload.",
    "9-0": "Error(`JWT not active`)",
    "9-1": "You have enabled not before validation and the token is not active.",
    "10-0": "DOMException or TypeError",
    "10-1": "This error occurs if:  \n  \n- You try to use invalid key data.  \n- The key is not an accepted key for the algorithm.  \n- You try to use an algorithm that is either unknown or isn't suitable for a verify operation."
  },
  "cols": 2,
  "rows": 11,
  "align": [
    "left",
    "left"
  ]
}
[/block]


## JWT verification example using the HS256 algorithm

```javascript
import { logger } from 'log';
import { JWTValidator } from './jwt.js';
import { crypto } from 'crypto';
import { base16 } from 'encoding';
 
//advanced options for jwt validator
const jwtOption = {
  //check token expiry
  ignoreExpiration: false,
  //check token nbf
  ignoreNotBefore: false
};
 
const jwtValidator = new JWTValidator(jwtOption);
 
export async function onClientRequest (request) {
  try {
    // Customer can load the secret key from PM user defined variable. Refer https://techdocs.akamai.com/edgeworkers/docs/request-object#getvariable
    // const secretKey = request.getVariable('PMUSER_SECRET_KEY')
    const secretKey = '785630473867584c7a61596d6770434c324a45304d664d6c714f43566a6c6259';
    const sKey = await crypto.subtle.importKey(
      'raw',
      base16.decode(secretKey, 'Uint8Array').buffer,
      {
        name: 'HMAC',
        hash: 'SHA-256'
      },
      false,
      ['verify']
    );
    let jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NjExNjc0NjcsImV4cCI6MTY5MjcwMzQ2NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.JQ0lApRDEYAPr-U_b1TxCLzaZ6V0ZTFre9DABOeOKHg';
    const jwtJSON = await jwtValidator.validate(jwt,[sKey]);
    logger.log('jwtJSON %s: ',JSON.stringify(jwtJSON));
    const result = {
        jwt: jwtJSON,
        verifed: true
    };
    request.respondWith(200, {}, JSON.stringify(result));
     
  } catch (error) {
    logger.log(error);
    request.respondWith(400, {}, error);
  }
}
```

## JWT verification example using the RS256 algorithm

```javascript
import { logger } from 'log';
import { JWTValidator } from './jwt.js';
import { crypto, pem2ab } from 'crypto';
 
//advanced options for jwt validator
const jwtOption = {
  //check token expiry
  ignoreExpiration: false,
  //check token nbf
  ignoreNotBefore: false
};
 
const jwtValidator = new JWTValidator(jwtOption);
 
export async function onClientRequest (request) {
  try {
    // Customer can load the public key from PM user defined variable. Refer https://techdocs.akamai.com/edgeworkers/docs/request-object#getvariable
    // const secretKey = request.getVariable('PMUSER_PUBLIC_KEY')
    const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo
4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u
+qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh
kd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ
0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg
cKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc
mwIDAQAB
-----END PUBLIC KEY-----`;
 
    let jwtToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDQ1NjY5NzMsIndtdmVyIjoyLCJ3bXZuZCI6ImlyZGV0byIsIndtaWR0eXAiOjEsIndtaWRmbXQiOiJiYXNlNjQiLCJ3bXBhdGxlbiI6MjA0OCwid21pZGxlbiI6MjA0OCwid21pZCI6Ik1qTTNNakF3TnciLCJ3bWtleXZlciI6MSwid21vcGlkIjo0MH0.NABNvn2E7J1bKDG_YkQLHnmK_HIsTnoe8I9IcZiNlAfgHhOA23wHdPZcqRwUxRd5ZwZ5piX1JlPqtbipOgkxwVB6NdEXsY1NY603zkHamLzQSSXf-9B5tBZ5KSW5jKv4PWaVAanKH99BnCsfTf6W5zoff8YHfeA2IJ03-m07pfdPmewzp7VFFnBgPbdvaN9sLcG_5-ZmlyiwmX0Z8lz-z9_GwanmB_ihZN8WE9Vb4heeymsOJnHU4ea8XLxNGXkmpW44XxqYPBP_GJ0zvAl0HAMyGgJEjcfaQ1YLhHe0tuLVQhYUBqRXwsTJmz4uaV5kb-12at214gL22FZsP0kSaQ';
     
    const iKey = await crypto.subtle.importKey(
      'spki',
      pem2ab(publicKey),
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256'
      },
      false,
      ['verify']
    );
    const jwtJSON = await jwtValidator.validate(jwtToken,[iKey]);
    const result = {
        jwt: jwtJSON,
        verified: true
    };
    request.respondWith(200, {}, JSON.stringify(result));
  } catch (error) {
    logger.log('Error: %s', error.message);
    request.respondWith(400, {}, error.message);
  }
}
```
