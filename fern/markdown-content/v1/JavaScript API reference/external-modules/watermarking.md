---
title: "watermarking"
slug: "watermarking"
excerpt: ""
hidden: false
createdAt: "Wed Feb 01 2023 13:31:47 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Mar 11 2025 12:49:28 GMT+0000 (Coordinated Universal Time)"
---
This module is available to use in your EdgeWorkers code bundles to perform operations related to forensic watermarking for Over-The-Top (OTT) content delivered in an Adaptive Bitrate (ABR) format. The watermarking module adheres to the [DASH-IF](https://dashif.org) watermarking specification. [jwt](https://techdocs.akamai.com/edgeworkers/docs/jwt) and [cwt](https://techdocs.akamai.com/edgeworkers/docs/cwt) modules are supported for token verification.

> 📘 Currently there is a known compatibility issue between partial object caching and the watermarking module. Reach out to your account team for more information.

You can use the watermarking module in both direct and indirect mode. For indirect mode, you need to obtain vendor specific `wmid` generator code and plug it into the module. Refer to the [wm-indirect](https://github.com/akamai/edgeworkers-examples/tree/master/delivery/media/watermarking/examples/wm-indirect) example in the EdgeWorkers GitHub repo for more details.

> 👍 To use the watermarking library you need to use [EdgeWorkers Dynamic Compute](ref:resource-tiers) resource tier.

# Watermarking

Constructor for a new `Watermarking` Object. It performs type checks on the `wmOptions` Object parameters.

```javascript
Watermarking(wmOptions: WMOptions,  vendorAlgorithms: Map<string,VendorAlgorithm> )
```

Throws an error if the type checks fail for the following `wmOptions` parameters.

## WMOptions Object

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "h-3": "Default Value                                                                                                                              ",
    "0-0": "tokenType",
    "0-1": "enum",
    "0-2": "The type of auth token.",
    "0-3": "'JWT' for JWT tokens  \nor  \n'CWT' for CWT tokens",
    "1-0": "issuer",
    "1-1": "String",
    "1-2": "(optional) The issuer to check with an `iss` claim in the JWT payload.",
    "1-3": "",
    "2-0": "subject",
    "2-1": "String",
    "2-2": "(optional) The subject to check with a `sub` claim in the JWT payload.",
    "2-3": "",
    "3-0": "audience",
    "3-1": "String",
    "3-2": "(optional) The audience to check with an `aud` claim in the JWT payload.",
    "3-3": "",
    "4-0": "ignoreExpiration",
    "4-1": "Boolean",
    "4-2": "(optional) If false, validate the expiry of the token.",
    "4-3": "true",
    "5-0": "ignoreNotBefore",
    "5-1": "Boolean",
    "5-2": "(optional) If false, validate the not before claim of the token.",
    "5-3": "true",
    "6-0": "allowUnsecuredToken",
    "6-1": "Boolean",
    "6-2": "(optional) If true, Unsecured JWT tokens are supported.  \nFor example, `alg = NONE`  \nIf false, throws an unsupported unsecured JWT tokens error whenever unsecured JWT tokens are passed.",
    "6-3": "false",
    "7-0": "clockTolerance",
    "7-1": "Number",
    "7-2": "(optional) Number of seconds to tolerate when checking the `nbf` and exp claims.",
    "7-3": "60 seconds",
    "8-0": "isCWTTagAdded",
    "8-1": "Boolean",
    "8-2": "(optional) Adds a CWT tag to the token. Applies only for CWT based tokens.",
    "8-3": "false",
    "9-0": "isCoseCborTagAdded",
    "9-1": "Boolean",
    "9-2": "(optional) Adds a COSE message structure tag to the generated CWT token. This only applies to CWT based tokens. Currently only the `COSE_MAC0` structure is supported with the `HS256-256` algorithm.",
    "9-3": "true",
    "10-0": "headerValidation",
    "10-1": "Boolean",
    "10-2": "(optional) Specifies if the protected header of a CWT token needs to be validated. This is applicable only for CWT based tokens.",
    "10-3": "false"
  },
  "cols": 4,
  "rows": 11,
  "align": [
    "left",
    "left",
    "left",
    "left"
  ]
}
[/block]


## vendorAlgorithms

