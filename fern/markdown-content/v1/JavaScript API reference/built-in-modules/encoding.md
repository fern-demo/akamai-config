---
title: "encoding"
slug: "encoding"
excerpt: ""
hidden: false
createdAt: "Tue Oct 04 2022 15:19:37 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Mar 12 2024 13:04:16 GMT+0000 (Coordinated Universal Time)"
---
The encoding module is available to use in your EdgeWorkers code bundles to handle text in various [character encodings](https://developer.mozilla.org/en-US/docs/Glossary/character_encoding), including legacy non-[UTF-8](https://developer.mozilla.org/en-US/docs/Glossary/UTF-8).

# TextEncoder Object

The TextEncoder object takes a stream of code points as input and emits a stream of UTF-8 bytes.

This example takes a string and converts it to a Uint8Array array of bytes. The string representation of the array is returned as the body. 

```javascript
import {TextEncoder} from 'encoding';
  
export function onClientRequest(request) {
       
    let encoded = new TextEncoder().encode("This is a sample paragraph."); // produces Uint8Array[84,104,105,115,32,105,115,32,97,32,115,97,109,112,108,101,32,112,97,114,97,103,114,97,112,104,46]
      
    let encoded_as_binary_string = encoded.toString(); // produces the string "84,104,105,115,32,105,115,32,97,32,115,97,109,112,108,101,32,112,97,114,97,103,114,97,112,104,46"
  
    request.respondWith(200, {}, encoded);
}
```

# TextEncoder methods

## TextEncoder()

Constructor for a new `TextEncoder` object.

## encode()

Converts the input string into a stream of UTF-8 bytes and returns a Uint8Array containing UTF-8 encoded text. The available argument is a String to encode.

| Parameter | Type   | Description         |
| :-------- | :----- | :------------------ |
| text      | String | A string to encode. |

# TextEncoder properties

## encoding

The name of the encoding algorithm used by the specific encoder. This is a read-only string UTF-8 value.

# TextDecoder Object

The TextDecoder Object represents a decoder for a specific text encoding, such as UTF-8, ISO-8859-2, KOI8-R, and GBK. A decoder takes a stream of bytes as input and emits a stream of code points. 

The following example takes a Uint8Array array of bytes and decodes it into the original string.

```javascript
import { TextDecoder } from 'encoding';
  
export function onClientRequest(request) {
    let decoder = new TextDecoder();
  
    let data = new Uint8Array([84,104,105,115,32,105,115,32,97,32,115,97,109,112,108,101,32,112,97,114,97,103,114,97,112,104,46]);
    let text = decoder.decode(data); // decodes to the string "This is a sample paragraph."
  
    request.respondWith(231, {}, text);
}
```

This example demonstrates how to decode data that's provided in chunks.

> 📘 The stream: true  is passed into the `decode()` method when you push chunks one by one, and the parameter is missing in the last call to `decode()` .

```javascript
import { TextDecoder } from 'encoding';

export async function onClientRequest(request) {
    let decoder = new TextDecoder();
    let output = "";
 
    // Push first chunk
    output += decoder.decode(new Uint8Array([0xE2, 0x82]), {stream: true});
 
    // Push second chunk
    output += decoder.decode(new Uint8Array([0xAC]), {stream: true});
 
    // Pass no arguments to decode(), indicating that there are no more chunks, and finish the decoding
    output += decoder.decode(); // produces "€"
    request.respondWith(201, {}, output);
}
```

# TextDecoder methods

## TextDecoderOptions dictionary

If the specified value is not a Boolean, it's converted to Boolean.

| Key       | Optional | Value   | Default value |
| :-------- | :------- | :------ | :------------ |
| fatal     | Yes      | Boolean | false         |
| ignoreBOM | Yes      | Boolean | false         |

## TextDecoder()

Constructs a new `TextDecoder` object.

| Parameter | Type   | Description                                                            |
| :-------- | :----- | :--------------------------------------------------------------------- |
| utfLabel  | String | **Optional ** Represents the encoding to be used. Defaults to "UTF-8". |
| options   |        | **Optional** The `TextDecoderOption` dictionary.                       |

## decode()

Returns a string containing the text decoded with the method of the specific `TextDecoder` object.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Description",
    "h-2": "Type",
    "0-0": "buffer",
    "0-1": "ArrayBuffer,  \nTypedArray,  \nor DataView object",
    "0-2": "**Optional** Contains the text to decode.",
    "1-0": "options",
    "1-1": "",
    "1-2": "**Optional** An object with the property:  \n**stream**: A boolean flag indicating that additional data will follow in subsequent calls to `decode()`. Set to `true` to process the data in chunks. By default, set to `false` for the final chunk or if the data is not chunked."
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


# TextDecoder properties

> 📘 Whitespaces are ignored in all `TextDecoder` functions.

## fatal

The fatal `flag` passed into the constructor. This is a read-only Boolean value. 

## ignoreBOM

The `ignoreBOM` flag passed into the constructor. This is a read-only Boolean value.

## encoding

The name of the decoder describing the method that the `TextDecoder` will use. This is a read-only String value.

# encoding methods

## atob()

Takes a string of base64 encoded data and returns a decoded ASCII binary string.

```javascript
import { atob } from "encoding";

let decodedData = atob(encodedData)
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "encodedData",
    "0-1": "String",
    "0-2": "A binary string containing the encoded data.  \n  \nReturns decodedData as a binary string. A binary string is an ASCII string containing decoded data from encodedData.  \n  \nAn InvalidCharactorError (DOMException) is thrown if the `encodedData` is not valid base64."
  },
  "cols": 3,
  "rows": 1,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## btoa()

Takes a string, performs a base64 encoding on it and returns an ASCII string.

```javascript
import { btoa } from "encoding";

let encodedData = btoa(stringToEncode)
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "stringToEncode",
    "0-1": "String",
    "0-2": "The [binary string](https://developer.mozilla.org/en-US/docs/Web/API/btoa#unicode_strings) to encode.  \n  \nReturns encodedData as a binary string. A binary string is an ASCII string containing the base64 representation of the stringToEncode.  \n  \nAn InvalidCharactorError (DOMException) occurs if the string contains a character that did not fit in a single byte."
  },
  "cols": 3,
  "rows": 1,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## base64

