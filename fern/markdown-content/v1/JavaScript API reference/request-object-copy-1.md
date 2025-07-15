---
title: "EW-20517 Request Object (COPY)"
slug: "request-object-copy-1"
excerpt: ""
hidden: true
createdAt: "Thu Oct 10 2024 13:44:34 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Oct 10 2024 14:00:56 GMT+0000 (Coordinated Universal Time)"
---
The request object represents the HTTP request. It contains properties that provide details and context about the request, as well as properties that allow for modifying the request.

To prevent a 500 error response, limit the body string length to 2000 characters. If called multiple times, the event handler uses the most recent response.

# Properties

## body

A stream used to read the contents of the request `body`. This is a read-only ReadableStream value.

This property is only available when using the `responseProvider` event.

```javascript
const opt = {
   "method": "POST",
   "body": request.body.pipeThrough(new TextEncoderStream())
}
let response = await httpRequest(url, opt);
```

## cacheKey

Returns the methods that specify the HTTP response in cache for an HTTP request.

For more information see the [CacheKey Object](doc:cachekey-object).

## clientIp

The original client IP address that can either be IPv4 or IPv6. This is a read-only string value.

```javascript
//Request clientIp
request.clientIp
// => IPv4 or IPv6
```

## cpCode

A unique identifier in the form of an unsigned integer that is used for reporting site traffic usage data. This is a read-only value.

```javascript
// Request cpCode 12345
 request.cpCode
// => 12345
```

## device

Returns an object that contains properties specifying the client device characteristics.

For more information see the [Device Object](doc:device-object).

## host

The `host` header value of the incoming request from the client. This is a read-only string value.

```javascript
// Host: www.example.com
request.host
// => "www.example.com"
```

## method

The HTTP `method` of the incoming request. This is a read-only string value.

```javascript
// GET /search?q=something
request.method
// => "GET"
```

## path

The URL `path` of the incoming request, including the filename and extension, but without a query string. This is a read-only string value.

If the incoming request does specify a path, the value is `/`.

```javascript
// https://www.example.com/search?q=something
request.path
// => "/search"
```

## query

The `query` string of the incoming request. This is a read-only string value.

If the incoming request does not specify a query, the value is an empty string. 

```javascript
// GET /search?q=something
request.query
// => "q=something"
```

## scheme

The `scheme` of the incoming request ("http" or "https"). This is a read-only string value.

```javascript
// https://www.example.com/search?q=something
request.scheme
// => "https"
```

## url

The relative path and query string of the incoming request. This is a read-only string value.

```javascript
// https://www.example.com/search?q=something
request.url
// => "/search?q=something"
```

## userLocation

Returns an object that contains properties specifying the geographic location.

For more information see the [User Location Object](doc:user-location-object).

# Methods

The following methods are available for the EdgeWorkers Request Object.

