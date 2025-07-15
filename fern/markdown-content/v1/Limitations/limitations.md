---
title: "Product limits"
slug: "limitations"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 14:07:55 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Mar 03 2025 12:45:18 GMT+0000 (Coordinated Universal Time)"
---
Keep these limitations in mind when designing your EdgeWorkers functions. These limitations apply to all EdgeWorkers functions regardless of the selected [resource tier](doc:select-a-resource-tier).

You can also refer to the [limitations](doc:resource-tier-limitations) that are applied based on the resource tier you selected for your EdgeWorker ID.

[block:parameters]
{
  "data": {
    "h-0": "Description",
    "h-1": "Limit",
    "0-0": "Supported delivery products",
    "0-1": "Ion  \nDynamic Site Accelerator (DSA)  \nAdaptive Media Delivery  \nDownload Delivery  \nObject Delivery  \nAPI Acceleration",
    "1-0": "Supported delivery method",
    "1-1": "[Enhanced TLS](https://techdocs.akamai.com/property-mgr/docs/prepare-your-edge-certificates#understand-the-levels-of-security) - When you've applied a custom certificate to a property configuration, the associated Edge hostname uses the `.edgekey.net` domain.  \n  \nStandard TLS, used to serve non PCI compliant traffic over HTTP or HTTPS via an `edgesuite.net`  and `akamaized.net` edge hostname, is also supported.  \n  \nEdgeWorkers is not supported on <<COMPANY_NICKNAME>> CDNs created to accommodate unique regional or governmental requirements. This limitation currently includes China CDN.",
    "2-0": "Execution restrictions on the Enhanced TLS network",
    "2-1": "To execute an EdgeWorkers function using an [ESI (Edge Side Includes)](https://techdocs.akamai.com/property-mgr/docs/esi-edge-side-includes) fragment request you need to add a [user-defined variable](https://techdocs.akamai.com/property-mgr/docs/user-defined-vars) to your EdgeWorkers rule.  \n  \nAdd `PMUSER_ENABLE_EW_ESI_FRAG` and set it to `true`.  \nThe name of the variable must be UPPERCASE.  \n  \n**Note:** The user-defined variable is not required if you are using the Standard TLS delivery method.",
    "3-0": "Number of EdgeWorker IDs executed per request",
    "3-1": "1",
    "4-0": "Maximum number of EdgeWorker IDs per account",
    "4-1": "200",
    "5-0": "Maximum number of versions per EdgeWorker ID",
    "5-1": "1000",
    "6-0": "Maximum number of activations each minute on a network per account",
    "6-1": "20",
    "7-0": "Maximum number of activations each day per account",
    "7-1": "500",
    "8-0": "Compressed size for a code bundle",
    "8-1": "512 KB",
    "9-0": "Uncompressed size for a code bundle",
    "9-1": "1 MB",
    "10-0": "Maximum response header size for HTTP sub-requests",
    "10-1": "8192 bytes",
    "11-0": "Maximum body size for responses created using the `respondWith()` method",
    "11-1": "2048 characters",
    "12-0": "Maximum body size for responses from origin to an EdgeWorkers function, using [`httpRequest()`](doc:http-request#httprequest)",
    "12-1": "128 KB when using [`json()`](doc:http-request#json) or [`text()`](doc:http-request#text) to buffer the entire response.  \n  \n5 MB when using [`body`](doc:http-request#body) to read the response as a stream.",
    "13-0": "Maximum body size for responses from an EdgeWorkers function to a browser when the response is passed through as a string",
    "13-1": "100,000 bytes if you pass a string to [`createResponse`](doc:create-response#createresponse) in `responseProvider`  \n  \nNo direct limit if you pass a [stream](doc:streams)  to [`createResponse`](doc:create-response#createresponse) in `responseProvider`.",
    "14-0": "Maximum body size for responses from an EdgeWorkers function to a client browser",
    "14-1": "2048 characters if you use [`request.respondWith()`](doc:request-object#respondwith)  in the `onClientRequest` or `onClientResponse` event handler.",
    "15-0": "Maximum body size when [`request.text()`](doc:request-object#text) or [`request.json()`](doc:request-object#json) is called in the `responseProvider` event handler",
    "15-1": "16 KB",
    "16-0": "Maximum streaming request body size when [`request.body`](doc:request-object#body) is called in the `responseProvider` event handler",
    "16-1": "1 MB",
    "17-0": "Maximum size of the response status and header for responses generated using [`createResponse`](doc:create-response)",
    "17-1": "8 KB"
  },
  "cols": 2,
  "rows": 18,
  "align": [
    "left",
    "left"
  ]
}
[/block]


## subWorkers limits

These limits apply to [subWorkers](doc:create-a-subworker) in addition to the limits documented above.

