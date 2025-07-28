---
title: "Response content transformation"
slug: "transform-response-content"
---
Many EdgeWorkers use cases transform the content of a response body. Although these use cases seek to achieve different goals, you can use similar implementation patterns to achieve them. For example, an EdgeWorkers function can modify the content body to:

- Inject a JavaScript tag
- Add personalized data to a cached response
- Modify media manifest files

> 📘 Learn more
> 
> Refer to the EdgeWorkers [FAQ](content-transformation.md) for answers to common questions about content transformation.
> 
> EdgeWorkers provides an [html-rewriter](htmlrewriter.md) module to use in your EdgeWorkers functions to consume and rewrite HTML documents. The html-rewriter module includes a built-in parser that emulates standard HTML parsing and DOM-construction.

# 1. Basic response modification

This configuration forwards requests to the origin without modifying the response or caching content.

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/simpleResponseMod-v2.jpg" alt="Image"/>
</Frame>

To use an EdgeWorkers function to modify the response, you need to implement the `responseProvider()` function in your EdgeWorkers code. To find details about the code inside the EdgeWorkers function, see the [Response body processing](process-response-bodies.md) tutorial in this guide.  The EdgeWorkers function replaces the origin. The`responseProvider()` code makes the HTTP request for the original content and modifies the content.  

In effect, the code splits the request into two legs. The first leg travels from the user to Akamai, using `responseProvider()` as the origin.  The second leg of the request travels from the EdgeWorkers function back through the Akamai platform to fetch content from the origin. For simplicity, lets assume these two legs use different URLs, as shown below.

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/step1TransformContentInPlace-v1.jpg" alt="Image"/>
</Frame>

The code for this EdgeWorkers function looks similar to the example below. All content modification is performed within the implementation of the `MyCustomTransformStream` class. For brevity the example doesn't include all the details, but you can read about an example of implementing find/replace logic in the [Response body processing](process-response-bodies.md) tutorial.

```javascript
export async function responseProvider (request) {
  var httpResponse = await httpRequest('https://www.example.com/contentpath/');

  // Create TransformStream object
  var transformer = new MyCustomTransformStream();

  // Create a response, piping through a chain of transformers
  return createResponse(
    httpResponse.status,
    {},
    httpResponse.body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(transformer)
      .pipeThrough(new TextEncoderStream())
  );
}
```

To add the EdgeWorkers function to the first leg of the request in Property Manager, add an EdgeWorkers behavior within a path-match condition.

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/matchPath-v1.png" alt="Image"/>
</Frame>


<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/matchPathBehavior-v1.png" alt="Image"/>
</Frame>

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/matchPatchBehavior-v1.png" alt="Image"/>
</Frame>


# 2. Transform content in-place

Often, we want to transform content in-place, with the client requesting the content from the same URL as the original non-transformed content. You only need to make a simple change in the EdgeWorkers code to use the incoming request's URL when making a sub-request. This change makes the sub-request to the Akamai platform and passes it through to the origin.

Don't worry, you won't get stuck in a loop where the sub-request triggers an EdgeWorkers execution making a sub-request that triggers an EdgeWorkers execution, and creates a sub-request that goes on forever!  The Akamai platform won't allow EdgeWorkers to execute on a request that originated from an EdgeWorkers sub-request.

```javascript
export async function responseProvider (request) {
  var httpResponse = await httpRequest(request.url);

  /*
    ...
    ...
    ...
  */
}
```

This diagram is similar to the previous one, except now both requests are made to the same URL.

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/step2TransformContentInPlace-v1.jpg" alt="Image"/>
</Frame>

# 3. Add Caching

## The simple, but wrong, approach to caching

It's common to want to cache one or both pieces of the request. A naive attempt to cache content would be to simply add a behavior to enable caching on the specific path, caching both the original content from origin and the modified content from the EdgeWorkers execution. Let's diagram a request flow to see what happens if we simply turn on caching. As we follow this flow, note that the cache key by default, is based only on the URL. Since both legs use the same URL, they will share the same cache key. 

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/cacheWrong.jpg" alt="Image"/>
</Frame>