A map with key as the vendor identifier. This should be the same as the  `wmvnd` field from the watermarking token. The value should be an implementation of the vendor-algorithm interface shown below. Refer to the [Indirect Watermarking](https://github.com/akamai/edgeworkers-examples/tree/master/delivery/media/watermarking/examples/wm-indirect) example for more details.

```javascript
/**
 * Abstract class to implement vendor specific algorithm to generate tmid.
 */
interface VendorAlgorithm {
    /**
     * Returns the generated WMID after executing vendor specific algorithm.
     * @param payload @instance of WMPaylaod.
     * @param secretKey key (if any) required to generate WMID. 
     * @returns WMID as hex string
     */
    generateTmid(payload: WMPayload, secretKey: string): Promise<string>;
}
```

# validateToken

Validates the watermarking token as per the validation rules, performs signature verification for each key from the  array. The token signature needs to be successfully verified by at least one key to consider the token as valid.

Returns a `promise<WMJSON>` upon successful verification of the token, otherwise throws an error. 

```javascript
validateToken( authToken: Uint8Array | string, keys: string[], keyAlg: string )
```

Throws a [DOMException](https://developer.mozilla.org/en-US/docs/Web/API/DOMException) or a [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) when trying to use invalid key data, when the key is not a supported key for the  algorithm, or when trying to use an algorithm that is either unknown or isn't suitable for a verify operation.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "authToken",
    "0-1": "String or binary",
    "0-2": "Watermarking token, JWT or CWT.  \nJWT token must be passed as a string.  \nCWT token can be passed as binary (Uint8Array) or a hex encoded string.",
    "1-0": "keys",
    "1-1": "Array of strings",
    "1-2": "Symmetric or public keys to use for signature verification.  \nSymmetric keys must be passed as hex string.  \nPublic keys must be passed as PEM encoded string.",
    "2-0": "keyAlg",
    "2-1": "String",
    "2-2": "The algorithm used to generate the keys."
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


## WMJSON

JSON object containing the header and payload.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "header",
    "0-1": "JWTHeader | CWT header",
    "0-2": "Refer [JWT Header ](https://techdocs.akamai.com/edgeworkers/docs/jwt#jwtheader)for more details.  \nRefer [CWT Header](https://techdocs.akamai.com/edgeworkers/docs/cwt#header) for more details.",
    "1-0": "payload",
    "1-1": "WMPayload",
    "1-2": "JSON object containing watermarking claims"
  },
  "cols": 3,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## WMPayload

Contains watermarking fields in addition to fields from the CWT and JWT payload. Refer to [CWT](https://techdocs.akamai.com/edgeworkers/docs/cwt#payload) or [JWT](https://techdocs.akamai.com/edgeworkers/docs/jwt#jwtpayload) payload for details about other fields. 

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "wmver",
    "0-1": "Number",
    "0-2": "Version of the Watermarking Token.",
    "1-0": "wmvnd",
    "1-1": "Number",
    "1-2": "Watermarking vendor identification.",
    "2-0": "wmpatlen",
    "2-1": "Number",
    "2-2": "Provides the length of `wmpattern` extracted or derived from `wmid`.",
    "3-0": "wmid",
    "3-1": "String",
    "3-2": "(optional) Specifies indirect mode. It is used as input to derive the WM pattern. The derivation algorithm is not defined in this document and is vendor specific.",
    "4-0": "wmpattern",
    "4-1": "Uint8Array",
    "4-2": "(optional) Specifies direct mode. The value is bytes of `COSE_Encrypt0 `message structure. Refer to the [COSE spec](https://datatracker.ietf.org/doc/rfc8152/) for more details on generating `COSE_Encrypt0` message. ",
    "5-0": "wmsegduration",
    "5-1": "Array<Number>",
    "5-2": "(optional) Nominal duration of a segment. ",
    "6-0": "wmopid",
    "6-1": "Number",
    "6-2": "(optional) Required only for indirect mode. It may provide additional data for the vendor specific derivation algorithm that generates the WM pattern",
    "7-0": "wmkeyver",
    "7-1": "Number",
    "7-2": "(optional) Identifies the key to use to derive and decrypt the WM pattern.  \n  \n**Note:** This field is currently ignored. The derive and decrypt key is passed to the `getWMPathWithVariant()` function directly. "
  },
  "cols": 3,
  "rows": 8,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


# getWMPathWithVariant

Executes the relevant vendor algorithm (indirect) or performs decryption (direct) to generate the watermarking variant. Once the `wmid` is obtained from the token (either directly, decrypted or calculated), the CDN edge enforces big-endian convention to address a single bit in it when using the value of position obtained from side car file. 

The following is an example with a WM pattern equal to 0x0A0B0C0D.

|            |          |          |          |          |
| :--------- | :------- | :------- | :------- | :------- |
| Byte       | 0        | 1        | 2        | 3        |
| bit offset | 01234567 | 01234567 | 01234567 | 01234567 |
| binary     | 00001010 | 00001011 | 00001100 | 00001101 |
| hex        | 0A       | 0B       | 0C       | 0D       |

For a value of position equal to 3, the bit to consider is highlighted in green (equal to 0). This is not any other bit,  
especially, those highlighted in red.

Returns a `promise<number>` representing the computed watermarking variant.

```javascript
getWMPathWithVariant(
    path: string,
    payload: WMPayload,
    secretKey: string,
    rangeHeader?: string
  ): Promise<number>
```

Throws an error if the type checks fails for the following parameters or if any validation check fails.

Throws a [DOMException](https://developer.mozilla.org/en-US/docs/Web/API/DOMException) or a [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) when trying to use invalid key data, when the key is not a supported key for the algorithm, or when trying to use an algorithm that is either unknown or isn't suitable for a verify operation.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "path",
    "0-1": "String",
    "0-2": "The url path from the request. For example, `request.path`.",
    "1-0": "payload",
    "1-1": "WMPayload",
    "1-2": "Contains watermarking fields in addition to fields from the CWT and JWT payload. See **WMPayload** object definition above.",
    "2-0": "secretKey",
    "2-1": "Hex encoded string",
    "2-2": "Secret key if required to either perform decryption of `wmpattern` or required in the vendor algorithm to generate a watermarking identifier.",
    "3-0": "rangeHeader",
    "3-1": "String",
    "3-2": "(optional)  The requested byte range.  \n  \nUse the format `bytes=<range-start>-<range-end>`  \nFor example, bytes=200-1000."
  },
  "cols": 3,
  "rows": 4,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]
