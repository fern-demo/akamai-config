---
title: "Send analytic beacons without waiting for a response"
slug: "fire-and-forget"
---
In this example you'll learn how to configure an EdgeWorkers function that sends a separate analytic beacon for each request. If the request is DENIED by the Web Application Firewall (WAF) or directed to a static resource, the beacon is not sent.

You can send a beacon from an EdgeWorkers function without waiting for the response to avoid impact to the Time to first byte (TTFB). When an event handler is exited any uncompleted promises are left behind. The EdgeWorkers service then attempts to complete the promise within the [sub-request timeout limits](resource-tier-limitations.md). You can invoke multiple sub-requests in parallel. Sub-requests made in parallel are also subject to these limits.

# 1. EdgeWorkers code example

This EdgeWorkers code example shows how you can send beacons to an expected endpoint with proper content.  The beacon is sent early in the request flow, when the `onClientRequest` event is invoked.

```javascript
import { httpRequest } from 'http-request';

export function onClientRequest(request) {
    // Build beacon to be collected
    const beacon = {
        event: "request",
        path: request.path,
        country: request.userLocation.country,
    };
    
    // Fire and forget: do not await promise
    httpRequest("/event", {
        method: "POST",
        headers: {
            'Content-Type': ['application/json;charset=utf-8'],
        },
        body: JSON.stringify(beacon),
    });
}
```

# 2. Add match criteria

Add the following match criteria to the rule in your property where you've added the EdgeWorkers behavior.

It enables the EdgeWorkers function only for a selected list of file extensions. This prevents it from running on static resources.

> 📘 By default, the EdgeWorkers function is not executed on a DENIED request. There is no specific implementation for this requirement.

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/fireAndForgetMatch-v1.png" alt="Image"/>
</Frame>


# 3. Reporting and debugging

If you integrate [DataStream 2 logs](datastream-2-integration.md) you'll see the sub-request status in the `r` line of the `Akamai edge server flow` field of the [DataStream 2 execution details](datastream2-reports.md#edgeworkers-execution). 

If you're using [enhanced debug headers](enable-enhanced-debug-headers.md) for debugging, you might not see sub-request errors. The response can occur before the sub-request errors. This is likely timing dependent behavior related to whether the sub-request error occurs before or after the main request completes.

When an error occurs on a non-observed promise, the execution continues and the EdgeWorkers reports do no generate an error.

You can also use this pattern to debug.

```javascript
// Fire & forget: do not await.
const beaconPromise = sendBeacon(data);

// Debugging purposes: wait for beacon when specific header is provided
// relevant logs and errors will be reported in EW debug headers
if (request.getHeader("DEBUG-WAIT-BEACON")) {
    await beaconPromise; 
}
```
