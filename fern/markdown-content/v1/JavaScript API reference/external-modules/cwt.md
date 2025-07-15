---
title: "cwt"
slug: "cwt"
excerpt: ""
hidden: false
createdAt: "Mon Jan 23 2023 14:35:48 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Sep 06 2024 15:23:45 GMT+0000 (Coordinated Universal Time)"
---
This module is available to use in your EdgeWorkers code bundles to verify CWT tokens. For more information, refer to the [CBOR Web Token format specification](https://datatracker.ietf.org/doc/html/rfc8392) and the [CBOR Object Signing and Encryption (COSE)](https://datatracker.ietf.org/doc/html/rfc8152) documents.

Go to the the [EdgeWorkers GitHub repo](https://github.com/akamai/edgeworkers-examples/tree/master/delivery/common/cwt) for access to the CWT module, the main helper class you need to import into your `main.js` file and the TypeScript definition file. You can also find [examples](https://github.com/akamai/edgeworkers-examples/tree/master/delivery/common/cwt/examples) to help you learn more about how to use the cwt module .

> 📘 Currently the module only supports verification for CWT tokens using the HS256 (HMAC SHA256) and ES256 (ECDSA w/ SHA-256) algorithms.

# CWTValidator

Constructor for new `CWTValidator` Object. It performs type checks on the `cwtOptions` Object fields.

```javascript
CWTValidator(cwtOptions: CWTOptions)
```

# CWTOptions Object

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "h-3": "Default Value",
    "h-4": "Exceptions",
    "0-0": "isCWTTagAdded",
    "0-1": "Boolean",
    "0-2": "**(optional)** Enable if the CWT CBOR Tag (61) is added when the token is generated.  \n  \nRefer to the [CBOR Web Token Internet Standards](https://www.rfc-editor.org/rfc/rfc8392.html) for more details on tags.",
    "0-3": "false",
    "0-4": "Error(`Invalid cwtOptions: isCWTTagAdded must be boolean`)",
    "1-0": "isCoseCborTagAdded",
    "1-1": "Boolean",
    "1-2": "**(optional)** Enable if the COSE CBOR Tag such as, `COSE_Mac0` is added when the token is generated.  \n  \nRefer to the [CBOR Object Signing and Encryption (COSE)](https://datatracker.ietf.org/wg/cose/about/) for more details on tags.  \n  \nCurrently only `Tag COSE_Mac0` and `COSE_Sign1` are supported.",
    "1-3": "true",
    "1-4": "Error(`Invalid cwtOptions: isCoseCborTagAdded must be boolean`)",
    "2-0": "headerValidation",
    "2-1": "Boolean",
    "2-2": "**(optional)** Indicates if the CWT header needs to be validated.",
    "2-3": "false",
    "2-4": "Error(`Invalid cwtOptions: headerValidation must be boolean`)",
    "3-0": "issuer",
    "3-1": "String",
    "3-2": "**(optional)** The issuer to check with an `iss` claim in the CWT payload.",
    "3-3": "",
    "3-4": "Error(`Invalid cwtOptions: issuer must be non empty string`)",
    "4-0": "subject",
    "4-1": "String",
    "4-2": "**(optional)** The subject to check with a `sub` claim in the CWT payload.",
    "4-3": "",
    "4-4": "Error(`Invalid cwtOptions: subject must be non empty string`)",
    "5-0": "audience",
    "5-1": "String",
    "5-2": "**(optional)** The audience to check with an `aud` claim in the CWT payload.",
    "5-3": "",
    "5-4": "Error(`Invalid cwtOptions: audience must be non empty string or array`)",
    "6-0": "ignoreExpiration",
    "6-1": "Boolean",
    "6-2": "**(optional)** If false, validate the expiry of the token.",
    "6-3": "true",
    "6-4": "Error(`Invalid cwtOptions: ignoreExpiration must be boolean`)",
    "7-0": "ignoreNotBefore",
    "7-1": "Boolean",
    "7-2": "**(optional)** If false, validate the `not before` claim of the token.",
    "7-3": "true",
    "7-4": "Error(`Invalid cwtOptions: ignoreNotBefore must be boolean`)",
    "8-0": "clockTolerance",
    "8-1": "Number",
    "8-2": "**(optional)** Number of seconds to tolerate when checking the `nbf` and `exp` claims.",
    "8-3": "60 seconds",
    "8-4": "Error(`Invalid cwtOptions: clockTolerance must be number`)"
  },
  "cols": 5,
  "rows": 9,
  "align": [
    "left",
    "left",
    "left",
    "left",
    "left"
  ]
}
[/block]


