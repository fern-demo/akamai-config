---
title: "http-request"
slug: "http-request"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 12:19:48 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jan 20 2025 15:01:31 GMT+0000 (Coordinated Universal Time)"
---
This module is available to use in your EdgeWorkers code bundles to export the `httpRequest()` function.

# HTTP sub-requests

EdgeWorkers supports HTTP requests made from within an event handler. These HTTP sub-requests provide a logical way to fetch resources asynchronously across the network. If you want your callback to wait for the sub-request to complete, the event handlers should return a Promise or be declared async.

> 📘 [Caching features](https://techdocs.akamai.com/property-mgr/docs/caching-2#how-it-works) set within the delivery product also apply to the associated sub-request hostnames.

Any caching features defined for the delivery product apply to both standard URLs and sub-requests.

To use sub-requests you need an associated delivery product. Hostnames can only be requested directly when served through the Akamai network. If you don't have an associated delivery product sub-requests will fail with a 400 HTTP response code. If your content is not yet available through the Akamai platform, refer to the Property Manager guide for instructions on how to [Create a new property](https://techdocs.akamai.com/property-mgr/docs/create-new-prop). 

See the [Limitations](limitations.md) section for more information about the supported delivery products and the event handler timeouts.

> 👍 For information about re-using request and response headers, refer to the [FAQ](edgeworkers-javascript-code.md#can-i-re-use-request-and-response-headers) in this guide.

# Debugging sub-requests

Extra trace information is available for debugging sub-requests. It exposes information including the sub-request status code, request timing, and rate limiting. 

You can enable the enhanced sub-request trace by [adding debug pragmas](enhanced-debug-header-details-for-http-sub-requests.md) to your request.  

# httpRequest()

Exports a function from a built-in module called `http-request`.

httpRequest() returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to an httpResponse Object. This function is similar to `fetch` from the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

When a `httpRequest()` timeout occurs, a  JavaScript error() Object is thrown. 

These restrictions apply when using the `httpRequest` function:

- Requests made through the `httpRequest()` function will only trigger [subWorker enabled](create-a-subworker.md#enable-subworkers) EdgeWorkers attached to the requested resource.
- EdgeWorkers sub-requests only support HTTPS. If you specify another protocol in the sub-request the EdgeWorkers function will automatically convert it to HTTPS.
- You cannot specify a port number.
- Sub-requests may specify the `GET`, `HEAD`, `POST`, `PUT`, `DELETE` and `OPTIONS` verbs.
- Hostnames created using [automated slot matching](https://techdocs.akamai.com/property-mgr/docs/opt-slot-support) are not supported.
- To prevent intermittent data corruption errors that are hard to debug you shouldn't pass sub-request headers back in the response. For more information, review the [FAQ](edgeworkers-javascript-code.md#can-i-include-sub-request-headers-in-the-response) in the EdgeWorkers JavaScript code section.

> 📘 For more information you can also review the [Limitations](limitations.md) that apply to sub-requests.

To view debugging information for HTTP sub-requests you need to [Enable enhanced debug headers](enable-enhanced-debug-headers.md). For more information review the [Enhanced debug header details for HTTP sub-requests](enhanced-debug-header-details-for-http-sub-requests.md) section.

### Parameters

```javascript
httpRequest(url [,options])
```

| Parameter | Type   | Description                                                                                                                                                                                                                                                         |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| url       | String | The absolute or relative URL to fetch. Relative URLs use the parent request as the base URL. The domain of a requested URL must be served by the Akamai platform. This allows the requested URL to take advantage of the features available on the Akamai platform. |

```javascript
httpRequest('https://[akamai served domain]')
```

The options must be a JavaScript object containing at least one of the optional properties.
| Property | Type | Description |
| --- | --- | --- |
| method | String | The HTTP request method to use. Defaults to GET, if not specified. |
| headers | Object <p><strong>Note:</strong></p>  EdgeWorkers should not manipulate Akamai headers added for internal use. These headers typically start with 'X-Ak' and 'Akamai-'. | The HTTP request headers to include. The property names of this object are the header names. The property values are arrays containing the header values. |
| body | String or ReadableStream | Content of the request body. |
| timeout | Integer | Timeout value, in milliseconds, for the response to complete. |


```javascript
const options = {}
 
options.method = "POST"
options.headers = { "Content-Type": "application/x-www-form-urlencoded" }
options.body = "field1=value1&field2=value2"
 
const response = await httpRequest(url, options)
```

```javascript
const response = await httpRequest(url, {
   method: "POST",
   headers: { "Content-Type": "application/x-www-form-urlencoded" },
   body: "field1=value1&field2=value2"
})
```

```javascript
const options = {}
options.method = "GET"
options.timeout = 100

const response = await httpRequest(url, options)
```

```javascript
const response = await httpRequest(url, {
   method: "GET",
   timeout: 100
})
```

This example shows how to use ReadableStream as the body type when making a request.

```javascript
const options = {}

const requestBody = new ReadableStream({
    start(controller) {
        controller.enqueue('hello ');
        controller.enqueue('world');
        controller.close();
    }
});

options.method = "POST"
options.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
}
options.body = requestBody.pipeThrough(new TextEncoderStream())

const response = await httpRequest(url, options)
```

This example shows the response when you use ReadableStream as the body type.

```javascript
const response = await httpRequest(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new ReadableStream({
        start(controller) {
            controller.enqueue('hello ');
            controller.enqueue('world');
            controller.close();
        }
    })
})
```

This example shows how to use an asynchronous encapsulating function to call an httpRequest() function.

```javascript
async function getJSON (url) {
  const response = await httpRequest(`${url}`);
  if (response.ok) {
	return await response.json();
  } else {
	return { language: 'en', greeting: 'Hello World' };
  }
}
```

This example shows how to use the `onClientRequest` event handler to call an httpRequest() function. It is also async.

```javascript
import { httpRequest } from 'http-request';
import { logger } from 'log';
export async function onClientRequest(request) {
  try {
    const response = await httpRequest('/ab_test/ab.json');
    logger.log('OnClientRequest SubRequest Successful');
      if (response.ok) {
       // Add logic process response 
      }
  } catch (error) {
    logger.log('OnClientRequest SubRequest Failed: %s', error);
  }
}
```

# httpResponse Object

The httpResponse Object defines the details of the response for the httpRequest.

## Properties

### body

This is the stream used to read the content body. This is a read-only ReadableStream.

```javascript
export function responseProvider (request) {
 return httpRequest(`https://${request.host}${request.url}`).then(response => {
   return createResponse(
```

## ok

This is true for 2XX response headers. This is a read-only boolean value.

```javascript
const response = await httpRequest(subrequestURL);
      if (response.ok) {
...
        } else {
        ...
      }
```

## status

The HTTP `status`code. This is a read-only integer.

```javascript
// HTTP/1.1 200
  response.status;
// => 200
```

## Methods

The following methods are available for the EdgeWorkers httpResponse objects.

## getHeader()

Provides header values by header name using the same signature as the getHeader() function on callback request objects.  If the header exists, returns an array of strings that lists the values of the headers.  
Returns `undefined` if the header does not exist.

### Parameters

```javascript
getHeader(name)
```

Review the table for information about the available parameters.

| Parameter | Type   | Description                                       |
| :-------- | :----- | :------------------------------------------------ |
| name      | String | The values of the header or a value of undefined. |

```javascript
response.getHeader('Content-Type')
```

## getHeaders()

Returns an object with its own properties corresponding to the response headers.

The key is the header name normalized to lowercase and the value is an array of strings containing one string for each HTTP header with the same name. The object is mutable, but independent of the response object - meaning changes won't be reflected by response.getHeader(). The header properties are in the order that they were received by the Akamai edge servers. When you iterate across the object properties you will get the headers in the order that the browser sent them.

`getHeaders()` is only supported where httpRequest() is allowed.

```javascript
import { httpRequest } from 'http-request';
export async function onClientRequest(request) {
    let response = await httpRequest('/example');
    request.respondWith(response.status, response.getHeaders(), "OK" );
```

## json()

Returns a Promise that resolves to the parsed JSON response.

The response size is limited to 128 KB.

```javascript
let fromOrigin = httpRequest('/endpoint.json');
let json = await fromOrigin.json();
```

> 📘 The response is buffered not streamed.

## text()

Reads the body to completion and returns a Promise that resolves to a String containing the full body.

The response size is limited to 128 KB.

```javascript
let fromOrigin = httpRequest('/endpoint.json');
let bodytext = await fromOrigin.text();
```

> 📘 The response is buffered not streamed.

# httpResponse Headers Object

The httpResponse Headers Object provides header values by header name for the httpRequest response.

## get()

This function has the same signature as the Fetch API's [Header.get](https://developer.mozilla.org/en-US/docs/Web/API/Headers/get) method.

#### Parameters

```javascript
get(name)
```
| Parameter | Type | Description |
| --- | --- | --- |
| name | String | Returns a string with the values of the headers concatenated using the string ", ", or null if the header is not found.<br/>For `Set-Cookie` headers for use [response.getHeader()](response-object.md#getheader)  instead. |
