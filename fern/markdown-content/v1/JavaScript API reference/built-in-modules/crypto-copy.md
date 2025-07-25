---
title: "EW-24033 crypto"
slug: "crypto-copy"
excerpt: ""
hidden: true
createdAt: "Mon Nov 11 2024 15:50:33 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 14 2024 17:49:07 GMT+0000 (Coordinated Universal Time)"
---
The crypto module is available to use in your EdgeWorkers code bundles to support the Javascript crypto API. The JavaScript crypto API is based on the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API).

# Example 1 - Verify Signatures with a Public Key

These steps demonstrate how to reference public keys locally within your EdgeWorkers code bundle and pass them into the crypto built-in module. To use the crypto module you need to:

- Create a key pair.  
- Update your EdgeWorkers function to use the public key and the crypto built-in module.

Using this method, you no longer need to pack crypto libraries into your EdgeWorkers code bundles.

> 📘 Before you start, you should find out if your organization has any guidelines about the source of key materials. For this example, we'll assume your organization allows the use of WebCrypto APIs in Chrome.

## Create a key pair

This example demonstrates how to create an [ECDSA key](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) using [SubtleCrypto.generateKey()](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey). 

1. In the [Chrome JavaScript console](https://developer.chrome.com/docs/devtools/console/javascript/), run this code to generate your keys.

```javascript
await crypto.subtle.generateKey(
    {
        name: "ECDSA",
        namedCurve: "P-256",
    },
    true, // Indicates the key can be exported.
    ["sign", "verify"]
)
.then(async pair => {
        let publicJwk = await crypto.subtle.exportKey("jwk", pair.publicKey);
        console.log("Public: %s", JSON.stringify(publicJwk));

        let privateJwk = await crypto.subtle.exportKey("jwk", pair.privateKey);
        console.log("Private: %s", JSON.stringify(privateJwk));
})
```

2. Here's an example of output that contains the public and private keys.

```javascript
Public: {"crv":"P-256","ext":true,"key_ops":["verify"],"kty":"EC","x":"Ttiko0FT0Eg7pAtW9u_l07waClao36qLlV8GHNqFjKM","y":"QuUcij33jYXB0Rf7ZODNhduL4wKSzeKZQjlLqFFxAH8"}
Private: {"crv":"P-256","d":"4V892xv40B7UPmbAOMs-MrHC0whqdV4vB9e1dJRfkIY","ext":true,"key_ops":["sign"],"kty":"EC","x":"Ttiko0FT0Eg7pAtW9u_l07waCl
```

> 📘 Every call to the `generateKey()` method creates new keys.

## Use the keys in an EdgeWorkers function

You can now add the public key and the crypto built-in module to your EdgeWorkers function. This simple EdgeWorkers function uses the `onClientRequest` event handler and the request headers to pass the data and signature. 

1. Update your EdgeWorkers function so that it performs these operations:

   - Loads the public key using the [`importKey()`](crypto.md#importkey) method to verify a signature. 

   - Converts the two input headers, [`verify-data`](crypto.md#verify)  and [`verify-sig`](crypto.md#verify), from a header-friendly [base64](encoding.md#base64) format to a Uint8Array. The built-in [encoding](encoding.md) module contains a number of helpers that transform common input formats such as, [base16](encoding.md#base16), [base64](encoding.md#base64), and [base64url](encoding.md#base64url) to JavaScript’s typed arrays.

   - Runs the [`verify()`](crypto.md#verify)  function on the Uint8Arrays that represent the input headers. 

Here's an example of an EdgeWorkers function after you've updated it to perform theses functions and added the key and crypto modules. 

> 📘 Make sure that the **ext** field of the JWK is **false** so that it agrees with the **extractable** field of the `importKey()` method.

```javascript
import { crypto } from 'crypto';
import { base64 } from 'encoding';

export async function onClientRequest(request) {
    let data = request.getHeader('verify-data')[0];
    let sig = request.getHeader('verify-sig')[0];
    
    let cryptoKey = await crypto.subtle.importKey(
            "jwk",
            {"crv":"P-256","ext":false,"key_ops":["verify"],"kty":"EC","x":"Ttiko0FT0Eg7pAtW9u_l07waClao36qLlV8GHNqFjKM","y":"QuUcij33jYXB0Rf7ZODNhduL4wKSzeKZQjlLqFFxAH8"},
            { name: "ECDSA", namedCurve: "P-256" },
            false,
            ["verify"]
    );

    data = base64.decode(data);
    sig = base64.decode(sig);

    let isOk = await crypto.subtle.verify(
           {
                name: "ECDSA",
                hash: "SHA-256",
            },
            cryptoKey,
            sig,
            data
    );

    if (isOk) {
        request.respondWith(200, {}, 'Signature checks out');
    }
    else {
        request.respondWith(403, {}, 'Invalid signature');
    }
}
```

2. In addition to updating your EdgeWorkers code you also need to sign some data. To do this, paste the following code snippet into your JavaScript Console.

```javascript Paste in the Chrome JavaScript Console
let privateKey = await crypto.subtle.importKey("jwk",  {"crv":"P-256","d":"4V892xv40B7UPmbAOMs-MrHC0whqdV4vB9e1dJRfkIY","ext":true,"key_ops":["sign"],"kty":"EC","x":"Ttiko0FT0Eg7pAtW9u_l07waClao36qLlV8GHNqFjKM","y":"QuUcij33jYXB0Rf7ZODNhduL4wKSzeKZQjlLqFFxAH8"}, { name: "ECDSA", namedCurve: "P-256" }, false, ['sign']);
let data = new TextEncoder().encode("secret");
let signature = await crypto.subtle.sign(
    {
        name: "ECDSA", hash: {name: "SHA-256"},
    },
    privateKey,
    data
);
let base64Sig = btoa(String.fromCharCode(...new Uint8Array(signature)));
console.log("sig: %s", base64Sig);
```

This snippet gets the ASCII encoding of the string “secret”.

The ASCII encoded string is then converted to an Uint8Array and is passed to the `sign()` function, along with the private CryptoKey we generated earlier. 

3. Here's an example of the console output you should see.

```javascript
sig: GN1Yo5z0oKVEhhAmCz7X5sy6s4Uvqf++bdNfaX4lcPQjg7M6HIxf++ulb3F/BsyZXsOxaTbqOoJWQL9o0gybwA==
```

The value after “sig” is the base64 encoded signature. 

> 📘 Each call to the function will result in a different signature.

4. Use this curl command to pass the signature and the base64 encoded representation of the string “secret” to the EdgeWorkers function. 

```curl
$ curl -i '<path-to-your-edgeworker>' -H "verify-data: c2VjcmV0" -H "verify-sig: GN1Yo5z0oKVEhhAmCz7X5sy6s4Uvqf++bdNfaX4lcPQjg7M6HIxf++ulb3F/BsyZXsOxaTbqOoJWQL9o0gybwA=="
```

You should get a 200 response. This indicates that the EdgeWorkers function properly read and verified the data and signature from the headers. If you change a character in the `verify-data` header, you will get a 403 response. 

```curl
HTTP/1.1 200 OK
Date: Wed, 21 Sep 2022 19:18:01 GMT
Connection: keep-alive
```

# Example 2 - Verify a JWT with HMAC

JSON Web Tokens (JWTs) provide a standards-compliant way of sharing verifiable data. The following example verifies a JWT: 

```javascript
import { crypto } from 'crypto';
import { TextEncoder, base64url } from 'encoding';
 
async function verify_hs256(jwt, key) {
    // Split the signature from the header/claims
    const lastDot = jwt.lastIndexOf('.');
    if (lastDot < 0) {
        throw new Error("Missing dot");
    }
    const headerAndClaims = jwt.substring(0, lastDot);
    const signature = jwt.substring(lastDot + 1);
 
    return crypto.subtle.verify({
            name: 'HMAC'
        },
        key,
        base64url.decode(signature),
        new TextEncoder().encode(headerAndClaims)
    ).then(verified => {
        if (verified) {
            // Success! Extract the header and claims.
            const [header, claims] = headerAndClaims.split('.');
            return [
                JSON.parse(base64url.decode(header, "String")),
                JSON.parse(base64url.decode(claims, "String"))
            ];
        } else {
            throw new Error("signature did not match")
        }
    });
}
 
export async function onClientRequest(request) {
    let jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlbXBsb3llZTAiLCJuYW1lIjoiVG9tIExlaWdodG9uIiwiaWF0Ijo5MDM2NDAwMDF9.Qwhga5JtDV8opoCyvQddSdZ3tsEeMaWvySPBmuBDfFU";
    let secret = {
        "alg": "HS256",
        "ext": false,
        "k": "c2VjcmV0",
        "key_ops": ["verify"],
        "kty": "oct"
    };
 
    let key = await crypto.subtle.importKey(
        'jwk', secret, {
            "name": "HMAC",
            "hash": "SHA-256"
        },
        false, ['verify']
    );
 
    await verify_hs256(jwt, key)
        .then(verified => request.respondWith(202, {}, "verified: " + JSON.stringify(verified)))
        .catch(e => request.respondWith(500, {}, "err: " + e.message));
}
```

The `verify_hs256()` splits the JWT into its component parts, verifies the signature, and returns the decoded header and claims. In this case, the response status should be a 202 with the following body:

```text EdgeWorker Response
verified: [{"alg":"HS256","typ":"JWT"},{"sub":"employee0","name":"Tom Leighton","iat":903640001}]
```

# CryptoKey Object

The CryptoKey interface represents a cryptographic key obtained from the [`importKey()`](crypto.md#importkey) SubtleCrypto method. After you create a key you can use it to verify a signature, encrypt, or decrypt data.

## CryptoKey Object Properties

## type

The `type` of key. This is a read-only string value.

## extractable

Indicates whether the key can be extracted using `exportKey()` or `wrapKey()`. This is a read-only boolean value.

## algorithm

Returns an object that contains the supported `algorithm` for the specified key and any extra parameters. This is a read-only value.

## usages

Indicates what can be done with the key. This is a read-only array of strings value.

# SubtleCrypto Object

The `subtleCrypto` interface provides several cryptographic functions. SubtleCrypto features are obtained through the `subtle` property of the Crypto object you get from the Crypto property.

## importKey()

Imports a key from a promise that fulfills with the imported key as a CryptoKey object.

The following example demonstrates the use of `importKey()`, `encrypt()`, and `decrypt()`. It imports an AES-CBC key, using it to encrypt and then decrypt sample text. It verifies that the decrypted value is the same as the encrypted value.

```javascript
const SOURCE: &str = r#"
import { crypto } from 'crypto';

        export async function onClientRequest(request) {
            let rawKey = new Uint8Array ([93,210,19,203,234,199,254,16,118,129,214,61,229,117,91,33]);
            let key = await crypto.subtle.importKey("raw", rawKey, {"name": "AES-CBC"}, false, ["encrypt","decrypt"]);
    
            let iv = new Uint8Array([237, 234, 45, 119, 168, 16, 178, 26, 14, 182, 253, 39, 79, 181, 180, 219]);
            let data = new Uint8Array([44, 237, 221, 235, 17, 155, 115, 79, 8, 211, 94, 216, 92, 183, 9, 106, 15, 210, 0, 52, 92, 163, 2, 222, 130, 70, 80, 132, 80, 243, 28, 110, 25, 18, 20, 98, 63, 51, 5, 136, 72, 206, 212, 46, 255, 220, 131, 188, 133, 109]);
    
            let encryptedData = await crypto.subtle.encrypt({name: "AES-CBC", iv: iv}, key, data);
            let decryptedData = await crypto.subtle.decrypt({name: "AES-CBC", iv: iv}, key, encryptedData);
            
            if (new Uint8Array(data).toString() === new Uint8Array(decryptedData).toString()) {
                request.respondWith(200, {}, 'same!');
            }
            else {
                request.respondWith(501, {}, 'different!');
            }
        }
```
| Parameter | Type | Description |
| --- | --- | --- |
| format | String | Describes the data format of the key to import. It can be one of the following:<br/><br/>- raw<br/>- pkcs8<br/>- spki<br/>- jwk |
| keyData | ArrayBuffer<br/>TypedArray<br/>DataView<br/>or JSONWebKey object | Contains the key in the given format. |
| algorithm | Object<br/><br/>The AES-CBC, AES-CTR and AES-GCM algorithms can be either an object or a string. | Defines the type of key to import and provides extra algorithm specific parameters.<br/><br/>The supported algorithms with formats are:<br/><br/>- RSASSA-PKCS1-v1_5: [jwk](crypto.md#rsassa-pkcs1-v1_5-jwk-example), [pkcs8](crypto.md#rsassa-pkcs1-v1_5-pkcs8-example), [spki](crypto.md#rsassa-pkcs1-v1_5--spki-example)<br/>- RSA-PSS: [jwk](crypto.md#rsa-pss-jwk-example), [pkcs8](crypto.md#rsa-pss-pkcs8-example), [spki](crypto.md#rsa-pss-spki-example),<br/>- HMAC: [jwk](crypto.md#hmac-jwk-example), [raw](crypto.md#hmac-raw-example)<br/>- AES-CBC: [jwk](crypto.md#aes-cbc-jwk-example), [raw](crypto.md#aes-cbc-raw-example)<br/>- ECDSA: [jwk](crypto.md#ecdsa-jwk-example), [pkcs8](crypto.md#ecdsa-pkcs8-example), [raw](crypto.md#ecdsa-raw-example), [spki](crypto.md#ecdsa-spki-example)<br/>- AES-CTR: [jwk](crypto.md#aes-ctr-jwk-example)<br/>- RSA-OAEP: [jwk](crypto.md#rsa-oaep-jwk-example)<br/>- AES-GCM: [raw](crypto.md#aes-gcm-raw-example) |
| extractable | Boolean | Must be set to false.<br/>Indicates whether the key can be exported. |
| keyUsages | Array of strings | Indicates what can be done with the key:<br/>"encrypt",<br/>"decrypt",<br/>"sign",<br/>and "verify" |


### RSASSA-PKCS1-v1_5: jwk example

```javascript
let key = await crypto.subtle.importKey("jwk",
       {
           kty: "RSA",
           e: "AQAB",
           n: "vGO3eU16ag9zRkJ4AK8ZUZrjbtp5xWK0LyFMNT8933evJoHeczexMUzSiXaLrEFSyQZortk81zJH3y41MBO_UFDO_X0crAquNrkjZDrf9Scc5-MdxlWU2Jl7Gc4Z18AC9aNibWVmXhgvHYkEoFdLCFG-2Sq-qIyW4KFkjan05IE",
           alg: "RS256",
       },
       { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
       false,
       ["verify"]);
```

### RSASSA-PKCS1-v1_5: pkcs8 example

```javascript
let key = await crypto.subtle.importKey("pkcs8",
        pem2ab(pemEncodedKey),
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false,
        ["sign"]
)
```

### RSASSA-PKCS1-v1_5:  spki example

```javascript
let key = crypto.subtle.importKey("spki",
    pem2ab(pemEncodedKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"])
```

### RSA-PSS: jwk example

```javascript
let key = await crypto.subtle.importKey("jwk",
       {
           kty: "RSA",
           e: "AQAB",
           n: "vGO3eU16ag9zRkJ4AK8ZUZrjbtp5xWK0LyFMNT8933evJoHeczexMUzSiXaLrEFSyQZortk81zJH3y41MBO_UFDO_X0crAquNrkjZDrf9Scc5-MdxlWU2Jl7Gc4Z18AC9aNibWVmXhgvHYkEoFdLCFG-2Sq-qIyW4KFkjan05IE",
           alg: "PS256"
       },
       { name: "RSA-PSS", hash: "SHA-256" },
       false,
       ["verify"]);
```

### RSA-PSS: pkcs8 example

```javascript
let key = await crypto.subtle.importKey("pkcs8",
        pem2ab(pemEncodedKey),
        { name: "RSA-PSS", hash: "SHA-256" },
        false,
        ["sign"]
)
```

### RSA-PSS: spki example

```javascript
let key = await crypto.subtle.importKey(
       "spki",
       pem2ab(pemEncodedKey),
       { name: "RSA-PSS", hash: "SHA-256" },
       false,
       ["verify"])
```

### HMAC: jwk example

```javascript
let format = "jwk";
let keyData = {
    "alg": "HS512",
    "ext": false,
    "k": "fJSIx_0QkyZ4hju2MdwbI8nczcmYHkZnqB6HRi_cJlsO5c_FMeX7yTqh5sJ65jXf8_PUduCjsZpCcL_ApmvyyQ",  //<-- Verified in Chrome that its length is 512
    "key_ops": [
        "sign",
        "verify"
    ],
    "kty": "oct"
};
let algorithm = {
    "name": "HMAC",
    "hash": "SHA-512"
};
let extractable = false;
let keyUsages = ["sign", "verify"];

let key = await crypto.subtle.importKey(format, keyData, algorithm, extractable, keyUsages);
```

### HMAC: raw example

```javascript
let format = "raw";
let keyData = new Uint8Array([4, 232, 90, 60, 241, 190, 56, 218, 108, 4, 168, 250, 230, 174, 166, 14, 227, 212, 12, 107, 54, 156, 21, 217, 10, 16, 23, 230, 177, 51, 82, 128, 62, 1, 187, 244, 255, 43, 78, 157, 2, 148, 164, 158, 103, 168, 234, 6, 106, 136, 91, 12, 143, 227, 196, 36, 55, 20, 106, 45, 203, 209, 93, 65, 244]);
let algorithm = {
    "name": "HMAC",
    "hash": "SHA-512",
};
let extractable = false;
let keyUsages = ["verify"];

let key = await crypto.subtle.importKey(format, keyData.buffer, algorithm, extractable, keyUsages);
```

### AES-CBC: jwk example

```javascript
let format = "jwk";
let keyData = {
    "alg": "A128CBC",
    "ext": false,
    "k": "aI9fw-VdJd-Hvi8t61JQ4w",
    "kty": "oct"
};
let algorithm = "AES-CBC";

let extractable = false;
let keyUsages = ["encrypt"];

let key = await crypto.subtle.importKey(format, keyData, algorithm, extractable, keyUsages);
```

### AES-CBC: raw example

```javascript
let keyData = new Uint8Array([242, 215, 100, 141, 106, 23, 155, 163, 74, 14, 164, 65, 179, 119, 146, 204, 178, 46, 90, 197, 0, 165, 114, 202, 32, 253, 219, 60, 53, 186, 234, 14]);

let key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
);
```

### ECDSA: jwk example

```javascript
let format = "jwk";
    let keyData = {
        "kty": "EC",
        "crv": "P-256",
        "x": "GH4tmgb8eaqdA-n7KXgy1SJ3BjOaIq_Hj9pPKAiyALE",
        "y": "DsZu5YirOG5uIQ5tWGCYM8n2q4yTIZjTYByFdVwyUig",
        "ext": false
    };
    let algorithm = {
        "name": "ECDSA",
        "namedCurve": "P-256"
    };
    let extractable = false;
    let keyUsages = ["verify"];
    
    let key = await crypto.subtle.importKey(format, keyData, algorithm, extractable, keyUsages);
```

### ECDSA: pkcs8 example

```javascript
let key = await crypto.subtle.importKey("pkcs8",
            pem2ab(pemEncodedKey),
            { name: "ECDSA", namedCurve: "P-256" },
            false,
            ["sign"]
    )
```

### ECDSA: raw example

```javascript
let keyData = new Uint8Array([4, 232, 90, 60, 241, 190, 56, 218, 108, 4, 168, 250, 230, 174, 166, 14, 227, 212, 12, 107, 54, 156, 21, 217, 10, 16, 23, 230, 177, 51, 82, 128, 62, 1, 187, 244, 255, 43, 78, 157, 2, 148, 164, 158, 103, 168, 234, 6, 106, 136, 91, 12, 143, 227, 196, 36, 55, 20, 106, 45, 203, 209, 93, 65, 244]);
    let key = await crypto.subtle
        .importKey(
          "raw",
          keyData.buffer,
          { name: "ECDSA", namedCurve: "P-256" },
          false,
          ["verify"]
        )
        .catch((err) => {
          throw 'importKey() failed. Error: ' + err.message;
        });
```

### ECDSA: spki example

```javascript
let derEncodedKey = [48, 50, 48, 16, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 5, 43, 129, 4, 0, 6, 3, 30, 0, 4, 109, 78, 102, 114, 132, 45, 253, 21, 44, 94, 147, 33, 211, 179, 203, 194, 80, 82, 169, 113, 88, 220, 174, 211, 40, 134, 224, 147];
    let derEncodedKeyBuffer = new Uint8Array(derEncodedKey);

    let key = await crypto.subtle
        .importKey(
          "spki",
          derEncodedKeyBuffer,
          { name: "ECDSA", namedCurve: "P-256" },
          false,
          ["verify"]
        )
        .catch((err) => {
          throw 'importKey() failed. Error: ' + err.message;
        });
```

### AES-CTR: jwk example

```javascript
let format = "jwk";
    let keyData = {
        "alg": "A128CTR",
        "ext": false,
        "k": "aI9fw-VdJd-Hvi8t61JQ4w",
        "kty": "oct"
    };
    let algorithm = {
        "name": "AES-CTR"
    };
    let extractable = false;
    let keyUsages = ["encrypt"];

    let key = await crypto.subtle.importKey(format, keyData, algorithm, extractable, keyUsages);
```

### RSA-OAEP: jwk example

```javascript
let format = "jwk";
    let keyData = {
        "kty": "RSA",
        "e": "AQAB",
        "n": "pDepsbn1dYDuNqfSD13OaZEPwBGZbEF4qvGwm2GB2jNrNIor5orS3-FOgSfGQQ2EL7eYrhPFp_An82lQNolWLK57Iv4Ucrr8CMt-aDhUq9eQXZ1az8-BHNoy2OxkqHiJU2xdgHuXqDaANa4vuNfwJzLNGFaUcpPRxXl9ZmVGP2BjM9yfch2E4xG2rcOtbCSL1cO7KCCGjSyLecrPv4xhbgKwhc0lG5cvSWjYWDPVisLiyu3rA6We2cnGeJ3m2bwQ15QwkP3J7qeZJpRLkxO7hVUmsqHyWCYmsjEGI1EHgTfeHLP4tT0D6iyYQml-Lkb5HOMxCkt9QQCsjYQwg2A9JQ",
        "alg": "RSA-OAEP-256",
        "ext": false
    };
    let algorithm = {
        "name": "RSA-OAEP",
        "hash": "SHA-256"
    };
    let extractable = false;
    let keyUsages = ["encrypt"];
    
    let key = await crypto.subtle.importKey(format, keyData, algorithm, extractable, keyUsages);
```

### AES-GCM: raw example

```javascript
let keyData = new Uint8Array([242, 215, 100, 141, 106, 23, 155, 163, 74, 14, 164, 65, 179, 119, 146, 204, 178, 46, 90, 197, 0, 165, 114, 202, 32, 253, 219, 60, 53, 186, 234, 14]);

let key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
);
```

## encrypt()

Returns a promise that fulfills with an ArrayBuffer containing the encrypted data.
| Parameter | Type | Description |
| --- | --- | --- |
| algorithm | Object | Specifies the algorithm to use and any extra parameters if required.<br/><br/>The supported algorithms are:<br/><br/>- AES-CBC<br/>- RSA-OAEP<br/>  <span style="color:red">**Note**: Due to a known issue, the RSA-OAEP `encrypt()` function is not currently interoperable with other SubtleCrypto implementations. The encrypted data, however, remains secure.</span><br/>- AES-CTR<br/>- AES-GCM |
| key | CryptoKey | Contains the key to use for encryption. |
| data | ArrayBuffer<br/>TypedArray<br/>or DataView | Contains the data to be encrypted. |


## decrypt()

Returns a promise that fulfills with an ArrayBuffer containing the decrypted data. 
| Parameter | Type | Description |
| --- | --- | --- |
| algorithm | Object | Specifies the algorithm to use and any extra parameters if required.<br/><br/>The supported algorithms are:<br/><br/>- AES-CBC<br/>- RSA-OAEP<br/>  <span style="color:red">**Note**: Due to a known issue, the RSA-OAEP `decrypt()` function currently only supports decryption of text encrypted by EdgeWorkers. It is not interoperable with other SubtleCrypto implementations at this time.</span><br/>- AES-CTR<br/>- AES-GCM |
| key | CryptoKey | Contains the key to uses for decryption. |
| data | ArrayBuffer<br/>TypedArray<br/>or DataView | Contains the data to be encrypted. |


## sign()

Generates a digital signature. Returns a promise that fulfills with an ArrayBuffer containing the signature.
| Parameter | Type | Description |
| --- | --- | --- |
| algorithm | String or Object | Specifies the signature algorithm to use and its parameters.<br/>The supported algorithms include:<br/><br/>- HMAC<br/>- RSA-PSS<br/>- RSASSA-PKCS1-v1_5<br/>- ECDSA |
| key | CryptoKey | Contains the key to use to generate the signature. |
| data | ArrayBuffer<br/>TypedArray<br/>or DataView | Contains the data to be signed. |


HMAC: sign example

```javascript
// `key` is the result returned from `importKey()` using `HMAC`
const data = Uint8Array.from([97, 110, 103, 117, 115, 32, 97, 110, 100, 32, 111, 119, 101, 110]);
let sig = await crypto.subtle.sign("HMAC", key, data).catch((err) => {
    throw 'sign() failed. Error: ' + err.message;
});;
```

## verify()

Verifies a digital signature. Returns a promise that fulfills with a boolean value. The boolean value is `true` if the signature is valid, if the signature is invalid it returns a value of `false`.
| Parameter | Type | Description |
| --- | --- | --- |
| algorithm | Object<br/><br/>The RSASSA-PKCS1-v1_5 and HMAC algorithms can be either an object or a string | Defines the algorithm to use, algorithm choices, and extra parameters.<br/><br/>The supported algorithms are:<br/><br/>- HMAC<br/>- RSA-PSS<br/>- RSASSA-PKCS1-v1_5<br/>- ECDSA |
| key | CryptoKey | Contains the key to use to verify the signature. |
| signature | ArrayBuffer | Contains the signature to verify. |
| data | ArrayBuffer | Contains the data that needs its signature verified. |


## digest()

Generates a digest of the given data. Returns a promise that fulfills with an ArrayBuffer containing the digest.
| Parameter | Type | Description |
| --- | --- | --- |
| algorithm | string or object | Includes the name property and the string names the hash functions use. Supported values include:<br/>"SHA-1"<br/>"SHA-256"<br/>"SHA-384"<br/>"SHA-512" |
| data | ArrayBuffer<br/>TypedArray<br/>or DataView | Contains the data to be digested. |


The following example computes the SHA-256 hash of a static array buffer. The expected output is Encoded: `d87303c776e767aa617e9e5c8a3238a2f7c3e98ea395165786d97322bd731415`.

```javascript
import { crypto } from 'crypto';
 
export async function onClientRequest(request) {
            let buf = new Uint8Array([71,117,115,32,97,110,100,32,79,119,101,110,32,115,97,121,32,104,105,46]);
 
            // Perform the digest            
            let encoded = await crypto.subtle.digest('SHA-256', buf);


            // Format the output into hex
            let walkable = Array.from(new Uint8Array(encoded));
            let hex = walkable.map((b) => b.toString(16).padStart(2, '0')).join('');
            
            request.respondWith(200, {}, "Encoded: " + hex);
        }
```

# Crypto Object

Represents basic cryptography features available in the current context. 

## getRandomValues()

Returns cryptographically strong random values. Writes the random values into the passed array.

```javascript
import { crypto } from 'crypto';
 
export async function onClientRequest(request) {
    let array = new Uint32Array(1);
    crypto.getRandomValues(array);
    request.addHeader("X-Random-Number", array[0].toString());
}
```

| Parameter  | Type                     | Description                                                                                                               |
| :--------- | :----------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| typedArray | Integer-based TypedArray | Replaces the array contents with the newly generated random numbers. The length of the array controls the amount of data. |

## Crypto Object Properties

## subtle

Returns a `SubtleCrypto` object that provides access to common cryptographic primitives. This is a read-only value.

# pem2ab()

Converts a PEM-encoded key string into an ArrayBuffer. This function converts valid text between matching BEGIN and END delimiters, as described in [RFC-7468](https://datatracker.ietf.org/doc/html/rfc7468). Throws a TypeError error if matching headers cannot be found, or if illegal characters appear within the delimiters.

```javascript
import { crypto, pem2ab} from 'crypto';
 
export async function onClientRequest(request) {
  let pemEncodedKey = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAELScIYCjf+IOluv9pppNv0xIGXTBp
KlSNHLY0ZX554kjI8DknO3x8J5z+H31OX7spkrI6xdqj9Q0Ouoy6UmjJ3w==
-----END PUBLIC KEY-----`;
 
       let cryptoKey = await crypto.subtle.importKey(
            "spki",
            pem2ab(pemEncodedKey),
            { name: "RSA-PSS", hash: "SHA-256" },
            false,
            ["verify"])
            .catch((err) => request.respondWith(222, {}, "error text: " + err.message));
 
       let signature = new Uint8Array([77, 125, 140, 9, 158, 214, 29, 176, 0, 44, 34, 9, 111, 158, 2, 97, 66, 238, 89, 240, 146, 171, 200, 99, 133, 231, 60, 89, 44, 156, 26, 7, 111, 198, 231, 11, 224, 154, 151, 224, 84, 120, 183, 185, 175, 34, 165, 99, 240, 102, 21, 251, 211, 191, 61, 224, 181, 30, 10, 108, 93, 192, 218, 43]);
       let data = new Uint8Array([
  104, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33
]);
 
       globalThis.result = await crypto.subtle.verify(
           {
             name: "RSA-PSS"
           },
            cryptoKey,
            signature,
            data)
            .catch((err) => request.respondWith(222, {}, "error text: " + err.message));
}
```

| Parameter     | Type                   | Description                                                         |
| :------------ | :--------------------- | :------------------------------------------------------------------ |
| pemEncodedKey | PEM-encoded key string | An ArrayBuffer to use as `keyData` in the `SubtleCrypto.importKey`. |
