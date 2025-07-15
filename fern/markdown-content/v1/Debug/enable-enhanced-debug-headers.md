---
title: "Enhanced debug headers"
slug: "enable-enhanced-debug-headers"
excerpt: ""
hidden: false
createdAt: "Thu May 06 2021 20:21:22 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Mar 07 2025 19:51:15 GMT+0000 (Coordinated Universal Time)"
---
In addition to the standard debug information, enhanced debug headers include a status message and the amount of wall time, CPU time, and memory consumed by the event handler. You can also configure enhanced debug headers to provide information about HTTP sub-requests.

To receive enhanced debugging information about the EdgeWorkers execution in the debug response headers the request must pass:

- An `Akamai-EW-Trace` request header that contains a JSON Web Token (JWT) authentication token. 

- One of the standard Pragma headers. See the [Enable standard debug headers](doc:enable-standard-debug-headers) for more information.

- For `responseProvider` you need to add the `Pragma: akamai-x-ew-debug-rp` header that enables the multi-part response body. See [Enable enhanced debug headers for responseProvider](doc:enable-enhanced-debug-headers-for-responseprovider) for more information.

- To debug HTTP sub-requests you need to add the `Pragma: akamai-x-ew-debug-subs` header to the request.

- To debug subWorkers you need to add the `Pragma: akamai-x-ew-subworkers` header to the request.

Watch this five minute video to learn how to get started debugging your EdgeWorkers code using enhanced debug headers.

[block:html]
{
  "html": "\n<iframe width=\"512\" height=\"288\" src=\"https://www.youtube.com/embed/-aFsvumwfOg\" title=\"Akamai EdgeWorkers | Using Enhanced Debug Headers\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>"
}
[/block]


# Request enhanced debug headers

Follow these steps to generate a JWT authentication token and add enhanced debug headers to your requests. You can also use these steps to re-generate an expired token.

If your configuration includes subWorkers, refer to the details in the [JWT authentication token security for subWorkers](doc:enable-enhanced-debug-headers#jwt-authentication-token-security-for-subworkers) section for more information. 

Before you begin, go to [Akamai CLI for EdgeWorkers](https://github.com/akamai/cli-edgeworkers#readme) for instructions on how to install the EdgeWorkers package. You'll also find an overview of commands you can use to manage your EdgeWorkers. 

Make sure to follow the instructions in the [Get Started with APIs](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) documentation. These instructions apply to both Akamai APIs and Akamai CLIs. You need to authenticate your CLI requests using EdgeGrid, a proprietary authentication system for APIs deployed through Akamai Control Center.

> 👍 You can also use the EdgeWorkers API to [generate an authentication token](ref:post-secure-token).

> 👍 Review the [enhanced debug header details](doc:enhanced-debug-header-details) documentation to learn more about the response debug fields and to view examples.

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

2. Activate your EdgeWorkers code bundle.

3. To receive enhanced debugging information, add a request header to your requests. The `akamai-x-ew-debug` Pragma header includes debugging information for the `onClientRequest`, `onClientResponse`, `onOriginRequest`, and `onOriginResponse` event handlers. 

The `akamai-x-ew-log` header provides log delivery information via response headers. You can also optionally use the `akamai-x-ew-log-level: %log_level%` header to specify which severity message to include in the enhanced debug headers. The available log levels, in ascending order of severity, are `trace`, `debug`, `info`, `warn`, and `error`. For more information, refer to the [log](doc:log) built-in module.

```curl
curl "http://www.example.com" -H 'Pragma: akamai-x-ew-debug' -H 'akamai-x-ew-log' -H 'akamai-x-ew-log-level: error' -H 'Akamai-EW-Trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Yw
```

Here's an example of enhanced debug information.

```http
HTTP/2 200
content-type: application/json
date: Fri, 18 Dec 2023 21:05:28 GMT
content-length: 65
server-timing: cdn-cache; desc=HIT
server-timing: edge; dur=2153
x-akamai-edgeWorker-onclientresponse-log: ew=<your EdgeWorker ID> v1.0:example; status=Success; status_msg=-; res_tier=200; wall_time=0.500; cpu_time=0.400; memory_usage=2464
x-akamai-edgeworker-onclientrequest-log: E:main.js:16 Logging a message with logger.error
x-akamai-edgeworker-onclientrequest-info: ew=<your EdgeWorker ID> v1.0:example; status=UnimplementedEventHandler; status_msg=-; wall_time=0; cpu_time=0; memory_usage=229836
```

# JWT authentication token security for subWorkers

If your subWorkers make calls to EdgeWorkers in different accounts you need to add an `Akamai-EW-Trace` request header that contains a JSON Web Token (JWT) authentication token for each account. See [Specify multiple trace headers](doc:enable-enhanced-debug-headers#specify-multiple-trace-headers) for more information.

To keep the `Akamai-EW-Trace` tokens secure, headers are automatically removed from sub-requests:

- When a request is made to a property not encoded in the JWT authentication token. Any tokens are automatically removed from the request before running the property's metadata.
- When the sub-request leaves the Akamai network and goes to origin.

Since tokens are removed when the sub-request crosses accounts, if a second sub-request is made again to another account, then that "grand-child" sub-request will not have appropriate trace headers for enhanced debugging. Review the following example for more information.

There are three properties on three accounts with trace headers EW-Trace-1, EW-Trace-2, and EW-Trace-3. When a request is made to Property A on account 1, that specifies all three trace headers:

- All three headers are present on the initial request in account 1.
- It makes a sub-request to a property on account 2, and forwards the trace headers.

  - As the request enters account 2, it removes any trace headers for other accounts, leaving only account 2.
  - A sub-request to a grand-child property account 3 that forwards the trace headers.
    - As the request enters account 3, it removes trace headers for other accounts, leaving no trace headers.
  - Additional sub-requests to other grand-child properties which belong to account 2 will keep their EW-Trace-2 token.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/multiAccoutDebugsubWorkers-v4.jpg",
        null,
        ""
      ],
      "align": "center",
      "sizing": "2500px",
      "border": true
    }
  ]
}
[/block]