The work flow for this example is as follows. 

1. User makes a request to the edge server.
2. CDN proxy sends a request to the EdgeWorkers `responseProvider` function.
3. EdgeWorkers function requests the original content from the CDN proxy on the local Edge server.
4. CDN proxy optionally forwards the request through one or more parent servers.
5. Parent server requests content from origin.
6. Origin responds with content.
7. Parent server stores original content (as retrieved from origin) in cache.
8. Parent delivers a response to edge server CDN proxy.
9. CDN proxy caches original content (as retrieved from origin) in cache.
10. CDN proxy responds with original content to EdgeWorkers.
11. EdgeWorkers code modifies the response and returns modified content to the CDN proxy.
12. CDN proxy stores modified content in cache.
13. CDN proxy returns content to the end-user.

After the request is complete, the cache of the parent server stores the original content. The cache of the edge server stores the modified content.

- If a future request comes to the same edge server, it receives the cached response as modified by EdgeWorkers. This avoids an EdgeWorkers invocation.

- If a future request hits a different edge server and the sub-request for original content happens to flow through the same parent server, then the origin content can be returned from cache, improving performance.

> 🚧 Review the bugs associated with this work flow
> 
> - If a future request from an end-user is mapped directly to the parent server from the previous request, then the CDN proxy will deliver content from cache without executing the EdgeWorker.  But this server has the original content, not the EdgeWorkers-modified content.
> - There is a small time period at the edge server between steps 9 and 12 where the CDN proxy has stored the ORIGINAL content in cache. If another request from an end user comes into the same edge server during this time window, the CDN proxy will deliver the original content instead of the EdgeWorkers-modified content.
> - If the edge server in the diagram happens to be used a parent server for a future EdgeWorkers sub-request, the `responseProvider` will receive already modified content and will perform the modifications a second time.
> 
>   The above issues are not usually detectable in typical testing patterns, which makes a single request at a time to the same edge server for each request.

## Caching both legs, the correct way

To avoid the cache collision between original and EdgeWorkers-modified content, you need to ensure that the EdgeWorkers-modified content is stored and retrieved under a different cache key than the original content.

 <Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/cacheBoth-v1.jpg" alt="response Body"/>
</Frame>

To separate the original content from the EdgeWorkers-modified content in cache, the cache keys need to differ. The easiest way to distinguish requests that originated from EdgeWorkers is to add a header or query parameter, and configure the cache keys accordingly.

The EdgeWorkers code fragment below includes a header `X-Subrequest: true` in the sub-request.

```javascript
export async function responseProvider (request) {
  var subrequestHeaders = {"X-Subrequest": ["true"]}
  var httpResponse = await httpRequest(request.url, {headers: subrequestHeaders);

  /*
    ...
    ...
    ...
  */
}
```

You can configure Property Manager rules to include the `X-Subrequest` header in the cache ID.  Use caution to ensure that you include any required query parameters in the cache ID. You should integrate the `X-Subrequest` header carefully if there are pre-existing cache ID modifications.

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/cacheIDMod-v1.png" alt="Image"/>
</Frame>

The EdgeWorkers behavior should also be bypassed when the header is received.

Even though the EdgeWorkers function won't be executed on a sub-request you still need to bypass the EdgeWorkers execution when the header is present. There is a subtle edge case that can appear when not bypassing the execution.  It is still possible for an end-user, such as a developer testing the site, to send the `X-Subrequest` header from a browser.  If the header is present in the initial request, the EdgeWorkers function will still execute, and the EdgeWorkers-modified response would be cached with the cache ID intended for the original content, polluting the cache.

