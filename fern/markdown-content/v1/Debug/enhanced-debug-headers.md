---
title: "Enhanced debug headers"
slug: "enhanced-debug-headers"
excerpt: ""
hidden: true
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Feb 06 2023 17:08:01 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Feb 15 2023 14:04:42 GMT+0000 (Coordinated Universal Time)"
---
In addition to the standard debug information, enhanced debug headers include a status message and the amount of wall time, CPU time, and memory consumed by the event handler. You can also configure enhanced debug headers to provide information about HTTP sub-requests.

To receive enhanced debugging information about the EdgeWorkers execution in the debug response headers the request must pass:

- An `Akamai-EW-Trace` request header that contains a secure JSON Web Token (JWT) authentication token. 

- One of the standard Pragma headers. See the [Enable standard debug headers](enable-standard-debug-headers.md) for more information.

- For `responseProvider` you need to add the `Pragma: akamai-x-ew-debug-rp` header that enables the multi-part response header. See [Enable enhanced debug headers for responseProvider](enable-enhanced-debug-headers-for-responseprovider.md) for more information.

- To debug HTTP sub-requests you need to add the `Pragma: akamai-x-ew-debug-subs` header to the request.

# Request enhanced debug headers

Follow these steps to generate a JWT authentication token and add enhanced debug headers to your requests. You can also use these steps to re-generate an expired token. 

Before you begin, go to [Akamai CLI for EdgeWorkers](https://github.com/akamai/cli-edgeworkers#readme) for instructions on how to install the EdgeWorkers package. You'll also find an overview of commands you can use to manage your EdgeWorkers. 

Make sure to follow the instructions in the [Get Started with APIs](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) documentation. These instructions apply to both Akamai APIs and Akamai CLIs. You need to authenticate your CLI requests using EdgeGrid, a proprietary authentication system for APIs deployed through Akamai Control Center.

> 👍 You can also use the EdgeWorkers API to [generate an authentication token](ref:post-secure-token).

> 👍 Review the [enhanced debug header details](enhanced-debug-header-details.md) documentation to learn more about the response debug fields and to view examples.

1. Use this EdgeWorkers CLI command to generate a JWT authentication token. In this example we set the token expiry to 60 minutes for the `www.example.com` hostname.

   By default, the token expiry is set at 480 for 8 hours. You can set the token expiry to a value between 1 to 720 minutes.

```shell
akamai edgeworkers auth --expiry 60 www.example.com
```

Here’s an example of a response.

```shell
Creating auth token ... /
------------------------------------------------------------------------------------------------------------------------------------------------
Add the following request header to your requests to get additional trace information.
Akamai-EW-Trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Yw
------------------------------------------------------------------------------------------------------------------------------------------------
```

> 📘 You need to provide the EdgeWorkers CLI with API access to the hostname in the request. Without this access the command will fail to provide a valid debug header. For more information refer to the  [Get Started with APIs](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) documentation.

2. Active your EdgeWorkers code bundle.

3. To receive enhanced debugging information add the following request header to your requests.

```curl
curl "http://www.example.com" -H 'Pragma: akamai-x-ew-debug' -H 'Akamai-EW-Trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Yw
```

Here's an example of enhanced debug information.

```http
HTTP/2 200
content-type: application/json
date: Fri, 16 Oct 2022 21:05:28 GMT
content-length: 65
server-timing: cdn-cache; desc=HIT
server-timing: edge; dur=2153
x-akamai-edgeWorker-onclientresponse-log: D:main.js:16 iron\r\nx-akamai-edgeworker-onclientresponse-info: ew=<your EdgeWorker ID> v1.0:example; status=Success; status_msg=-; res_tier=200; wall_time=0.500; cpu_time=0.400; memory_usage=2464
x-akamai-edgeworker-onclientrequest-info: ew=<your EdgeWorker ID> v1.0:example; status=UnimplementedEventHandler; status_msg=-; wall_time=0; cpu_time=0; memory_usage=229836
```
