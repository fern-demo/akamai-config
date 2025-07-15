---
title: "Response Object (COPY)"
slug: "response-object-copy"
excerpt: ""
hidden: true
createdAt: "Tue Dec 10 2024 14:22:43 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Dec 17 2024 12:53:32 GMT+0000 (Coordinated Universal Time)"
---
The response object represents the HTTP response and includes key:value pairs for the status and headers. Response headers can only be modified during the `onClientResponse` and `onOriginResponse`events.

<!--To prevent a 500 error response, limit the body string length to 2000 characters. If called multiple times, the event handler uses the most recent response.....-->

# Properties

## status

The status code of the HTTP response sent to the client. 

```javascript
// HTTP/1.1 200
response.status;
// => 200
```

> 📘 You can set the return value of the response.status field to a **2xx Success**, **3xx Redirection**, **4xx Client Error**, or **5xx Server Error** status code.

# Methods

The following methods are available for the EdgeWorkers response objects.

| Methods                                            | onClient Request | onOrigin Request | onOrigin Response | onClient Response | response Provider |
| :------------------------------------------------- | :--------------- | :--------------- | :---------------- | :---------------- | :---------------- |
| [addHeader()](doc:response-object#addheader)       |                  |                  | ✓                 | ✓                 |                   |
| [getHeader()](doc:response-object#getheader)       |                  |                  | ✓                 | ✓                 |                   |
| [getHeaders()](doc:response-object#getheaders)     |                  |                  | ✓                 | ✓                 |                   |
| [removeHeader()](doc:response-object#removeheader) |                  |                  | ✓                 | ✓                 |                   |
| [setHeader()](doc:response-object#setheader)       |                  |                  | ✓                 | ✓                 |                   |

## addHeader()

Adds names and values to a header. If the header already exists, the name and value are appended. 

### Parameters

```javascript
addHeader(name, value)
```

Review the table for information about the available parameters.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "name",
    "0-1": "String",
    "0-2": "Name of the header  \nShould conform to [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110) character constraints for header names",
    "1-0": "value",
    "1-1": "String or Array",
    "1-2": "Header value(s) to add  \nSupports UTF-8 encoded characters with the exception of [C0 controls](https://www.unicode.org/charts/PDF/U0000.pdf)"
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


```javascript
//
response.addHeader('Powered-By','Akamai EdgeWorkers');
// Powered-By: Akamai EdgeWorkers
```

```javascript
// Powered-By: Akamai EdgeWorkers
response.addHeader('Powered-By','Akamai ION');
// Powered-By: Akamai ION 
// Powered-By: Akamai EdgeWorkers
```

## getHeader()

Returns an array of header values by header name. The header names are case insensitive. If the header doesn't exist, a value of `undefined` is returned.

### Parameters

```javascript
getHeader(name)
```

Review the table for information about the available parameters.

| Parameter | Type  | Description                       |
| :-------- | :---- | :-------------------------------- |
| name      | Array | Names of the headers in the array |

```javascript
// Content-Length: 100
response.getHeader('Content-Length')[0];
// => "100"
```

## getHeaders()

Returns a JavaScript object that contains all HTTP response headers as properties.

The key for each property is the name of the HTTP header, normalized to lower-case. The value is an array of strings, containing one string for each HTTP header with the same name.

```javascript
export function onClientResponse(request, response) {
    const keys = Object.keys(response.getHeaders()).join();
    request.respondWith(222, {}, `response headers: ${keys}`)
}
// => Output depends on the response from origin, but it could look like:
// "response headers: vary,content-encoding,content-type,connection"
```

## removeHeader()

Removes the named header. The header name is case insensitive.

### Parameters

```javascript
removeHeader(name)
```

Review the table for information about the available parameters.

| Parameter | Type   | Description                  |
| :-------- | :----- | :--------------------------- |
| name      | String | Name of the header to remove |

```javascript
// Debug: Debug Info
response.removeHeader('Debug');
//
```

## setHeader()

Sets header values and replaces previous ones. Defines the new header `name`. The `value` can be a single string or an array.

### Parameters

```javascript
setHeader(name, value)
```

Review the table for information about the available parameters.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "name",
    "0-1": "String",
    "0-2": "Name of the header  \nShould conform to [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110) character constraints for header names",
    "1-0": "value",
    "1-1": "String or Array",
    "1-2": "Value of the new header(s)  \nSupports UTF-8 encoded characters with the exception of [C0 controls](https://www.unicode.org/charts/PDF/U0000.pdf)"
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


```javascript
// Powered-By: bar
response.setHeader('Powered-By','Akamai EdgeWorkers');
// Powered-By: Akamai EdgeWorkers
```