# CWTJSON Object

Holds cwt header and payload in JSON format.

## Header

| Parameter | Type   | Description                                                                                                                                                                            |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| p         | Object | Protected header fields in JSON.  Refer to the **Header Parameters** section in the  [CBOR Object Signing and Encryption (COSE](https://datatracker.ietf.org/doc/rfc8152) document.    |
| u         | Object | Unprotected header fields in JSON.  Refer to the **Header Parameters** section in the  [CBOR Object Signing and Encryption (COSE)](https://datatracker.ietf.org/doc/rfc8152) document. |

## Payload

The set of claims from the CWT token as a JSON object. Refer to the Claims section in the [CWT spec](https://datatracker.ietf.org/doc/html/rfc8392#page-5) for more information.

## async validate()

Performs the CBOR decoding of the CWT token and validates the signature. Returns a `promise<CWTJSON>` if the signature validation is successful, otherwise throws an error. 

```javascript
async validate( tokenBuf: Uint8Array, keys: CryptoKey[], externalAAD?: Uint8Array)
```

| Parameter   | Type  | Description                                                                                                                           |
| :---------- | :---- | :------------------------------------------------------------------------------------------------------------------------------------ |
| tokenBuf    |       | CWT token in binary format such as, Uint8Array.                                                                                       |
| keys        | Array | An array of CryptoKeys used for verification. A token is valid if its signature is verifiable by any one key.                         |
| externalAAD |       | Externally supplied data in binary such as, Uint8Array that needs to be authenticated and is not carried as part of the COSE message. |

# CWTUtil

## claimsTranslate()

Translates the payload with integer keys to map with string keys using the `labelsMaps` mapping and `translators` functions. Returns an instance of a JSON object where keys are string.

```javascript
claimsTranslate( payload: any, labelsMap: { [key: number | string]: string }, translators?: { [key: string]: Function })
```

[block:parameters]
{
  "data": {
    "h-0": "",
    "h-1": "",
    "h-2": "",
    "0-0": "payload",
    "0-1": "CWT payload         ",
    "0-2": "CWT payload from the CWT JSON object obtained upon successful verification.",
    "1-0": "labelsMap",
    "1-1": "JSON object",
    "1-2": "Map of integer keys that needs to be translated to string keys.  \nThis will translate integer keys from a CWT payload to a JSON object containing string keys. Refer to the example below. ",
    "2-0": "translators",
    "2-1": "JSON object",
    "2-2": "(optional) Contains the field with the `translator` function mapping. Refer to the example below."
  },
  "cols": 3,
  "rows": 3,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


```javascript
//CWT payload obtained after successfull verification
payload = { 1: 'john@issuer', 2: 'akamai@subject', 7: Uint8Array([72, 83, 50, 53, 54])}

//Traslation of integer keys to string keys
labelsMap = { 1: 'iss', 2: 'sub', 3: 'aud', 4: 'exp', 5: 'nbf', 6: 'iat', 7: 'cti' }

//Translation of value for each string keys
translators = { cti: (input: Uint8Array) => TextDecoder().decode(input)}

//Ouput of claimsTranslate function
outputs = { 'iss': 'john@issuer', 'sub': akamai@subject, 'cti': 'HS256' }
```