Bypassing the EdgeWorkers execution when the header is present also gives a convenient mechanism to test the original content through the Akamai platform, without invoking the EdgeWorkers function.

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/repsonseModPM-v1.png" alt="Image"/>
</Frame>

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/matchPathBehavior-v1.png" alt="Image"/>
</Frame>

An alternative approach is to add a query parameter instead of a header. Each has their own advantages depending on existing configuration logic and origin behavior.

Advantages of using a **Header** to modify cache.	

- EdgeWorkers code to add an additional header is slightly simpler than the code to add a query parameter.
- An extra header sent to origin is less likely to change the origin behavior than an extra query parameter.

Advantages of using a **Query Parameter** to modify cache key.

- By default, the cache key includes the query parameters, so may require less Property Manager configuration changes.
- Avoids some general challenges that occur with modifying cache IDs, such as cache ID collisions.

# 4. Headers

When transforming content with EdgeWorkers, you can pass the original request headers from the client through to the origin.  You can also pass response headers from the origin back to the client.  The EdgeWorkers code below can capture request headers and forward them o the origin. It also captures response headers for delivery to the client.

```javascript
export async function responseProvider (request) {

  //WARNING: This example passes all request/response headers, causing problems
  var subrequestHeaders = request.getHeaders()
  subrequestHeaders["X-Subrequest"] = ["true"]

  var httpResponse = await httpRequest(request.url, {headers: subrequestHeaders});

  var responseHeaders = httpResponse.getHeaders();
  var responseStatus = httpResponse.status;

  // Implementation of transformBody is left out of example for brevity
  var responseBody = transformBody(httpResponse.body);

  /*    ...    ...    ...  */


  return createResponse(
    responseStatus,
    responseHeaders,
    responseBody
  );
}
```

> 🚧 Passing all request and response headers can cause issues
> 
> For example, if the origin sends a `Content-Length` header and the EdgeWorkers code modifies the content, then the original `Content-Length` header may not be valid for the modified content. If the `Content-Length` header is smaller than the actual content, the client may silently truncate any bytes beyond those specified by the header.
> 
> Similarly, forwarding request headers can cause other problems. Forwarding the Pragma header can trigger debug headers to be returned from the sub-request to the EdgeWorkers function. When combined with the debug headers added to the original client request, the resulting header set can cause confusion while debugging and in some cases can exceed maximum header limits.

To avoid issues, you can remove specific request and response headers known to be "unsafe". The code below removes hop-by-hop headers as well as a few other headers known to cause undesired behavior with the Akamai platform. For example, content is not cached if `Vary: Content-Encoding` is present and the content is not gzip compressed. Note that EdgeWorkers will not deliver gzip compressed content to the CDN proxy.

```javascript
const UNSAFE_REQUEST_HEADERS = [
  'pragma', 'accept-encoding',
  'connection', 'proxy-authorization', 
  'te', 'trailer', 'transfer-encoding', 'upgrade'
];
const UNSAFE_RESPONSE_HEADERS = [
  'content-length', 'vary', 'content-encoding', 
  'connection', 'keep-alive', 'proxy-authenticate',
  'trailer', 'transfer-encoding',  'upgrade'
];

function getSafeHeaders (headers, unsafeHeaders) {
  return headers.filter(header => !unsafeHeaders.includes(header));
}

export async function responseProvider (request) {
  var subrequestHeaders = getSafeHeaders(request.getHeaders(), UNSAFE_REQUEST_HEADERS);  
  subrequestHeaders["X-Subrequest"] = ["true"];

  var httpResponse = await httpRequest(request.url, {headers: subrequestHeaders});

  var responseHeaders = getSafeHeaders(httpResponse.getHeaders(), UNSAFE_RESPONSE_HEADERS);
  var responseStatus = httpResponse.status;

  // Implementation of transformBody is left out of example for brevity
  var responseBody = transformBody(httpResponse.body);

  return createResponse(
    responseStatus,
    responseHeaders,
    responseBody
  );
}
```
