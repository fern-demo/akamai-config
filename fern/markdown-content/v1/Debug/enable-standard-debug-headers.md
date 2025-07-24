---
title: "Standard debug headers"
slug: "enable-standard-debug-headers"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Thu May 06 2021 20:08:17 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Feb 15 2023 15:52:33 GMT+0000 (Coordinated Universal Time)"
---
To enable request-level debugging you need to include an Akamai Pragma header in the request.

A request that includes an Akamai Pragma header returns the related trace response headers. The Standard debug header provides details and the status type of the EdgeWorkers function executed during the request or response.

> 👍 See [Enable enhanced debug headers](enable-enhanced-debug-headers.md) for instructions on how to return more detailed response headers that include a status message and the amount of wall time, CPU time, and memory usage consumed by the event handler. Enhanced debug headers can also provide information about HTTP sub-requests.

Watch this four minute video to learn how to get started debugging your EdgeWorkers code using standard debug headers.
<iframe width="512" height="288" src="https://www.youtube.com/embed/-mvpdqwYsmA?list=PLDlttLRccCk5klAIiA5UlAWUsUFW8r7RN" title="EdgeWorkers Standard Debugging" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


You can add one or more of the following  Akamai Pragma headers to your request:

| Akamai Pragma Header           | Returns debug information from                                                                      |
| :----------------------------- | :-------------------------------------------------------------------------------------------------- |
| `akamai-x-ew-debug`            | the `onClientRequest`, `onClientResponse`, `onOriginRequest`, and `onOriginResponse` event handlers |
| `akamai-x-ew-debug-rp`         | only the `responseProvider` event handler                                                           |
| `akamai-x-ew-debug-subs`       | all event handlers when an HTTP sub-request is made                                                 |
| `akamai-x-ew-onclientrequest`  | only the `onClientRequest` event handler                                                            |
| `akamai-x-ew-onoriginrequest`  | only the `onOriginRequest` event handler                                                            |
| `akamai-x-ew-onoriginresponse` | only the `onOriginResponse` event handler                                                           |
| `akamai-x-ew-onclientresponse` | only the `onClientResponse` event handler                                                           |
