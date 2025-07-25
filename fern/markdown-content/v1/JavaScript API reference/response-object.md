---
title: "Response Object"
slug: "response-object"
excerpt: ""
hidden: false
createdAt: "Tue May 04 2021 22:12:21 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Dec 17 2024 13:11:54 GMT+0000 (Coordinated Universal Time)"
---
The response object represents the HTTP response and includes key:value pairs for the status and headers. Response headers can only be modified during the `onClientResponse` and `onOriginResponse`events.


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
| [addHeader()](response-object.md#addheader)       |                  |                  | ✓                 | ✓                 |                   |
| [getHeader()](response-object.md#getheader)       |                  |                  | ✓                 | ✓                 |                   |
| [getHeaders()](response-object.md#getheaders)     |                  |                  | ✓                 | ✓                 |                   |
| [removeHeader()](response-object.md#removeheader) |                  |                  | ✓                 | ✓                 |                   |
| [setHeader()](response-object.md#setheader)       |                  |                  | ✓                 | ✓                 |                   |

## addHeader()

Adds names and values to a header. If the header already exists, the name and value are appended. 

### Parameters

```javascript
addHeader(name, value)
```

Review the table for information about the available parameters.
| Parameter | Type | Description |
| --- | --- | --- |
| name | String | Name of the header<br/>Should conform to [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110) character constraints for header names |
| value | String or Array | Header value(s) to add<br/>Supports UTF-8 encoded characters with the exception of [C0 controls](https://www.unicode.org/charts/PDF/U0000.pdf) |


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
| Parameter | Type | Description |
| --- | --- | --- |
| name | String | Name of the header<br/>Should conform to [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110) character constraints for header names |
| value | String or Array | Value of the new header(s)<br/>Supports UTF-8 encoded characters with the exception of [C0 controls](https://www.unicode.org/charts/PDF/U0000.pdf) |


```javascript
// Powered-By: bar
response.setHeader('Powered-By','Akamai EdgeWorkers');
// Powered-By: Akamai EdgeWorkers
```
