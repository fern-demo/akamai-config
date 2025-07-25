---
title: "common access token"
slug: "cat"
excerpt: ""
hidden: false
createdAt: "Tue May 21 2024 12:21:16 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 11 2024 13:35:30 GMT+0000 (Coordinated Universal Time)"
---
This module is available to use in your EdgeWorkers code bundles to enforce access policies efficiently, flexibly, and inter-operably. The common access token (CAT) module provides a simple, extensible, policy-bearing bearer token for content access.

You can create, verify, and renew CAT tokens using HS256 (HMAC SHA256), ES256 (ECDSA w/ SHA-256), and PS256 (RSASSA-PSS w/ SHA-256) algorithms.

- CAT tokens are a CWT based token. Refer to the [CBOR Web Token (CWT) - (RFC8392)](https://datatracker.ietf.org/doc/html/rfc8392) standards document for more information.
- CWT token signing and encryption is described in the [CBOR Object Signing and Encryption (COSE) (rfc8152)](https://datatracker.ietf.org/doc/html/rfc8152) standards document. 

> 📘 The CAT module may change in the future
> 
> At this time, the module covers high level claims. You can extend it to other CAT claims in the spec as per your requirements.
> 
> The `enc` claim is currently only supported using the A256-GCM encryption algorithm. You can adopt new algorithms as they become available in EdgeWorkers [crypto](crypto.md) module.

# CAT

Constructor for new `CAT` object. It performs type checks on the `catOptions` object fields.

```javascript
CAT(catOptions: CATOptions)
```

# CATOptions Object
| Parameter | Type | Description | Default Value | Exceptions |
| --- | --- | --- | --- | --- |
| isCATTagAdded | Boolean | **(optional)** Enable if the CWT CBOR Tag (61) is added when the token is generated.<br/><br/>Refer to the [CBOR Web Token Internet Standards](https://www.rfc-editor.org/rfc/rfc8392.html)  for more details on tags. | false |  |
| isCoseCborTagAdded | Boolean | **(optional)** Enable if the COSE CBOR Tag such as, `COSE_Mac0` is added when the token is generated.<br/><br/>Refer to the [CBOR Object Signing and Encryption (COSE)](https://datatracker.ietf.org/wg/cose/about/) for more details on tags.<br/><br/>Currently only `Tag COSE_Mac0` and `COSE_Sign1` are supported. | true | Error(`Invalid catOptions: isCoseCborTagAdded must be boolean`) |
| issuer | String | **(optional)** The issuer to check with an `iss` claim in the CAT payload. |  | Error(`Invalid catOptions: issuer must be non empty string`) |
| subject | Array of Strings | **(optional)** The subject to check with a `sub` claim in the CAT payload. |  | Error(`Invalid catOptions: subject must be non empty string`) |
| audience | Array of Strings | **(optional)** The audience to check with an `aud` claim in the CA T payload. |  | Error(`Invalid catOptions: audience must be non empty string or array`) |
| ignoreExpiration | Boolean | **(optional)** If false, validate the expiry of the token. | true | Error(`Invalid catOptions: ignoreExpiration must be boolean`) |
| ignoreNotBefore | Boolean | **(optional)** If false, validate the `not before` claim of the token. | true | Error(`Invalid catOptions: ignoreNotBefore must be boolean`) |
| clockTolerance | Number | **(optional)** Number of seconds to tolerate when checking the `nbf` and `exp` claims. | 60 seconds | Error(`Invalid catOptions: clockTolerance must be number`) |


# CATJSON Object

Contains CWT header and payload object.

## Header

| Parameter | Type   | Description                                                                                                                                                                            |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| p         | Object | Protected header fields in JSON.  Refer to the **Header Parameters** section in the  [CBOR Object Signing and Encryption (COSE](https://datatracker.ietf.org/doc/rfc8152) document.    |
| u         | Object | Unprotected header fields in JSON.  Refer to the **Header Parameters** section in the  [CBOR Object Signing and Encryption (COSE)](https://datatracker.ietf.org/doc/rfc8152) document. |

## Payload

The set of claims from the CAT token as a JavaScript map. 

# ValidationResult Object

| Parameter | Type    | Description                                                       |
| :-------- | :------ | :---------------------------------------------------------------- |
| status    | boolean | Status of validation.                                             |
| errMsg    | String  | Error message in case the validation fails,`undefined` otherwise. |

# decode()

Performs the `cbor` decoding of the CAT token and  returns the decoded `CATJson`. The `CATJson` contains the CAT claims set which can be used to perform validations if required.

```javascript
decode(catTokenBytes: Uint8Array): CATJson
```

Returns `CATJson` that contains protected headers, unprotected headers, and payload containing the claim set. 

| Parameter     | Type                   | Description              |
| :------------ | :--------------------- | :----------------------- |
| catTokenBytes | Uint8Array for example | CAT token in byte format |

# isCATWellFormed()

Performs type checks on each claim value from the `claimset` CAT payload.

```javascript
isCATWellFormed(payload: Map<number, any>): ValidationResult
```

Returns a `ValidationResult` that indicates the validation along with error message if validation fails.

| Parameter | Type | Description                                       |
| :-------- | :--- | :------------------------------------------------ |
| payload   | Map  | CAT claims set where keys are integer or strings. |

# async isCATAcceptable()

Validates that the CAT token is acceptable and that the request satisfies all supported claim set rules. 

```javascript
async isCATAcceptable(payload: Map<number, any>, request: EW.EgressClientRequest, decryptionKey?: CryptoKey): Promise<ValidationResult>
```

Returns a Promise indicating the validation status along with error message if validation fails. 

If there is any claim present in the `crit` claim that are not supported by the CAT module, then this function will return a status of `false` with an error message.

| Parameter     | Type                                 | Description                                                                     |
| :------------ | :----------------------------------- | :------------------------------------------------------------------------------ |
| payload       | Map                                  | CAT claims set where keys are integer or strings.                               |
| request       | [Request Object](request-object.md) | Incoming requests to EdgeWorker.                                                |
| decryptionKey | CryptoKey                            | **(optional)**  Key to use for decrypting values from `enc` claim (if present). |

# Examples

## CAT token generation example

This example demonstrates how you can use EdgeWorkers for CAT token generation.

Here is the request payload that is accepted for the below EdgeWorkers logic. The EdgeWorker reads the JSON payload and convert it to a CAT claims set (map) with integer keys.

```json
{ "catu": { "host": { 0: "ew-cat-demo.akadpe.net" }, "path": { 0: "/slate" }},
  "catm": ["GET"],
  "catalpn": ["h2", "h3"],
  "geohash": "9vbf",
  "exp": 1716555010,
  "catr": { "renewabletype": 2, "expext": 120}
}
```

```javascript
import { logger } from 'log';
// Import 1.2.0 CWT module. CAT module is compatible with 1.2.0 CWT module. Refer https://techdocs.akamai.com/edgeworkers/docs/cwt for the same.
import { CWTGenerator, CWTUtil } from './cwt.js';
// Import CAT module
import { AlgoLabelMap, CatURILabelMap, ClaimsLabelMap, HeaderLabelMap, MatchTypeLabelMap, CAT, CatRLabelMap } from './cat.js';
import { TextDecoder, TextEncoder, base16, base64url } from 'encoding';
import { crypto } from 'crypto';
import { createResponse } from 'create-response';
 
// secret key used for HS256 algo while generating CAT token.
const hs256KeyHex = '403697de87af64611c1d32a05dab0fe1fcb715a86ab435f1ec99192d79569388';
 
const cat = new CAT({
  isCoseCborTagAdded: true,
  isCWTTagAdded: true
});
 
export async function responseProvider (request) {
    // request to generate CAT token
    if (request.path === '/token' && request.method === 'POST') {
      try {
        let body = '';
        for await (let chunk of request.body) {
          body += new TextDecoder().decode(chunk);
        }
        logger.log('D: body: %s', body);
        body = JSON.parse(body);
        // decode and prepare catu as per CAT spec
        let catu = body['catu']
        if (catu) {
         const catuMap = CWTUtil.claimsTranslate(catu, CatURILabelMap);
         for (const [key, value] of catuMap) {
            const uriComponentMatch = new Map();
    				for (const a in value) {
              if (a === MatchTypeLabelMap.sha256 || a === MatchTypeLabelMap.sha512) {
              	const decodedValue = base16.decode(value[a]);
                uriComponentMatch.set(a, decodedValue);
              } else {
                uriComponentMatch.set(a, value[a]);
              }
    				}
           catuMap.set(key, uriComponentMatch);
         }
         body['catu'] = catuMap
        }
        // decode and prepare catalpn as per CAT spec
        let catalpn = body['catalpn']
        if (catalpn) {
         const catalpns = []
         if (Array.isArray(catalpn)) {
           for (const c of catalpn) {
             catalpns.push(new TextEncoder().encode(c))
           }
           body['catalpn'] = catalpns;
         } else {
           body['catalpn'] = new TextEncoder().encode(catalpn);
         }
        }
        // decode and prepare catr as per CAT spec 
        let catr = body['catr']
        if (catr) {
          const catrenewal = new Map();
          catrenewal.set(CatRLabelMap.renewal_type, catr['renewabletype'])
          if (catr['expext']) {
            catrenewal.set(CatRLabelMap.exp_extension, catr['expext'])
          }
          if (catr['deadline']) {
            catrenewal.set(CatRLabelMap.renewal_deadline, catr['deadline'])
          }
          body['catr'] = catrenewal
        }
        const now = Math.floor(Date.now()/1000)
        const payload = CWTUtil.claimsTranslate(body, ClaimsLabelMap); 
        payload.set(ClaimsLabelMap.iat, now);
        payload.set(ClaimsLabelMap.nbf, now);
        // Prepare a valid CAT token and confirm
        const isWellFormedPayload = cat.isCATWellFormed(payload);
        if (isWellFormedPayload.status) {
          const protectedHeader = new Map();
          // CWT module requires alg to be sent as a part of CWT token itself.
          protectedHeader.set(HeaderLabelMap.alg, AlgoLabelMap.HS256)
          const unprotectedHeaders = new Map();
          unprotectedHeaders.set(HeaderLabelMap.kid, new TextEncoder().encode("akamai_key_hs256"))
          const header = {
             p: protectedHeader,
             u: unprotectedHeaders
          }
          const sKey = await crypto.subtle.importKey(
           'raw',
           base16.decode(hs256KeyHex, 'Uint8Array').buffer,
           {
             name: 'HMAC',
             hash: 'SHA-256'
           },
           false,
           ['sign','verify']
         );
    
          const signer = {
           key: sKey
          }
          const cwtTokenBuf = await CWTGenerator.mac(payload, signer, header, {}, {isCoseCborTagAdded: true, isCWTTagAdded: true });
          const cwtTokenBase64 = base64url.encode(new Uint8Array(cwtTokenBuf));
          return Promise.resolve(createResponse(200, {'content-type': 'text/plain'}, cwtTokenBase64));
        } else {
          return Promise.resolve(createResponse(400, {}, isWellFormedPayload.errMsg));
        }
      } catch(err) {
        return Promise.resolve(createResponse(400, {}, err.message));
      }
    }
}
```

## CAT token verification and renewal example

This example demonstrates how you can use EdgeWorkers as a token verification service to verify and renew tokens. 

```javascript
import { logger } from 'log';
// Import 1.2.0 CWT module. CAT module is compatible with 1.2.0 CWT module. Refer https://techdocs.akamai.com/edgeworkers/docs/cwt for the same.
import { CWTGenerator, CWTValidator } from './cwt.js';
// Import CAT module
import { HeaderLabelMap, CAT, ClaimsLabelMap, CatRLabelMap, AlgoLabelMap } from './cat.js';
import { TextDecoder, TextEncoder, base16, base64url } from 'encoding';
import { crypto, pem2ab } from 'crypto';
import URLSearchParams from 'url-search-params';
import { Cookies, SetCookie } from 'cookies';
 
// secret key used for HS256 algo while generating CAT token.
const hs256KeyHex = '403697de87af64611c1d32a05dab0fe1fcb715a86ab435f1ec99192d79569388';
 
// secret key used for ES256 algo while renewing CAT token.
const es256PrivJwk = {
  key_ops: ['sign'],
  ext: false,
  kty: 'EC',
  x: 'D5fNFnQYFBOjWa1ndpQK3ZrzXuHD77oGDgPaMNbtZ7s',
  y: 'Y4iS6G8atqp3x85xJOfCY997AVWHPy-dEgLk6CaNZ7w',
  crv: 'P-256',
  d: 'CyJoz5l2IG9cPEXvPATnU3BHrNS1Qx5-dZ4e_Z0H_3M'
};
 
// ES256 public key used for verifying renewed CAT token.
const es256PubPem = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAED5fNFnQYFBOjWa1ndpQK3ZrzXuHD
77oGDgPaMNbtZ7tjiJLobxq2qnfHznEk58Jj33sBVYc/L50SAuToJo1nvA==
-----END PUBLIC KEY-----`
 
const cat = new CAT({
  isCoseCborTagAdded: true,
  isCWTTagAdded: true,
  clockTolerance: 0
});
 
// token expiry and not before checks will be made as part of cat module.
const cwtValidator = new CWTValidator({ isCWTTagAdded: true, isCoseCborTagAdded: true, headerValidation: false, ignoreExpiration: true, ignoreNotBefore: true });
 
export async function onClientRequest (request) {
 
  let finalQs;
  // Media request
  if ((request.path.includes('.mpd') || request.path.includes('.m3u8') || request.path.includes('.ts') || request.path.includes('.m4s') ||
  request.path.includes('.m4a') || request.path.includes('.m4v') || request.path.includes('.mp4')) && request.method === 'GET') {
 
    let catToken;
    // Find CAT token from cookie
    const cookie = request.getHeader('cookie');
    if (cookie !== null && cookie !== undefined){
      let cookies = new Cookies(cookie)
      catToken = cookies.get('Common-Access-Token')
      if (catToken !== undefined) {
        logger.log('CAT obtained from cookie')
      }
    // Find CAT token from header
    } else if (request.getHeader('Common-Access-Token') !== null && request.getHeader('Common-Access-Token') !== undefined) {
      catToken = request.getHeader('Common-Access-Token')[0];
      if (catToken !== undefined) {
        logger.log('CAT obtained from header')
      }
    } else {
      // Find CAT token from header
      const querys_params = new URLSearchParams(request.query);
      catToken = querys_params.get('CAT')
      // Remove cat token from query string before forwarding to origin
      querys_params.delete('CAT')
      finalQs = querys_params.toString();
    }
     
    if (catToken !== null && catToken !== undefined) {
      try {
        let verificationKey;
        catToken = catToken.trim();
        //decode cat token to load appropriate verification key based on kid
        const catTokenBuf = base64url.decode(catToken);
        const catJSON = cat.decode(catTokenBuf);
        // Get the kid from unprotected map, we could also determine the key based on iss_kid as two issuers might use same kid. As of now the kid is considered to be unique.
        //Load verification key based on kid
        const kid = new TextDecoder().decode(catJSON.header.u.get(HeaderLabelMap.kid));
        logger.log('kid: %s', kid)
        if (kid === 'akamai_key_hs256') {
          // Load hs256 key
          verificationKey = await crypto.subtle.importKey(
            'raw',
            base16.decode(hs256KeyHex, 'Uint8Array').buffer,
            {
              name: 'HMAC',
              hash: 'SHA-256'
            },
            false,
            ['verify']
          )
        } else if (kid === 'akamai_key_es256') {
           // Load es256 key
          verificationKey = await crypto.subtle.importKey(
            'spki',
            pem2ab(es256PubPem),
            { name: "ECDSA", namedCurve: "P-256" },
            false,
            ['verify']
          );
        } else {
          // kid not found in unprotected header
          request.respondWith(400, {}, `Unable to load verification key with kid=${kid}`)
        }
        // Check if CAT claim set is well formed. Not mandatory if token generator is considered to be valid authority and can be avoided to save time. 
        let result = cat.isCATWellFormed(catJSON.payload);
        logger.log("result: %o", result)
        if (result.status === true) {
          try {
            // Perform signature verification
            await cwtValidator.validate(catTokenBuf,[{ key: verificationKey }]);
            // Check is CAT claim set is acceptable for the request.
            result = await cat.isCATAcceptable(catJSON.payload, request, null);
            logger.log("result: %o", result)
            if (result.status === true) {
              // check renewal
              const catr = catJSON.payload.get(ClaimsLabelMap.catr);
              const exp = catJSON.payload.get(ClaimsLabelMap.exp);
              const renewalType = catr.get(CatRLabelMap.renewal_type);
              const exp_extension = catr.get(CatRLabelMap.exp_extension);
              const exp_deadline = catr.get(CatRLabelMap.exp_deadline);
              logger.log("renewalType: %s", renewalType)
              logger.log("exp_extension: %s", exp_extension)
              logger.log("exp_deadline: %s", exp_deadline)
              logger.log("exp: %s", exp)
              // support for cookie and header renewable type
              if ((renewalType === 1 || renewalType === 2)  && exp_extension !== undefined && exp !== undefined) {
                let lowT;
                if (exp_deadline !== undefined) {
                  lowT = exp - exp_deadline * 60
                } else {
                  lowT = exp - 1 * 60 // 1 mins renewal window by default
                }
                const now = Math.floor(Date.now()/1000);
                logger.log("lowT: %s", lowT)
                logger.log("now: %s", now)
                // Renew the token
                if (now >= lowT && now < exp) {
                  const new_exp = now + exp_extension
                  catJSON.payload.set(ClaimsLabelMap.exp, new_exp)
                  catJSON.payload.set(ClaimsLabelMap.iss, 'akamai.com')
                  catJSON.payload.set(ClaimsLabelMap.iat, now)
                  // renewal token is signed with different key
                  catJSON.header.u.set(HeaderLabelMap.kid, new TextEncoder().encode('akamai_key_es256'))
                  // change algo
                  catJSON.header.p.set(HeaderLabelMap.alg, AlgoLabelMap.ES256);
                  const esSignKey = await crypto.subtle.importKey(
                    'jwk',
                    es256PrivJwk,
                    {
                      name: 'ECDSA',
                      namedCurve: 'P-256'
                    },
                    false,
                    ['sign']
                  );
                  // Generate renewed token
                  const cwtTokenBuf = await CWTGenerator.sign(catJSON.payload, { key: esSignKey }, catJSON.header, { isCoseCborTagAdded: true, isCWTTagAdded: true });
                  const cwtTokenBase64 = base64url.encode(new Uint8Array(cwtTokenBuf));
                  request.setVariable('PMUSER_RENEWED_CAT', cwtTokenBase64);
                  request.setVariable('PMUSER_RENEWAL_TYPE', renewalType);
                }
              }
              // Proceed and return the content
              request.route({ query: finalQs })
            } else {
              request.respondWith(401, {}, result.errMsg)
            }
          } catch(error) {
            request.respondWith(401, {}, 'Common access token signature verification failed')
          }
        } else {
          // Token is not well formed. (i.e syntax errors)
          request.respondWith(401, {}, result.errMsg)
        }
      } catch(error) {
        request.respondWith(401, {}, error.message)
      }
    } else {
      request.respondWith(403, {}, 'Common access token is not found in cookie {name=\'Common-Access-Token\'} or query string {cat=<token>}')
    }
  }
}
 
/** 
 The renewed token can be sent back to client in response using EW onClientResponse event handler. 
 However, same can also be achieved by applying necessary PM configuration rules without executing EW.
**/
// export function onClientResponse (request, response) {
//   const catRenewed = request.getVariable('PMUSER_RENEWED_CAT');
//   const renewalType = request.getVariable('PMUSER_RENEWAL_TYPE');
//   if (renewalType === 1) {
//     if (catRenewed !== undefined && catRenewed.length > 0) {
//       const cookie = new SetCookie({name: 'Common-Access-Token', value: catRenewed});
//       cookie.sameSite = 'None';
//       cookie.secure = true;
//       cookie.path = '/'
         // Return renewed CAT token in cookie
//       response.setHeader('Set-Cookie', cookie.toHeader());
//     }
//   } else if (renewalType === 2) {
//     if (catRenewed !== undefined && catRenewed.length > 0) {
         // Return renewed CAT token in response header
//       response.setHeader('Common-Access-Token', catRenewed);
//     }
//   }
// }
```

> 📘 The `PMUSER_RENEWED_CAT` variable holds the renewed token. The renewed token can be sent back to the client in response using the EdgeWorkers `onClientResponse` event handler. It can also sent back using Property configuration rules without executing the EdgeWorker.

# Limitations

## Algorithm not provided externally

The CAT token must include the `alg` field as a part of CWT protected or unprotected header field when generated by any service. The EdgeWorkers [cwt](cwt.md) module relies on this field to determine which algorithm to use for token verification.

## Missing client information in request object

As of now, the EdgeWorkers [Request Object](request-object.md) does not provide information such as network protocol or client IP. Review the examples below workarounds for this limitation.

## Missing client information in request object

As of now, the [Request Object](request-object.md) does not provide information such as network protocol or client IP. However, you can copy the value from [Built-in variables](https://techdocs.akamai.com/property-mgr/docs/built-vars) to [User-defined variables](https://techdocs.akamai.com/property-mgr/docs/user-defined-vars) using the [Set variable behavior](https://techdocs.akamai.com/property-mgr/docs/set-var-beh)  or [Advanced behavior](https://techdocs.akamai.com/property-mgr/docs/adv-beh).

Review the examples below for workarounds for this limitation.

### catalpn

To use the `catalpn` claim validation, you need to contact Akamai support. Ask your account representative to add the following [Advanced behavior](https://techdocs.akamai.com/property-mgr/docs/adv-beh) to your property configuration before the EdgeWorker behavior is executed.
<Frame>
  <img src="https://files.readme.io/0b975c6-Screenshot_2024-05-30_at_3.40.10_PM.jpg" alt="Image"/>
</Frame>


Here is the XML for the Advanced behavior.

```xml Metadata Snippet
<assign:variable> 
    <name>PMUSER_ALPN</name>  
    <value>http/1.1</value>  
    <hidden>off</hidden>  
</assign:variable>  
<match:variable name="AK_PROTOCOL_NEGOTIATION" value="h2-14 h2">  
    <assign:variable>  
        <name>PMUSER_ALPN</name>  
        <value>h2</value>  
    </assign:variable>  
</match:variable>  
<match:variable name="AK_PROTOCOL_NEGOTIATION" value=" h3-29 h3">  
    <assign:variable>  
        <name>PMUSER_ALPN</name>  
        <value>h3</value>  
    </assign:variable>  
</match:variable>
```

### catnip claim

To use the `catnip` claim, you can add the following  [Set variable behavior](https://techdocs.akamai.com/property-mgr/docs/set-var-beh) to your property configuration before the EdgeWorker is executed.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/catSetVariable-v1.jpg" alt="Image"/>
</Frame>


## Unsupported claims

The following claims are currently not supported by the CAT module.

- CAT token replay prevention. For example, `catreplay = 1` .
- CAT probability of rejection claim.  
- CAT altitude claim.
- CAT TLS public key claim.
- DPoP claims.
