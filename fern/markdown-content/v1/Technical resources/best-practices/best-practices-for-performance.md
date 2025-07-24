---
title: "Performance"
slug: "best-practices-for-performance"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 19:40:25 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jan 09 2023 14:58:47 GMT+0000 (Coordinated Universal Time)"
---
Use these best practices to maximize the performance of your custom JavaScript code.

Although many performance benefits come out of the box with EdgeWorkers, you should still develop your custom code with these tips in mind.

> 👍 You can also use the [EdgeWorkers Code Profiler](edgeworkers-code-profiler.md) to gain insight about the performance of your code. For details on how to use this profiling information, review the [Code profiler tutorial](code-profiler-tutorial.md).

# Use the right events

> 👍 Reduce EdgeWorkers invocations by using `onOrigin` events.

EdgeWorkers' granular event model lets you control when to execute code. EdgeWorkers are only invoked on the events that you implement. Although the EdgeWorkers overhead is minimal, you avoid any performance cost for events that are not implemented.

Every hit triggers the `onClientRequest` and `onClientResponse` events. The `onOriginRequest` and `onOriginResponse` events are only triggered when going forward to origin.

For example, when creating an EdgeWorkers function, you have two options to remove a set of HTTP response headers on all static assets. Let's assume there are 100 million requests, with 98% offload.

- Option A: Implement `onOriginResponse` and only trigger the EdgeWorkers function on cache misses.

- Option B: Implement `onClientResponse` and trigger the EdgeWorkers function on all edge hits.

| Event handler       | Edge hits (100 million)       | Origin hits (2 million)     |
| :------------------ | :---------------------------- | :-------------------------- |
| `onClient Response` | 100 M EdgeWorkers invocations | 0 EdgeWorkers invocations   |
| `onOriginResponse`  | 0 EdgeWorkers                 | 2 M EdgeWorkers invocations |

Picking option A, `onOriginResponse` invokes your EdgeWorkers function only 2 million times. If you pick `onClientResponse`, the EdgeWorkers function would trigger 100 million times.

# Avoid empty events

> 👍 Prevent empty events from adding overhead to requests.

EdgeWorkers are invoked if the event handler is present in your code bundle, even if it is empty. These three examples still add EdgeWorkers overhead to every request, as the code bundle exports the `onClientResponse()` function.

```javascript
export onClientResponse(request, response)(){
	//commented out
}
```

```javascript
export onClientResponse(request, response)(){} //empty
```

```javascript
export onClientResponse(request, response)(){
	if(request.getHeader(‘debug’)[0]==’secret’){
		//conditional invocation
	}
}
```

# Use JSON parsing

> 👍 Use `JSON.parse('string')` to instantiate larger JSON objects.

The way you instantiate the JSON object impacts your runtime performance, especially with larger objects. Using the `JSON.parse('string')` function is significantly faster than using the JavaScript object literal.

```javascript
//Slower: JavaScript object literal 
const dataJson = {"hello": "world", "foo": "bar"}
```

```javascript
//Faster: JSON.parse(string) 
const dataJson = JSON.parse('{"hello": "world", "foo": "bar"}')
```

You can find more information about JSON parsing in this [blog](https://v8.dev/blog/cost-of-javascript-2019#json).

# Reduce code bundle size

> 👍 Deploy smaller code bundles to reduce invocation time.

Remove any unnecessary or dead code from your code bundles. Treeshaking can be automated using modern bundlers like rollup to create lean ES2015 modules. Read the  [Store locator](store-locator.md) use case to learn how to use npm and rollup to add JavaScript libraries to your EdgeWorkers scripts.

You should also use the smallest library available that provides the functionality you need to achieve your use case.

# Parallelise sub-requests

> 👍 Invoke multiple HTTP sub-requests in parallel.

Evaluate if you can parallelise your sub-requests before handling their responses. This is faster than triggering them one by one in series. Remember to take into account the [limits for concurrent HTTP sub-requests](resource-tier-limitations.md).

```javascript
// Two subrequests triggered and handled in series
const responseA = await httpRequest($endPointA);
let jsonA = await responseA.json();

const responseB = await httpRequest($endPointB);
let jsonB = await responseB.json();
```

```javascript
// Two subrequests triggered in parallel, handled in series
const responseA = await httpRequest($endPointA);
const responseB = await httpRequest($endPointB);

let jsonA = await responseA.json();
let jsonB = await responseB.json();
```

# Cache sub-requests

> 👍 Cache individual subrequests.

When possible use [Edge caching](https://techdocs.akamai.com/purge-cache/docs/cache-strategies) to make individual sub-requests fast so your actual request is not slowed down.

You can control these settings outside of your EdgeWorkers functions in Property Manager, PAPI, and origin headers. Learn more about [caching](https://techdocs.akamai.com/property-mgr/docs/know-caching) and caching features such as [cache prefreshing](https://techdocs.akamai.com/property-mgr/docs/cache-prefresh-refresh) and [cache ID modification](https://techdocs.akamai.com/property-mgr/docs/cache-id-modification) in our Property Manager documentation.

> 📘 [Caching features](https://techdocs.akamai.com/property-mgr/docs/know-caching) set within the delivery property also apply to the associated sub-request hostnames.

# Cache responseProvider output

> 👍 Cache the output of your `responseProvider`.

When possible use [Edge caching](https://techdocs.akamai.com/purge-cache/docs/cache-strategies) to serve the output of your `responseProvider.`

You can control these settings outside of your EdgeWorkers function in Property Manager, PAPI, and origin headers. Learn more about [caching](https://techdocs.akamai.com/property-mgr/docs/know-caching) and caching features such as [cache prefreshing](https://techdocs.akamai.com/property-mgr/docs/cache-prefresh-refresh) and [cache ID modification](https://techdocs.akamai.com/property-mgr/docs/cache-id-modification) in the Property Manager documentation.

# Don't include sub-request headers in the response

> 👍 As a general rule you should avoid passing sub-request headers back in the response to prevent intermittent data corruption errors that are hard to debug.

If you do decide to include sub-request headers in the response you should use an allow list to choose and explicitly add only the headers that need to be forwarded. This method also lets you avoid sending extraneous headers, which speeds up the response and lowers the load on the network. 

```javascript
import {createResponse} from 'create-response';
import {httpRequest} from 'http-request'

export async function responseProvider(request) {
    	let response = await httpRequest('https://myhost.com');

    	let response_headers = response.getHeaders();

    	let hdrs = {};
    	for (let allowed of ['server', 'mime-version', 'content-type']) {
            	if (allowed in response_headers) {
                    	hdrs[allowed] = response_headers[allowed];
            	}
    	}
```