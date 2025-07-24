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
| Parameter | Type | Description | Default Value | Exceptions |
| --- | --- | --- | --- | --- |
| isCWTTagAdded | Boolean | **(optional)** Enable if the CWT CBOR Tag (61) is added when the token is generated.<br/><br/>Refer to the [CBOR Web Token Internet Standards](https://www.rfc-editor.org/rfc/rfc8392.html) for more details on tags. | false | Error(`Invalid cwtOptions: isCWTTagAdded must be boolean`) |
| isCoseCborTagAdded | Boolean | **(optional)** Enable if the COSE CBOR Tag such as, `COSE_Mac0` is added when the token is generated.<br/><br/>Refer to the [CBOR Object Signing and Encryption (COSE)](https://datatracker.ietf.org/wg/cose/about/) for more details on tags.<br/><br/>Currently only `Tag COSE_Mac0` and `COSE_Sign1` are supported. | true | Error(`Invalid cwtOptions: isCoseCborTagAdded must be boolean`) |
| headerValidation | Boolean | **(optional)** Indicates if the CWT header needs to be validated. | false | Error(`Invalid cwtOptions: headerValidation must be boolean`) |
| issuer | String | **(optional)** The issuer to check with an `iss` claim in the CWT payload. |  | Error(`Invalid cwtOptions: issuer must be non empty string`) |
| subject | String | **(optional)** The subject to check with a `sub` claim in the CWT payload. |  | Error(`Invalid cwtOptions: subject must be non empty string`) |
| audience | String | **(optional)** The audience to check with an `aud` claim in the CWT payload. |  | Error(`Invalid cwtOptions: audience must be non empty string or array`) |
| ignoreExpiration | Boolean | **(optional)** If false, validate the expiry of the token. | true | Error(`Invalid cwtOptions: ignoreExpiration must be boolean`) |
| ignoreNotBefore | Boolean | **(optional)** If false, validate the `not before` claim of the token. | true | Error(`Invalid cwtOptions: ignoreNotBefore must be boolean`) |
| clockTolerance | Number | **(optional)** Number of seconds to tolerate when checking the `nbf` and `exp` claims. | 60 seconds | Error(`Invalid cwtOptions: clockTolerance must be number`) |


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
|  |  |  |
| --- | --- | --- |
| payload | CWT payload          | CWT payload from the CWT JSON object obtained upon successful verification. |
| labelsMap | JSON object | Map of integer keys that needs to be translated to string keys.<br/>This will translate integer keys from a CWT payload to a JSON object containing string keys. Refer to the example below.  |
| translators | JSON object | (optional) Contains the field with the `translator` function mapping. Refer to the example below. |


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
