---
title: "Product limits"
slug: "limitations"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 14:07:55 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Mar 03 2025 12:45:18 GMT+0000 (Coordinated Universal Time)"
---
Keep these limitations in mind when designing your EdgeWorkers functions. These limitations apply to all EdgeWorkers functions regardless of the selected [resource tier](select-a-resource-tier.md).

You can also refer to the [limitations](resource-tier-limitations.md) that are applied based on the resource tier you selected for your EdgeWorker ID.
| Description | Limit |
| --- | --- |
| Supported delivery products | Ion<br/>Dynamic Site Accelerator (DSA)<br/>Adaptive Media Delivery<br/>Download Delivery<br/>Object Delivery<br/>API Acceleration |
| Supported delivery method | [Enhanced TLS](https://techdocs.akamai.com/property-mgr/docs/prepare-your-edge-certificates#understand-the-levels-of-security) - When you've applied a custom certificate to a property configuration, the associated Edge hostname uses the `.edgekey.net` domain.<br/><br/>Standard TLS, used to serve non PCI compliant traffic over HTTP or HTTPS via an `edgesuite.net`  and `akamaized.net` edge hostname, is also supported.<br/><br/>EdgeWorkers is not supported on {{COMPANY_NICKNAME}} CDNs created to accommodate unique regional or governmental requirements. This limitation currently includes China CDN. |
| Execution restrictions on the Enhanced TLS network | To execute an EdgeWorkers function using an [ESI (Edge Side Includes)](https://techdocs.akamai.com/property-mgr/docs/esi-edge-side-includes) fragment request you need to add a [user-defined variable](https://techdocs.akamai.com/property-mgr/docs/user-defined-vars) to your EdgeWorkers rule.<br/><br/>Add `PMUSER_ENABLE_EW_ESI_FRAG` and set it to `true`.<br/>The name of the variable must be UPPERCASE.<br/><br/>**Note:** The user-defined variable is not required if you are using the Standard TLS delivery method. |
| Number of EdgeWorker IDs executed per request | 1 |
| Maximum number of EdgeWorker IDs per account | 200 |
| Maximum number of versions per EdgeWorker ID | 1000 |
| Maximum number of activations each minute on a network per account | 20 |
| Maximum number of activations each day per account | 500 |
| Compressed size for a code bundle | 512 KB |
| Uncompressed size for a code bundle | 1 MB |
| Maximum response header size for HTTP sub-requests | 8192 bytes |
| Maximum body size for responses created using the `respondWith()` method | 2048 characters |
| Maximum body size for responses from origin to an EdgeWorkers function, using [`httpRequest()`](http-request.md#httprequest) | 128 KB when using [`json()`](http-request.md#json) or [`text()`](http-request.md#text) to buffer the entire response.<br/><br/>5 MB when using [`body`](http-request.md#body) to read the response as a stream. |
| Maximum body size for responses from an EdgeWorkers function to a browser when the response is passed through as a string | 100,000 bytes if you pass a string to [`createResponse`](create-response.md#createresponse) in `responseProvider`<br/><br/>No direct limit if you pass a [stream](streams.md)  to [`createResponse`](create-response.md#createresponse) in `responseProvider`. |
| Maximum body size for responses from an EdgeWorkers function to a client browser | 2048 characters if you use [`request.respondWith()`](request-object.md#respondwith)  in the `onClientRequest` or `onClientResponse` event handler. |
| Maximum body size when [`request.text()`](request-object.md#text) or [`request.json()`](request-object.md#json) is called in the `responseProvider` event handler | 16 KB |
| Maximum streaming request body size when [`request.body`](request-object.md#body) is called in the `responseProvider` event handler | 1 MB |
| Maximum size of the response status and header for responses generated using [`createResponse`](create-response.md) | 8 KB |


## subWorkers limits

These limits apply to [subWorkers](create-a-subworker.md) in addition to the limits documented above.
| Description | Example | Limit |
| --- | --- | --- |
| Maximum **tree depth** for<br/>`onClientRequest`<br/>`onOriginRequest`<br/>`onOriginResponse`<br/>`onClientResponse` | The maximum number of nested subWorkers allowed for a single root sub-request.<br/><br/>For example, an EdgeWorker issues a subWorker that triggers:<br/>->subWorker EW1 that has a subWorker that triggers<br/>-->subWorker EW2 → **maximum depth reached** | 2 |
| Maximum number of **subWorker event-handlers** in a tree for<br/>`onClientRequest`<br/>`onOriginRequest`<br/>`onOriginResponse`<br/>`onClientResponse` | The maximum number of subWorker event-handlers\*\* \*\*allowed for a single root EdgeWorker.<br/><br/>For example, an EdgeWorker issues SR1 that triggers:<br/>->subWorker EW1 with only one event handler implemented that issues SR2, SR3, and SR4, SR5 each triggering<br/>-->subWorkers EW2, EW3, EW4, EW5, each with also one event handler<br/><br/>An EdgeWorker issues a SR1 that triggers<br/>->subWorker EW1 that implements four event handlers, one of the event handler issues a SR2 that triggers<br/>-->subWorkers EW2 that implements one event handler | 5 |
| Maximum **tree depth** for `responseProvider` | The maximum number of nested subWorkers allowed for a single root sub-request.<br/><br/>For example, an EdgeWorker issues a subWorker that triggers:<br/>->subWorker EW1 that has a subWorker that triggers<br/>-->subWorker EW2 → **maximum depth reached** | 2 |
| Maximum number of **subWorker event handlers** in a tree for `responseProvider` | The maximum number of subWorker event-handlers\*\* \*\*allowed for a single root EdgeWorker.<br/><br/>For example, an EdgeWorker issues SR1 that triggers:<br/>->subWorker EW1 with only one event handler implemented that issues SR2, SR3, and SR4, SR5 each triggering<br/>-->subWorkers EW2, EW3, EW4, EW5, each with also one event handler<br/><br/>An EdgeWorker issues a SR1 that triggers<br/>->subWorker EW1 that implements four event handlers, one of the event handler issues a SR2 that triggers<br/>-->subWorkers EW2 that implements one event handler |  5 |


> 📘 Implicit wall time limit of the parent EdgeWorker
> 
> If the parent EdgeWorker uses too much wall time waiting for the subWorker to respond, the request will time out. This terminates the request from the original browser.

## Flexible composition limits

These limits apply to EdgeWorkers functions created using flexible composition. 

> 📘 The  existing [Product](limitations.md) and [Resource tier](resource-tier-limitations.md) limits also apply to the parent EdgeWorker and to all of the parent's child EdgeWorkers. The limits do not apply individually to each EdgeWorker in a combined code bundle.
| Description | Example | Limit           |
| --- | --- | --- |
| Maximum dependency tree height from the top-level parent of an active revision | The supported depth of the dependency tree. The number of levels of child EdgeWorkers that a top-level parent can import.<br/>For example, parent EdgeWorker version 1, imports:<br/>-> EdgeWorker 2 version 1 imports<br/>-- > EdgeWorker 3 version 1 imports<br/>---> EdgeWorker 4 version 2  imports → **maximum height reached** | 3 |
| Maximum direct dependencies that can be imported by a parent revision | The number of child EdgeWorkers that a top-level parent can directly import.<br/>For example, parent EdgeWorker version 1, revision 3 imports as direct children:<br/><br/>- EdgeWorker 1<br/>- EdgeWorker 2<br/>- EdgeWorker 3<br/>- EdgeWorker 4<br/>- EdgeWorker 5 → **maximum imports reached** | 5 |
| Number of times an active version can be imported by an active revision | The number of parent EdgeWorkers an active child EdgeWorker version can belong to.<br/>For example, EdgeWorker 1, version 1 is imported by:<br/><br/>- EdgeWorker 2 version 1, revision 1<br/>- EdgeWorker 3 version 1, revision 1<br/>- EdgeWorker 4 version 1, revision 2 → **maximum number of parents reached** | 3 |
| Maximum dependencies per revision | The number of dependencies a parent EdgeWorkers function supports, including children and descendants of children. | 30 |
| Compressed size for a combined code bundle |  | 1 MB |
| Uncompressed size for a combined code bundle |  | 5 MB |


> 📘 Refer to the [Terminology](terminology.md) section in this guide to learn more about the concepts and terms used for flexible composition.

## Limits for JavaScript logs delivered via DataStream 2

These limits apply when you use [DataStream 2 to deliver JavaScript logs](ds2-javascript-logging.md).

| Description                                                                                              | Limit                                      |
| :------------------------------------------------------------------------------------------------------- | :----------------------------------------- |
| Maximum number of logging level change each minute on a network per account                              | 20                                         |
| Maximum number of logging messages delivered via DataStream 2 each second on a network per EdgeWorker ID | 250 messages per second, per EdgeWorker ID |
| Maximum size of a logging message                                                                        | 1 KB                                       |
| Log entry timestamp                                                                                      | Time of execution start                    |
