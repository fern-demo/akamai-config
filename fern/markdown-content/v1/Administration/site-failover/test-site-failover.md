---
title: "Test Site Failover"
slug: "test-site-failover"
excerpt: ""
hidden: false
createdAt: "Fri Aug 06 2021 13:36:01 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jan 18 2024 21:58:17 GMT+0000 (Coordinated Universal Time)"
---
To help provide the best possible user experience for your customers you should test your failover logic.

> 📘 When testing Site Failover you need to remove the `akamai-x-ew-debug-rp` Pragma header. For more information refer to the [known issue](doc:known-issues#site-failover-and-responseprovider-built-in-variable).

# Use code to generate failures

You can use the following code to generate various failure types. This code lets you add a query parameter to the URL to generate a status for, `ExecutionError`, `CpuTimeoutError,` and `WallTimeoutError`. 

For example, you can add `?ew-error-onClientRequest=CpuTimeoutError` to the url make the EdgeWorkers function exceed the CPU timeout limit and fail.

```javascript
import {createResponse} from 'create-response';
import URLSearchParams from 'url-search-params'; 

/* If query string parameter "ew-error-${eventHandler}" is present in the request, then throw a JavaScript error.   Used for simulated errors to test failover logic   Error types: 	ExecutionError 	CpuTimeoutError 	WallTimeoutError*/
async function checkSimulatedErrors (eventHandler, request) {
	const params = new URLSearchParams(request.query);
	const errorType = params.get(`ew-error-${eventHandler}`);
	if (errorType) {
    	switch (errorType) {
        	case 'ExecutionError':
            	// Throw JS error
            	throw new Error(`Simulated error: ${errorType} in ${eventHandler}`);
        	case 'CpuTimeoutError':
            	// Create infinite loop, resulting in exceeding CPU timeout
            	while(true){}
        	case 'WallTimeoutError':
            	// Promise never calls resolve or reject method.
            	// Since Promise never resolves, the await will never complete.
            	//  awaiting the result of checkSimulatedErrors will result in a wall timeout
            	var unresolvingPromise = new Promise(()=>{});
            	await unresolvingPromise;
    	}
	}
}

export async function responseProvider (request) {
	await checkSimulatedErrors('responseProvider', request);
	// ... responseProvider logic ...
}

export async function onClientRequest (request) {
	await checkSimulatedErrors('onClientRequest', request);
	// ... onClientRequest logic ...
}

export async function onOriginRequest (request) {
	await checkSimulatedErrors('onOriginRequest', request);
	// ... onClientResponse logic ...
}

export async function onOriginResponse (request, reponse) {
	await checkSimulatedErrors('onOriginResponse', request);
	// ... onOriginResponse logic ...
}

export async function onClientResponse (request) {
	await checkSimulatedErrors('onClientResponse', request);
	// ... onClientResponse logic ...
}
```

# Add responseProvider to enhanced debug headers

When sending both the standard Pragma: `akamai-x-ew-debug-rp` request header and a valid enhanced debug header the response contains a multi-part response. The debug output for `responseProvider` is appended to the end of the body as the second part of a multi-part stream. 

When enhanced debugging for `responseProvider` is enabled the following behavior changes also occur:

- Caching is bypassed to prevent the body with debug data from being stored in cache and delivered to other users.
- `AK_EDGEWORKERS_RP_STATUS` will always report success, preventing `responseProvider` errors from being detectable by Property Manager.

For more information see [Enable enhanced debug headers for responseProvider](doc:enable-enhanced-debug-headers-for-responseprovider).

# Bypass failover for testing

When testing and troubleshooting your EdgeWorkers code, you may want to bypass failover logic to see the original error and debug headers.  It can be useful to bypass all Property Manager failover logic, including EdgeWorkers failover, if a specific query parameter is present. 

For example, use the match condition below around the EdgeWorkers failover logic to see the original error if the query string `bypass-failover=true` is present.

 ![Bypass failover](https://techdocs.akamai.com/edgeworkers/img/bypass-failover-v1.png)
