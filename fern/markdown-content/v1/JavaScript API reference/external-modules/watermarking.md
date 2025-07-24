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
| Parameter | Type | Description | Default Value                                                                                                                               |
| --- | --- | --- | --- |
| tokenType | enum | The type of auth token. | 'JWT' for JWT tokens<br/>or<br/>'CWT' for CWT tokens |
| issuer | String | (optional) The issuer to check with an `iss` claim in the JWT payload. |  |
| subject | String | (optional) The subject to check with a `sub` claim in the JWT payload. |  |
| audience | String | (optional) The audience to check with an `aud` claim in the JWT payload. |  |
| ignoreExpiration | Boolean | (optional) If false, validate the expiry of the token. | true |
| ignoreNotBefore | Boolean | (optional) If false, validate the not before claim of the token. | true |
| allowUnsecuredToken | Boolean | (optional) If true, Unsecured JWT tokens are supported.<br/>For example, `alg = NONE`<br/>If false, throws an unsupported unsecured JWT tokens error whenever unsecured JWT tokens are passed. | false |
| clockTolerance | Number | (optional) Number of seconds to tolerate when checking the `nbf` and exp claims. | 60 seconds |
| isCWTTagAdded | Boolean | (optional) Adds a CWT tag to the token. Applies only for CWT based tokens. | false |
| isCoseCborTagAdded | Boolean | (optional) Adds a COSE message structure tag to the generated CWT token. This only applies to CWT based tokens. Currently only the `COSE_MAC0` structure is supported with the `HS256-256` algorithm. | true |
| headerValidation | Boolean | (optional) Specifies if the protected header of a CWT token needs to be validated. This is applicable only for CWT based tokens. | false |


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
| Parameter | Type | Description |
| --- | --- | --- |
| authToken | String or binary | Watermarking token, JWT or CWT.<br/>JWT token must be passed as a string.<br/>CWT token can be passed as binary (Uint8Array) or a hex encoded string. |
| keys | Array of strings | Symmetric or public keys to use for signature verification.<br/>Symmetric keys must be passed as hex string.<br/>Public keys must be passed as PEM encoded string. |
| keyAlg | String | The algorithm used to generate the keys. |


## WMJSON

JSON object containing the header and payload.
| Parameter | Type | Description |
| --- | --- | --- |
| header | JWTHeader | CWT header | Refer [JWT Header ](https://techdocs.akamai.com/edgeworkers/docs/jwt#jwtheader)for more details.<br/>Refer [CWT Header](https://techdocs.akamai.com/edgeworkers/docs/cwt#header) for more details. |
| payload | WMPayload | JSON object containing watermarking claims |


## WMPayload

Contains watermarking fields in addition to fields from the CWT and JWT payload. Refer to [CWT](https://techdocs.akamai.com/edgeworkers/docs/cwt#payload) or [JWT](https://techdocs.akamai.com/edgeworkers/docs/jwt#jwtpayload) payload for details about other fields. 
| Parameter | Type | Description |
| --- | --- | --- |
| wmver | Number | Version of the Watermarking Token. |
| wmvnd | Number | Watermarking vendor identification. |
| wmpatlen | Number | Provides the length of `wmpattern` extracted or derived from `wmid`. |
| wmid | String | (optional) Specifies indirect mode. It is used as input to derive the WM pattern. The derivation algorithm is not defined in this document and is vendor specific. |
| wmpattern | Uint8Array | (optional) Specifies direct mode. The value is bytes of `COSE_Encrypt0 `message structure. Refer to the [COSE spec](https://datatracker.ietf.org/doc/rfc8152/) for more details on generating `COSE_Encrypt0` message.  |
| wmsegduration | Array | (optional) Nominal duration of a segment.  |
| wmopid | Number | (optional) Required only for indirect mode. It may provide additional data for the vendor specific derivation algorithm that generates the WM pattern |
| wmkeyver | Number | (optional) Identifies the key to use to derive and decrypt the WM pattern.<br/><br/>**Note:** This field is currently ignored. The derive and decrypt key is passed to the `getWMPathWithVariant()` function directly.  |


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
| Parameter | Type | Description |
| --- | --- | --- |
| path | String | The url path from the request. For example, `request.path`. |
| payload | WMPayload | Contains watermarking fields in addition to fields from the CWT and JWT payload. See **WMPayload** object definition above. |
| secretKey | Hex encoded string | Secret key if required to either perform decryption of `wmpattern` or required in the vendor algorithm to generate a watermarking identifier. |
| rangeHeader | String | (optional)  The requested byte range.<br/><br/>Use the format `bytes=<range-start>-<range-end>`<br/>For example, bytes=200-1000. |