> 📘 An `Akamai-EW-Trace` token can only be used in one other account. If, however, all properties belong to the same account, then the JWT tokens can propagate through the entire sub-request chain.

## Specify multiple trace headers

SubWorkers let you make requests to EdgeWorkers created in different properties or accounts.

You need to specify an additional trace header for each separate property in an enhanced debug request header. For more information on how to create a JWT token, go to the [Enhanced debug headers](doc:enable-enhanced-debug-headers#request-enhanced-debug-headers) section in this guide.

To do this, add a second `Akamai-EW-Trace` header to the request.

```curl
curl -i 'http://example.com' -H 'Akamai-EW-Trace: eyJhbGc...ZXrg'  \
                             -H 'Akamai-EW-Trace: eyJ0eXA...bdqQ'  \
                             -H 'Pragma: akamai-x-ew-subworkers,akamai-x-ew-debug' ...

```

EdgeWorkers requests automatically enable enhanced debugging if any of the `Akamai-EW-Trace` headers match  and forwards the headers when the sub-request is invoked.

> 📘 There are limits imposed on the size the debug response headers. When the limit is exceeded the results are  truncated. A truncated response header ends with a '$' character and is not always the last header.
> 
> For more information review the [Javascript Logging](https://techdocs.akamai.com/edgeworkers/docs/enable-javascript-logging) details and [DS2 limits](https://techdocs.akamai.com/edgeworkers/docs/limitations#limits-for-javascript-logs-delivered-via-datastream-2).

```http
HTTP/1.1 200 OK  
Content-Type: text/html  
Content-Length: 18  
Expires: Thu, 25 Jan 2024 15:46:27 GMT  
Cache-Control: max-age=0, no-cache, no-store  
Pragma: no-cache  
Date: Thu, 25 Jan 2024 15:46:27 GMT  
Connection: keep-alive  
X-Akamai-EdgeWorker-onClientResponse-Info-10e29: ew=1275767709 v:swparent; status=UnimplementedEventHandler  
X-Akamai-Edgeworker-Subrequests-10e29: ew=1275767709; evt=CReq; id=1; method=GET; url="<http://127.0.0.1/?x=sw_root_to_sw_child">; rsp=200; dur=13; req_id=10e2a  
X-Akamai-EdgeWorker-onClientRequest-Info-10e29: ew=1275767709 vc14e39809f55f159475c12f9b06ba671_2:swparent; status=Success; status_msg=-; res_tier=200; init_wall_time=3.176; wall_time=13.345; init_cpu_time=3.176; cpu_time=1.034; memory_usage=208836  
x-akamai-edgeworker-onclientrequest-info-10e2a.10e29: ew=1281938257 v2:swchild; status=Success; status_msg=-; res_tier=200; init_wall_time=0.235; wall_time=0.338; init_cpu_time=0.218; cpu_time=0.221; memory_usage=10352  
...  
x-akamai-edgeworker-onclientrequest-log-10e2a.10e29: D:main.js:6 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat vestibulum metus, quis aliquet ex vestibulu........eu orci facilisi$
```