| Methods                                             | onClient Request | onOrigin Request | onOrigin Response | onClient Response | response Provider |
| :-------------------------------------------------- | :--------------- | :--------------- | :---------------- | :---------------- | :---------------- |
| [respondWith()](doc:request-object#respondwith)     | ✓                | ✓                | ✓                 | ✓                 |                   |
| [addHeader()](doc:request-object#addheader)         | ✓                | ✓                |                   |                   |                   |
| [getHeader()](doc:request-object#getheader)         | ✓                | ✓                | ✓                 | ✓                 | ✓                 |
| [getHeaders()](doc:request-object#getheaders)       | ✓                | ✓                | ✓                 | ✓                 | ✓                 |
| [setHeader()](doc:request-object#setheader)         | ✓                | ✓                |                   |                   |                   |
| [removeHeader()](doc:request-object#removeheader)   | ✓                | ✓                |                   |                   |                   |
| [getVariable()](doc:request-object#getvariable)     | ✓                | ✓                | ✓                 | ✓                 | ✓                 |
| [setVariable()](doc:request-object#setvariable)     | ✓                | ✓                | ✓                 | ✓                 |                   |
| [route()](doc:request-object#route)                 | ✓                |                  |                   |                   |                   |
| [text()](doc:request-object#text)                   |                  |                  |                   |                   | ✓                 |
| [json()](doc:request-object#json)                   |                  |                  |                   |                   | ✓                 |
| [arrayBuffer()](doc:request-object#arraybuffer)     |                  |                  |                   |                   | ✓                 |
| [wasTerminated()](doc:request-object#wasterminated) | ✓                | ✓                |                   |                   |                   |

## respondWith()

Constructs a response for the given request, rather than fetching a response from cache or the origin.

Responses constructed with `respondWith()` can create a body with a maximum of 2048 characters.

> 👍 The `Connection`, `Keep-Alive`, `Proxy-Authenticate`, `Proxy-Authorization`, `TE`, `Trailers`, and `Transfer-Encoding` hop-by-hop headers should not be set when creating a request.
> 
> The `Host`, `Content-Length`, and `Vary` headers should not be set or copied from another request. If you opt to set them anyway, you need to make sure that the values are correct.
> 
> - An incorrect value in the `Host` header can break your request.
> - An incorrect value in the `Content-Length` header will break the response. Make sure that the value reflects the actual length of the payload you're passing.
> - An incorrect value in the `Vary` header can break cacheability.

> 📘 `respondWith()` supports the GET, POST, DELETE, PUT, PATCH, and HEAD request methods.

#### Parameters

```javascript
respondWith(status, headers, body, [deny_reason])
```

Review the table for information about the available parameters.  This method can be modified during the `onClientRequest`,  `onClientResponse`, `onOrigin Request`, and `onOrigin Response` events.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "status",
    "0-1": "Integer",
    "0-2": "HTTP status code <p><strong>Note:</strong>  The status supports <strong>2xx Success</strong> , <strong>3xx Redirection</strong> , <strong>4xx Client Error</strong> , and <strong>5xx Server Error</strong> status codes. An exception is thrown if the status code is outside the <strong>2xx</strong> to <strong>5xx</strong> range.)</p>",
    "1-0": "headers",
    "1-1": "Object",
    "1-2": "Properties used as key:value pairs for the response header",
    "2-0": "body",
    "2-1": "String",
    "2-2": "Content of the response body",
    "3-0": "deny_reason",
    "3-1": "String",
    "3-2": "(optional) Deny reason when the status code is a 403"
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


> 📘 By default, you cannot add a "Set-Cookie" header to the `request.respondWith()` header. You need to enable it with the metadata header tag described on the [cookies](doc:cookies) page. Other response headers are supported.

> 📘 If you apply EdgeWorkers and an Edge Redirect Cloudlet to the same end user request, the Cloudlet cannot set the Location header when the EdgeWorker runs a `respondWith()` method.

```javascript
// generate an empty API response
request.respondWith(200, {'Content-Type': ['application/json;charset=utf-8']  }, '{}');
// => {}
```

```javascript
// generate a denied API response
request.respondWith(403, {'Content-Type': ['application/json;charset=utf-8']  }, '{}', 'Denied Response');
// => {}
```

## addHeader()

Renames or adds values to a header. If the header already exists, then the value is appended. The new header value can be a single string or an array. This request header can only be modified during the `onClientRequest`and `onOriginRequest`events.

#### Parameters

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
    "0-2": "New header name  \nShould conform to [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110) character constraints for header names",
    "1-0": "value",
    "1-1": "String or Array",
    "1-2": "New Header value(s)  \nSupports UTF-8 encoded characters with the exception of [C0 controls](https://www.unicode.org/charts/PDF/U0000.pdf)"
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
request.addHeader('HeaderName', 'HeaderValue');
// HeaderName: HeaderValue
```

## getHeader()

Returns an array of header values by header name. The header names are case insensitive. If the header doesn't exist, a value of `undefined` is returned. This request header can only be modified during the `onClientRequest`and `onOriginRequest`events.

#### Parameters

```javascript
getHeader(name)
```

Review the table for information about the available parameters.

| Parameter | Type   | Description           |
| :-------- | :----- | :-------------------- |
| name      | String | Name of the header(s) |

```javascript
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:66.0) Gecko/20100101 Firefox/66.0
request.getHeader('User-Agent')[0];
// => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:66.0) Gecko/20100101 Firefox/66.0"
```

## getHeaders()

Returns a JavaScript object that contains all HTTP request headers as properties.

The key for each property is the name of the HTTP header, normalized to lower-case. The value is an array of strings, containing one string for each HTTP header with the same name. The header properties are in the order that they were received by the Akamai edge servers. When you iterate across the object properties you will get the headers in the order that the browser sent them.

> 👍 Refer to the [code sample](https://github.com/akamai/edgeworkers-examples/blob/master/edgecompute/examples/traffic-routing/redirect-liquidator/src/main.js) for the [Redirect Liquidator](https://github.com/akamai/edgeworkers-examples/tree/master/edgecompute/examples/traffic-routing/redirect-liquidator) use case in the EdgeWorkers GitHub repo for more information about how to use and debug `getHeaders()`.

```javascript
import { httpRequest } from 'http-request';
import { createResponse } from 'create-response';
export function responseProvider(request) {
    let hdrs = request.getHeaders();
    httpRequest('/header-collector', {headers: hdrs});

    //...
}
```

## setHeader()

Sets header values and overrides any previous headers. This request header can only be modified during the `onClientRequest` and `onOriginRequest` events.

#### Parameters

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
    "1-1": "String",
    "1-2": "Value of the header  \nSupports UTF-8 encoded characters with the exception of [C0 controls](https://www.unicode.org/charts/PDF/U0000.pdf)"
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


> 📘 EdgeWorkers cannot manipulate Akamai headers added for internal use. These headers typically start with 'X-Ak' and 'Akamai-'.

```javascript
// Referer: http://www.example.com
request.setHeader('Referer', 'http://www.akamai.com');
// Referer: http://www.akamai.com
```

## removeHeader()

Removes the named header. This request header can only be modified during the `onClientRequest` and `onOriginRequest` events. The header name is case insensitive.

#### Parameters

```javascript
removeHeader(name)
```

Review the table for information about the available parameters.

| Parameter | Type   | Description                  |
| :-------- | :----- | :--------------------------- |
| name      | String | Name of the header to remove |

```javascript
// Pragma: HeaderName
request.removeHeader('Pragma');
//
```

## getVariable()

Gets the value of a Property Manager [user-defined variable](https://techdocs.akamai.com/property-mgr/docs/user-defined-vars). Only variables that start with a `PMUSER_` prefix are available. The name of the variable must be UPPERCASE.

### Parameters

```javascript
getVariable(name)
```

Review the table for information about the available parameters.

[block:parameters]
{
  "data": {
    "h-0": "Parameters",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "name",
    "0-1": "String",
    "0-2": "Names of the user-defined variables  \n  \nIf no variables exist, a value of `undefined` is returned."
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


> 📘 `PMUSER_` variables with a security setting of **sensitive** are not available within an EdgeWorkers function using `getVariable`.

```javascript
request.getVariable('PMUSER_MYVARIABLE');
// => "MyVariableValue"
```

## setVariable()

Sets the value of a Property Manager [user-defined variable](https://techdocs.akamai.com/property-mgr/docs/user-defined-vars). Only variables that start with a `PMUSER_` prefix are available. The name of the variable must be UPPERCASE.

The total size limit when creating Property Manager user-defined variables is 1024 characters. This limit includes the name and value of the variable and only applies to EdgeWorkers added or modified using the JavaScript API.

The 1024 character limit is a modification limit that only applies to `setVariable`, not `getVariable`. For example, if you use advanced metadata to create a `PMUSER_` variable in a property with a value that exceeds 1024 characters, the EdgeWorkers function can still read the value.

If however, you then wanted to modify that variable, you could do so up to 1024 characters (including the name and value of the variable). This 1024 limit is cumulative for all `setVariable` calls in the execution of a given event. If you exceed the limit, `setVariable` will throw an exception. 

#### Parameters

```javascript
setVariable(name, value)
```

> 📘 `PMUSER_` variables with a security setting of **sensitive** are not available within an EdgeWorkers function using setVariable.
> 
> By default, the security settings of the `PMUSER_` variable are hidden. Hidden security settings are not available in the `X-Akamai-Session-Info` response headers if requested.

Review the table for information about the available parameters.

| Parameter | Type   | Description                                |
| :-------- | :----- | :----------------------------------------- |
| name      | String | Names of the user-defined variables to set |
| value     | String | Value to assign to the variable            |

```javascript
// PMUSER_MYVARIABLE = "MyValue"
request.setVariable('PMUSER_MYVARIABLE','MyNewValue');
// => PMUSER_MYVARIABLE = "MyNewValue"
```

## route()

Routes the outbound origin request to a pre-defined origin server, a modified path, or a modified query string. The destination must be a JavaScript object containing at least one of the following optional properties; path, query, or origin. If the destination is not a JavaScript object an error is thrown. This method can only be modified during the `onClientRequest` event.

#### Parameters

```javascript
route(destination)
```

> 📘 Edge defined redirects always take precedence over modify forward paths. Therefore, the Edge Redirector and Redirect behaviors take precedence over EdgeWorkers forward route modifications made using the `route(destination)` function.

Review the table for information about the available parameters.

| Parameter   | Type   | Description                                                                                                          |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------------------- |
| destination | Object | A JavaScript object containing the optional properties. An error is  thrown if the input is not a JavaScript Object. |

Review the table below for information about the optional properties.

[block:parameters]
{
  "data": {
    "h-0": "Properties",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "path",
    "0-1": "String",
    "0-2": "New path for the outbound origin request. <p>Include the complete URI path beginning with a forward slash (/). If the URI includes a filename, the file extension is also required. <p>This setting overrides any previously defined Property Manager behaviors that attempt to set the forward path.</p><p><strong>Note:</strong>  A Property Manager behavior that attempts to set the forward path after the EdgeWorker runs will override this EdgeWorkers setting.</p>",
    "1-0": "query",
    "1-1": "String",
    "1-2": "New query string for the outbound origin request.",
    "2-0": "origin",
    "2-1": "String",
    "2-2": "New outbound origin request to a preconfigured origin identifier in the delivery property. <p><strong>Note:</strong>  See [Set up a Conditional Origin Group rule](https://techdocs.akamai.com/cloudlets/docs/about-conditional-origins#set-up-a-conditional-origin-group-rule) in the Cloudlets documentation for instructions on how to set up the origins to use with your EdgeWorkers."
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


> 📘 You may have origins that produce different content for the same URL. When you are changing this kind of origin you need to ensure that you use the origin server hostname in the cache key. For more information see the [Cache Key Hostname](https://techdocs.akamai.com/property-mgr/docs/configure-unique-origin#cache-key-hostname) documentation.

```javascript
// GET /search?q=something
request.route({origin: "origin-1", path: "/example.html", query: "a=1&b=2"}); 
// GET /example.html?a=1&b=2
```

## text()

Reads the body to completion and returns a promise that resolves to a string containing the full body. The request is decoded as UTF-8, using the replacement character on encoding errors.

The maximum request size is 16 KB. If the request exceeds this limit the [promise](doc:best-practices-for-asynchronous-processing) is rejected.  
This method can only be called during the `responseProvider` event.

```javascript
import { createResponse } from 'create-response';
 
export async function responseProvider (request) {
    let mybody = await request.text();
    return createResponse(200,
                          { 'request-body': [mybody] },
                           '<html><body><p>Hello World</p></body></html>'
                         );
}
```

> 📘 The request is buffered, not streamed.

## json()

Reads the body to completion. Returns a promise that resolves to an Object that is a result of parsing the body JSON.

The maximum request size is 16 KB. If the request exceeds this limit the [promise](doc:best-practices-for-asynchronous-processing) is rejected.  
This method can only be called during the `responseProvider` event.

```javascript
import {createResponse} from 'create-response';
export async function responseProvider (request)  {

        let mybody = await request.json();
        return createResponse(200, {}, JSON.stringify(mybody));
}
```

> 📘 The request is buffered, not streamed.

## arrayBuffer()

Reads the body to completion. Returns a promise that resolves to an ArrayBuffer containing the bytes of the request. 

The maximum request size is 16 KB. If the request exceeds this limit the [promise](doc:best-practices-for-asynchronous-processing) is rejected.  
This method can only be called during the `responseProvider` event.

```javascript
import { createResponse } from 'create-response';

export function responseProvider(request) {
    return request.arrayBuffer().then(function(ab) {
        // Sum the bytes in the array
        let buf = new Uint8Array(ab);
        let total = buf.reduce((total, cur) => total + cur);

        return createResponse(200, {}, `Bytes add up to ${total}`);
    });
}
```

The above example adds up the unsigned value of each byte and writes the total as part of the response. 

> 📘 The request is buffered, not streamed.

## wasTerminated()

Checks to see if the EdgeWorkers function called the `respondWith()` method. If so, the edge server responds to the request immediately after the event handler returns.

Returns true if `respondWith()` was called in the current event handler and false otherwise.

```javascript
function somethingComplicated(request) {
    if (0 <= request.query.search(/stop/)) {
        request.respondWith(242, {}, "somethingComplicated found stop");
    }
}

export function onClientRequest(request) {
    somethingComplicated(request);

    // The caller uses wasTerminated() to see if a response to the request
    // has been generated earlier in execution handler. 
    if (!request.wasTerminated()) {
        request.respondWith(200, {}, "Nothing complicated happened");
    }
}
```
