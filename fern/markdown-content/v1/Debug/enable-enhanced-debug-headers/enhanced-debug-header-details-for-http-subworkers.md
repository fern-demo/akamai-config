---
title: "Enhanced debug header details for subWorkers"
slug: "enhanced-debug-header-details-for-http-subworkers"
excerpt: ""
hidden: false
createdAt: "Sat Apr 06 2024 12:40:08 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Apr 26 2024 11:29:54 GMT+0000 (Coordinated Universal Time)"
---
To receive enhanced debugging information about EdgeWorkers executions on subWorker sub-requests: 

- Pass the `akamai-x-ew-subworkers` pragma header.
- Include the other pragma headers required for [Enhanced debug headers](doc:enable-enhanced-debug-headers).  
- The debugging headers and pragmas are automatically forwarded on any sub-requests made by the EdgeWorker. 
- The debug response headers are collected and returned on the response. 

When you specify `akamai-x-ew-subworkers`, the following set of pragmas and headers are automatically forwarded on sub-requests.

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/multiAccountDebugsubWorkers-v4.jpg",
        null,
        ""
      ],
      "align": "center",
      "sizing": "2300px"
    }
  ]
}
[/block]


[block:parameters]
{
  "data": {
    "h-0": "Forwarded request pragmas",
    "h-1": " Response headers",
    "0-0": "\\*`akamai-x-ew-subworkers`  \n`akamai-x-ew-debug`  \n`akamai-x-ew-onclientrequest`  \n`akamai-x-ew-onclientresponse`  \n`akamai-x-ew-onoriginrequest`  \n`akamai-x-ew-onoriginresponse`  \n`akamai-x-ew-debug-subs`  \n`akamai-x-ew-debug-rp`",
    "0-1": "Debug response headers include the request ID.  \nThe request ID identifies the headers associated with specific sub-requests.  \n  \n`x-akamai-edgeworker-onclientrequest-info`  \n`x-akamai-edgeworker-onclientresponse-info`  \n`x-akamai-edgeworker-onoriginrequest-info`  \n`x-akamai-edgeworker-onoriginresponse-info`  \n`x-akamai-edgeworker-onclientrequest-log`  \n`x-akamai-edgeworker-onclientresponse-log`  \n`x-akamai-edgeworker-onoriginrequest-log`  \n`x-akamai-edgeworker-onoriginrequest-log`  \n`x-akamai-edgeworker-subrequests`"
  },
  "cols": 2,
  "rows": 1,
  "align": [
    "left",
    "left"
  ]
}
[/block]


\*The `akamai-x-ew-subworkers` pragma response includes the `Akamai-EW-Trace` and the `Akamai-X-EW-Subworkers-Log` forward request headers.

Here’s an example of an enhanced debug request header that specifies the `akamai-x-ew-subworkers` pragma header.

```curl
curl -i '<http://example.com'> -H 'Pragma: akamai-x-ew-subworkers,akamai-x-ew-debug,akamai-x-ew-debug-subs,akamai-x-get-request-id' -H 'Akamai-EW-Trace: eyJh...t0ZXrg'
```

This response shows that the main request returned three debug headers annotated with request ID 10f5e61. It indicates that the `onClientRequest` event ran successfully for EdgeWorker ID 1147649205. The `onClientResponse` event was not implemented.

```http
HTTP/1.1 200 OK  
Content-Type: text/html  
Content-Length: 18  
Expires: Wed, 24 Jan 2024 20:32:30 GMT  
Cache-Control: max-age=0, no-cache, no-store  
Pragma: no-cache  
Date: Wed, 24 Jan 2024 20:32:30 GMT  
Connection: keep-alive  
X-Akamai-EdgeWorker-onClientResponse-Info-10f5e61: ew=1147649205 v:swparent; status=UnimplementedEventHandler  
X-Akamai-Edgeworker-Subrequests-10f5e61: ew=1147649205; evt=CReq; id=1; method=GET; url="<http://example.com/?x=sw_root_to_sw_child">; rsp=200; dur=4; req_id=10f5d16  
X-Akamai-EdgeWorker-onClientRequest-Info-10f5e61: ew=1147649205 vc14e39809f55f159475c12f9b06ba671_2:swparent; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=5.453; init_cpu_time=0; cpu_time=0.316; memory_usage=1364  
x-akamai-edgeworker-onclientresponse-info-10f5d16.10f5e61: ew=258567741 v:swchild; status=UnimplementedEventHandler  
x-akamai-edgeworker-onclientrequest-info-10f5d16.10f5e61: ew=258567741 v2:swchild; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=0.187; init_cpu_time=0; cpu_time=0.085; memory_usage=372  
X-Akamai-Request-ID: 10f5e61
```

Note that the `Subrequests` header shows a sub-request from the `onClientRequest` event. 

It has a request ID of 10f5d16 and returned a 200 response. The sub-request also returned two debug headers annotated with request ID 10f5d16. The `onClientRequest` event ran successfully for EdgeWorker ID 258567741 and the `onClientResponse` event was not implemented.

```http
X-Akamai-Edgeworker-Subrequests-10f5e61: ew=1147649205; evt=CReq; id=1; method=GET; url="<http://example.com/?x=sw_root_to_sw_child">; rsp=200; dur=4; req_id=10f5d16
```

<br>

[block:image]
{
  "images": [
    {
      "image": [
        "https://techdocs.akamai.com/edgeworkers/img/debugsubWorkers-v2.jpg",
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


## Response header fields for subWorkers

In addition to the [HTTP sub-request](doc:enhanced-debug-header-details-for-http-sub-requests) header fields the `req-id` field is also included when you add the `akamai-x-ew-subworkers` pragma header to a request.

[block:parameters]
{
  "data": {
    "h-0": "Response header field",
    "h-1": "Details",
    "h-2": "Description",
    "0-0": "subWorker request ID  \nreq_id=`<req_id>`",
    "0-1": "`<req_id>`",
    "0-2": "Identifier for the request that issued the subWorker."
  },
  "cols": 3,
  "rows": 1,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


<br>