[block:parameters]
{
  "data": {
    "h-0": "Description",
    "h-1": "Example",
    "h-2": "Limit",
    "0-0": "Maximum **tree depth** for  \n`onClientRequest`  \n`onOriginRequest`  \n`onOriginResponse`  \n`onClientResponse`",
    "0-1": "The maximum number of nested subWorkers allowed for a single root sub-request.  \n  \nFor example, an EdgeWorker issues a subWorker that triggers:  \n->subWorker EW1 that has a subWorker that triggers  \n-->subWorker EW2 → **maximum depth reached**",
    "0-2": "2",
    "1-0": "Maximum number of **subWorker event-handlers** in a tree for  \n`onClientRequest`  \n`onOriginRequest`  \n`onOriginResponse`  \n`onClientResponse`",
    "1-1": "The maximum number of subWorker event-handlers\\*\\* \\*\\*allowed for a single root EdgeWorker.  \n  \nFor example, an EdgeWorker issues SR1 that triggers:  \n->subWorker EW1 with only one event handler implemented that issues SR2, SR3, and SR4, SR5 each triggering  \n-->subWorkers EW2, EW3, EW4, EW5, each with also one event handler  \n  \nAn EdgeWorker issues a SR1 that triggers  \n->subWorker EW1 that implements four event handlers, one of the event handler issues a SR2 that triggers  \n-->subWorkers EW2 that implements one event handler",
    "1-2": "5",
    "2-0": "Maximum **tree depth** for `responseProvider`",
    "2-1": "The maximum number of nested subWorkers allowed for a single root sub-request.  \n  \nFor example, an EdgeWorker issues a subWorker that triggers:  \n->subWorker EW1 that has a subWorker that triggers  \n-->subWorker EW2 → **maximum depth reached**",
    "2-2": "2",
    "3-0": "Maximum number of **subWorker event handlers** in a tree for `responseProvider`",
    "3-1": "The maximum number of subWorker event-handlers\\*\\* \\*\\*allowed for a single root EdgeWorker.  \n  \nFor example, an EdgeWorker issues SR1 that triggers:  \n->subWorker EW1 with only one event handler implemented that issues SR2, SR3, and SR4, SR5 each triggering  \n-->subWorkers EW2, EW3, EW4, EW5, each with also one event handler  \n  \nAn EdgeWorker issues a SR1 that triggers  \n->subWorker EW1 that implements four event handlers, one of the event handler issues a SR2 that triggers  \n-->subWorkers EW2 that implements one event handler",
    "3-2": " 5"
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


> 📘 Implicit wall time limit of the parent EdgeWorker
> 
> If the parent EdgeWorker uses too much wall time waiting for the subWorker to respond, the request will time out. This terminates the request from the original browser.

## Flexible composition limits

These limits apply to EdgeWorkers functions created using flexible composition. 

> 📘 The  existing [Product](doc:limitations) and [Resource tier](doc:resource-tier-limitations) limits also apply to the parent EdgeWorker and to all of the parent's child EdgeWorkers. The limits do not apply individually to each EdgeWorker in a combined code bundle.

[block:parameters]
{
  "data": {
    "h-0": "Description",
    "h-1": "Example",
    "h-2": "Limit          ",
    "0-0": "Maximum dependency tree height from the top-level parent of an active revision",
    "0-1": "The supported depth of the dependency tree. The number of levels of child EdgeWorkers that a top-level parent can import.  \nFor example, parent EdgeWorker version 1, imports:  \n-> EdgeWorker 2 version 1 imports  \n-- > EdgeWorker 3 version 1 imports  \n---> EdgeWorker 4 version 2  imports → **maximum height reached**",
    "0-2": "3",
    "1-0": "Maximum direct dependencies that can be imported by a parent revision",
    "1-1": "The number of child EdgeWorkers that a top-level parent can directly import.  \nFor example, parent EdgeWorker version 1, revision 3 imports as direct children:  \n  \n- EdgeWorker 1  \n- EdgeWorker 2  \n- EdgeWorker 3  \n- EdgeWorker 4  \n- EdgeWorker 5 → **maximum imports reached**",
    "1-2": "5",
    "2-0": "Number of times an active version can be imported by an active revision",
    "2-1": "The number of parent EdgeWorkers an active child EdgeWorker version can belong to.  \nFor example, EdgeWorker 1, version 1 is imported by:  \n  \n- EdgeWorker 2 version 1, revision 1  \n- EdgeWorker 3 version 1, revision 1  \n- EdgeWorker 4 version 1, revision 2 → **maximum number of parents reached**",
    "2-2": "3",
    "3-0": "Maximum dependencies per revision",
    "3-1": "The number of dependencies a parent EdgeWorkers function supports, including children and descendants of children.",
    "3-2": "30",
    "4-0": "Compressed size for a combined code bundle",
    "4-1": "",
    "4-2": "1 MB",
    "5-0": "Uncompressed size for a combined code bundle",
    "5-1": "",
    "5-2": "5 MB"
  },
  "cols": 3,
  "rows": 6,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


> 📘 Refer to the [Terminology](doc:terminology) section in this guide to learn more about the concepts and terms used for flexible composition.

## Limits for JavaScript logs delivered via DataStream 2

These limits apply when you use [DataStream 2 to deliver JavaScript logs](doc:ds2-javascript-logging).

| Description                                                                                              | Limit                                      |
| :------------------------------------------------------------------------------------------------------- | :----------------------------------------- |
| Maximum number of logging level change each minute on a network per account                              | 20                                         |
| Maximum number of logging messages delivered via DataStream 2 each second on a network per EdgeWorker ID | 250 messages per second, per EdgeWorker ID |
| Maximum size of a logging message                                                                        | 1 KB                                       |
| Log entry timestamp                                                                                      | Time of execution start                    |
