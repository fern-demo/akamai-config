---
title: "create-response"
slug: "create-response"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 12:11:02 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jan 31 2024 17:21:37 GMT+0000 (Coordinated Universal Time)"
---
This module is available to use in your EdgeWorker code bundles to return an object from a Promise and use it as a response. It is only available when using the `responseProvider` event handler. It exports the `createResponse()` function.

> 👍 The `Connection`, `Keep-Alive`, `Proxy-Authenticate`, `Proxy-Authorization`, `TE`, `Trailers`, and `Transfer-Encoding` hop-by-hop headers should not be set when creating a request.
> 
> The `Host`, `Content-Length`, and `Vary` headers should not be set or copied from another request. If you opt to set them anyway, you need to make sure that the values are correct.
> 
> - An incorrect value in the `Host` header can break your request.
> - An incorrect value in the `Content-Length` header will break the response. Make sure that the value reflects the actual length of the payload you're passing.
> - An incorrect value in the `Vary` header can break cacheability.

## Error handling when streaming with createResponse()

As soon as the EdgeWorker returns the opaque object from `responseProvider()`  the status code and headers registered with `createResponse()` are sent to the client. If you pass a [ReadableStream](streams.md) into `createResponse()` it allows your EdgeWorker to continue executing so it can stream the response body to the client. 

If there is an uncaught error during streaming, the following can occur:

- The EdgeWorker sends a `200 OK` response back to the client.
- The EdgeWorker writes part of the response to the client. 
- The EdgeWorker encounters a fatal error such as an exception or exceeding a limit. When a fatal error occurs, the response body is truncated. 

Since your EdgeWorker has already sent the `200 OK`, the client probably expects a valid response and may encounter problems. 

For more information, go to the [Response body processing](process-response-bodies.md) tutorial.

# createResponse()

Generates the return value for `responseProvider()`.

Use this function to validate the passed values and return an opaque object. The opaque object can be used to resolve the Promise returned from responseProvider(). The function accepts either a list of parameters or an options object.

> 👍 You need to enable the multi-part response header for `responseProvider` when adding the built-in log module to your EdgeWorkers functions. For more information see [Enable and JavaScript logging for responseProvider](enable-javascript-logging.md#enable-javascript-logging-for-responseprovider).

> 📘 An exception is thrown if callers specify invalid parameters.

### Parameters

```javascript
createResponse(status, headers, body, [deny_reason])
```

Review the table for information about the available parameters.
| Parameter | Type | Description |
| --- | --- | --- |
| status | Integer | HTTP status code of the outgoing response <strong>Note:</strong>  The status supports <strong>2xx Success</strong>, <strong>3xx Redirection</strong>  <strong>4xx Client Error</strong>, and <strong>5xx Server Error</strong> status codes. |
| headers | Object<br/><strong>Note:</strong>  A string cannot contain illegal characters. Refer to section three of the <a href="https://tools.ietf.org/html/rfc7230#section-3.2">RFC 7230</a> document for information about the allowed characters. | Properties used as key:value pairs for the response headers. Keys are strings that contain header names, values are either strings or arrays of strings.<br/><br/>Header names and values must conform to the [RFC 7230](https://datatracker.ietf.org/doc/html/rfc7230#section-3.2) standards. |
| body | String or ReadableStream | Content of the response body<br/>When specified as a string, the body is limited to 16 KB. When specified as a ReadableStream, there is no size limit. The ReadableStream should consist of bytes of data. You can use the [TextEncoder](text-encode-transform.md) class to transform a text stream into a byte stream. |
| deny_reason | String | **Optional** Deny reason for the 403 status code. |


```javascript
import { createResponse } from 'create-response';
export function responseProvider (request) {
  return Promise.resolve(createResponse(200, { 'Powered-By': ['Akamai EdgeWorkers'] } 
    , '<html><body><p>Hello World</p></body></html>'));
}
```

## Options object parameters

Optional values that the user can choose to specify, where options is an object: { status, headers, deny_reason }. The definition of each property is the same as above. 

```javascript
createResponse([body, [options]])
```

Review the table for information about the available parameters when using the options object.

| Parameter   | Type                     | Description                                |
| :---------- | :----------------------- | :----------------------------------------- |
| body        | String or ReadableStream | Defaults to an empty body if not provided. |
| status      | Number                   | Defaults to 200 if not provided.           |
| headers     | Object                   | Defaults to {}.                            |
| deny_reason | String                   | Defaults to "".                            |

```javascript
import { createResponse } from 'create-response';
export function responseProvider (request) {
  const options = {};
  options.status = 200;
  options.headers = { header1: 'value1', header2: 'value2' };
  return Promise.resolve(createResponse('<html><body><p>Hello World</p></body></html>', options));
}
```
