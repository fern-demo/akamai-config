---
title: "Known issues"
slug: "known-issues"
excerpt: ""
hidden: false
createdAt: "Mon Jun 14 2021 15:11:40 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Jul 09 2024 00:01:01 GMT+0000 (Coordinated Universal Time)"
---
<br/>

## Site Failover and responseProvider built-in variable

When you include the `responseProvider` debug Pragma header, `akamai-x-ew-debug-rp` in the request, the **AK_EDGEWORKERS_RP_STATUS** built-in variable:

- Returns an inaccurate status. 
- Indicates success, even on a failure. 
- Prevents the [Site Failover](site-failover.md) behavior from responding to an EdgeWorkers failover accurately.

To resolve this issue you need to remove the `akamai-x-ew-debug-rp` Pragma header when testing Site Failover. 

## Application Load Balancer and Site Failover

To set the failover host to the true incoming URL you need to add the **AK_HOST** built-in variable before it is modified by [Application Load Balancer](https://techdocs.akamai.com/cloudlets/docs/gs-app-load-balancer-cloudlet). 

## Variable propagation to onClientResponse

Cache hierarchy metadata variables set with `request.setVariable()` in `onOriginResponse` do not propagate to `onClientResponse`.

Cache hierarchy categorizes the bytes served to the client by the forward server type that sent them. 

## cacheKey modifications and Phased Release Cloudlet

When the [Phased Release Cloudlet](https://techdocs.akamai.com/cloudlets/docs/what-is-phased-release) is included in a request, [cacheKey modifications](cachekey-object.md) are not applied.

If both Phased Release and EdgeWorkers are working on the same request the last behavior in the property (from a top-to-bottom perspective) controls the forward path and forward origin routing. This is expected behavior.

## EdgeWorkers cannot be invoked from within a Conditional Origin rule

The EdgeWorkers behavior must be placed before Conditional Origin behaviors in Property Manager rules.

> 📘 An EdgeWorkers function can be used to select a [Conditional Origin](https://techdocs.akamai.com/cloudlets/docs/about-conditional-origins) using [`request.route()`](request-object.md#route) within the `onClientRequest` event handler.

## Bot Manager Premier interoperability

[Bot Manager Premier](https://techdocs.akamai.com/native-app-traffic-protect-sdk/docs) applies detections related to transactional URL endpoints:

- After the execution of the `onClientRequest` event handler.
- Before the execution of the `onOriginRequest`, `onOriginResponse`, `onClientResponse`, and `responseProvider` event handlers.

The partial execution of EdgeWorkers event handlers may result in unexpected logic if the Bot Manager Premier response action is set to **Deny**.

### Bot Manager Premier and mPulse issues with sub-requests

You need to exclude mPulse and Bot Manager Premier from sub-request traffic when using the `responseProvider` event handler. 

When mPulse and Bot Manager Premier are not excluded, Bot Manager Premier is not properly applied for the following types of requests:

- When the `responseProvider` event handler is used as a proxy with sub-requests.
- When the `responseProvider` event handler applies Bot Manager Premier and mPulse to a sub-request.

For example, a client request made using the code sample below will not apply Bot Manager Premier properly.

```javascript
async function responseProvider(request) {
    // perform an httpRequest to the same URL
    const response = await httpRequest(request.url, {
        method: request.method,
        headers: requestHeaders,
        body: request.body,
    });
 
    /*
        Perform some additional processing of the response at this point and then return the modified response
    */
 
    return createResponse(response.status, getSafeResponseHeaders(response.getHeaders()), response.body);
}
```

To solve this issue, exclude mPulse from running on the sub-request type.  You can configure this in a Property Manager rule that matches on the `EW_SUBREQUEST` Request Type.

 <Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/DisableMPulseOnSubrequest-v1.jpg" alt="Bot Manager known issue"/>
</Frame>

## Requests forwarded to NetStorage require the CP Code Root

To forward a request to [NetStorage](https://techdocs.akamai.com/netstorage/docs) using the [route()](request-object.md#route) function, you need to include the [CP Code Root](https://techdocs.akamai.com/netstorage/docs/create-an-upload-account#upload-directory-association) in the NetStorage path.

 <Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/netStorageKnownIssue-v1.jpg" alt="NetSorage Known Issue"/>
</Frame>

A _403 Forbidden_ error will occur if the path doesn't include the CP Code Root.

In the example below [CP Code Root] is the value for the storage group you're using. [Content Path] is the path to the content on NetStorage.

```javascript
export function onClientRequest(request) {
    var destination1 = {origin: 'origin1', path: '/[CP Code Root]/[Content Path]'}
    request.route(destination1);
```

## Use Billing Center for accurate EdgeWorkers event data

To check the actual number of EdgeWorkers events invoked on the network, refer to the data reported in the [Billing Center](https://control.akamai.com/apps/billing/#/bills/your-bills).

You can use EdgeWorkers execution [reports](manage-report-data.md) to analyze resource consumption metrics such as the CPU execution time, memory usage, and success/error ratio related to your EdgeWorkers functions.

During periods of network congestion, the metrics streaming into the data warehouse may be dropped. When metrics are dropped, the number of EdgeWorkers events invoked displayed in the EdgeWorkers reports may be less than the official amount.

## Response status not updated when Quick-IMS and Fast-IMS enabled

When you enable Quick-IMS or Fast-IMS on your Akamai edge servers the 200 response status remains in cache. When a subsequent request generates a "304 Not Modified" response after the metadata stage, the original 200 response isn’t replaced.

## Reporting impact when Prefetch Objects and EdgeWorkers both enabled

You can enable both the [Prefetch objects](https://techdocs.akamai.com/property-mgr/docs/prefetching) and the EdgeWorkers behaviors on the same property. If you do so, the total number of EdgeWorkers executions in the EdgeWorkers [Overview report](overview-report.md) may be higher than the **Total edge hits** in the [Traffic report](https://techdocs.akamai.com/reporting/docs/traffic-rpts#traffic-report). This is because EdgeWorkers execute on internal prefetch requests that are not included in the **Total edge hits** of the [Traffic report](https://techdocs.akamai.com/reporting/docs/traffic-rpts#traffic-report).

Prefetching content for sub-requests is not supported.

## EdgeWorkers CLI version support for authentication tokens

To [Create an EdgeWorkers Authentication Token](https://github.com/akamai/cli-edgeworkers#create-an-edgeworkers-authentication-token) you need at least version 1.7.1 of the [EdgeWorkers CLI](https://github.com/akamai/cli-edgeworkers).

> 📘 You can use the `-V, --version` command to display the current version number of the EdgeWorkers CLI.

## subWorkers - fire and forget sub-requests

 An `httpRequest` made without awaiting the response returns subWorker debug headers that may not be collected and returned on the main request. 

This is because the event may complete before the main request processing is complete and before the sub-request response resolves the promise. In addition, any sub-requests made after the event has completed will not appear in the debug output.

```javascript
import { httpRequest } from 'http-request';
export async function onClientRequest(request) {
    // This promise is not awaited
    httpRequest('http://example.org/backend', { method: "POST" }).then((response) => { 
        response.text().then((text) => {
            let [callbackUrl] = request.getHeader('callback-url');
  
            // Perform a second subrequest
            return httpRequest(callbackUrl, {
                method: 'POST',
                headers: { 'content-type': 'text/plain' },
                body: text,
            });
        });
    });
}
```

## subWorkers - using responseProvider and respondWith

In the example below the EdgeWorker uses the `respondWith` method and sets the response headers from a sub-request as the headers.

> 📘 This behavior also applies to EdgeWorkers that use `responseProvider` and `createResponse`.

```javascript
export async function onClientRequest (request)  
{  
    let response = await httpRequest('<http://example.com'>, {headers: {"MyHeader": ["value"]}});  
    request.respondWith(response.status, response.getHeaders(), 'OCR \\n');  
}
```

- If the sub-request runs a subWorker, and uses the `akamai-x-ew-subworkers` pragma, then that sub-request response will include trace and log headers from the subWorker.
- The subWorker trace headers will appear twice in the main response:
  - Once directly when returned on the sub-request. 
  - The headers will appear again, when they are forwarded by subWorker debug support, which adds the parent request ID.

```http
x-akamai-edgeworker-onclientresponse-info-2f5d6: ew=66938 v:UI1.4.1Test; status=UnimplementedEventHandler  
x-akamai-edgeworker-onclientrequest-info-2f5d6: ew=66938 v1-0-4:UI1.4.1Test; status=Success

x-akamai-edgeworker-onclientrequest-info-2f5d6.2f614: ew=66938 v1-0-4:UI1.4.1Test; status=Success  
x-akamai-edgeworker-onclientresponse-info-2f5d6.2f614: ew=66938 v:UI1.4.1Test; status=UnimplementedEventHandler
```

This also occurs for log headers. The header will header repeat and some may not include the complete request ID chain. If there are multiple levels of subWorkers, a grandparent will see both headers from its child as trace headers. The grandparent will forward both headers to the response.

> 📘 You shouldn't fully copy sub-request response headers to the main response. Some structural headers such as, `'Content-Length'` can break the response.