The `base64` object provides the `base64 decoding`  and the `base64 encoding` method.

### base64.decode()

The `decode()` method takes a base64 encoded string and by default, returns an Uint8Array of bytes. You can specify the output format.

```javascript
let bytesBuffer = base64.decode(encodedData[, outputFormat])
```

The return value depends on the outputFormat. If you specify bytesBuffer: Uint8Array - the decoded bytes are returned in an Uint8Array. If you specify string: A primitive string, containing the decoded bytes in each character.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "encodedData: String",
    "0-1": "String",
    "0-2": "A base64 encoded string.",
    "1-0": "outputFormat",
    "1-1": "String",
    "1-2": "**(optional)** The output format.  \n  \nApplicable formats:  \n  \n\"Uint8Array\" - Uint8Array. This is the default format.  \n\"String\" - String."
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


### base64.encode()

The `encode()` method takes a Uint8Array of bytes and returns an encoded base64 string.

```javascript
let encodedString = base64.encode(dataToBeEncoded)
```

 The return value is a primitive string, containing the encoded bytes in each character.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "dataToBeEncoded",
    "0-1": "Uint8Array",
    "0-2": "Data to be encoded in bytes.  \n  \nAn exception will occur when more than one argument is provided or a v8 encoded string cannot be created."
  },
  "cols": 3,
  "rows": 1,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## base64url

The base64url object provides the `base64url decoding` method and the `base64url encoding` method.

### base64url.decode()

The `decode()` method takes a base64url encoded string and returns an Uint8Array of bytes (default format). You can also specify an optional argument for output format to obtain the desired output type. 

Return value depends on the outputFormat:

bytesBuffer: Uint8Array - the decoded bytes in an Uint8Array. 

or

string: A primitive string, containing the decoded bytes in each character. 

```javascript
let bytesBuffer =  base64url.decode(encodedData[, outputFormat])
```

[block:parameters]
{
  "data": {
    "h-0": "Parameters",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "encodedData",
    "0-1": "String",
    "0-2": "A base64url encoded string.  \n  \nAn InvalidCharactorError (DOMException) occurs when the str argument is not a valid base64url string. An `ExecutionError` is also thrown.",
    "1-0": "outputFormat",
    "1-1": "String",
    "1-2": "(optional) String - the output format.  \n  \nApplicable formats:  \n  \n\"Uint8Array\" - Uint8Array. This is the default format.  \n\"String\" - String.  \n  \nAn InvalidCharactorError (DOMException) occurs when the str argument is not a valid base64url string. An `ExecutionError` is also thrown."
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


### base64url.encode()

The `encode()` method takes a Uint8Array of bytes and returns an encoded base64url String.  

```javascript
let encodedString =  base64url.encode(dataToBeEncoded)
```

[block:parameters]
{
  "data": {
    "h-0": "Parameters",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "dataToBeEncoded",
    "0-1": "String",
    "0-2": "A primitive string, containing the encoded bytes in each character.  \n  \nAn exception will occur when more than one argument is provided or a v8 encoded string cannot be created."
  },
  "cols": 3,
  "rows": 1,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## base16

Base16 encoding is the standard case-insensitive hex encoding and may be referred to as "base16" or "hex".

### base16.decode()

The `base16.decode()` method takes a base16 encoded string and returns a Uint8Array of bytes. 

You can also specify the outputFormat to obtain the desired output type.

- bytesBuffer: Uint8Array - the decoded bytes in an Uint8Array.

- string: A primitive string, containing the decoded bytes in each character. 

```javascript
let bytesBuffer =  base16.decode(encodedData[, outputFormat])
```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "encodedData",
    "0-1": "String",
    "0-2": "Base16 encoded string.  \n  \nAn InvalidCharactorError (DOMException) occurs when the str argument is not a valid base16 string. An `ExecutionError` is also thrown.",
    "1-0": "outputFormat",
    "1-1": "String",
    "1-2": "(optional) The output format.  \nApplicable formats are:  \n**Uint8Array** - Uint8Array. This is the default format  \n**String** - String  \n  \nAn InvalidCharactorError (DOMException) occurs when the str argument is not a valid base16 string. An `ExecutionError` is also thrown."
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


### base16.encode()

The `base16.encode()` method takes an Uint8Array of bytes and returns an encoded base16 String.

```javascript
let encodedString = base16.encode(dataToBeEncoded)
```

[block:parameters]
{
  "data": {
    "h-0": "Parameters",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "dataToBeEncoded",
    "0-1": "Uint8Array",
    "0-2": "A primitive string, containing the encoded bytes in each character.  \n  \nAn exception will occur when more than one argument is provided or a v8 encoded string cannot be created."
  },
  "cols": 3,
  "rows": 1,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]
