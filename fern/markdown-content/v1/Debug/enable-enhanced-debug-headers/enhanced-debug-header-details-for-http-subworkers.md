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
- Include the other pragma headers required for [Enhanced debug headers](enable-enhanced-debug-headers.md).  
- The debugging headers and pragmas are automatically forwarded on any sub-requests made by the EdgeWorker. 
- The debug response headers are collected and returned on the response. 

When you specify `akamai-x-ew-subworkers`, the following set of pragmas and headers are automatically forwarded on sub-requests.
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/multiAccountDebugsubWorkers-v4.jpg" alt="Image"/>
</Frame>
| Forwarded request pragmas |  Response headers |
| --- | --- |
| \*`akamai-x-ew-subworkers`<br/>`akamai-x-ew-debug`<br/>`akamai-x-ew-onclientrequest`<br/>`akamai-x-ew-onclientresponse`<br/>`akamai-x-ew-onoriginrequest`<br/>`akamai-x-ew-onoriginresponse`<br/>`akamai-x-ew-debug-subs`<br/>`akamai-x-ew-debug-rp` | Debug response headers include the request ID.<br/>The request ID identifies the headers associated with specific sub-requests.<br/><br/>`x-akamai-edgeworker-onclientrequest-info`<br/>`x-akamai-edgeworker-onclientresponse-info`<br/>`x-akamai-edgeworker-onoriginrequest-info`<br/>`x-akamai-edgeworker-onoriginresponse-info`<br/>`x-akamai-edgeworker-onclientrequest-log`<br/>`x-akamai-edgeworker-onclientresponse-log`<br/>`x-akamai-edgeworker-onoriginrequest-log`<br/>`x-akamai-edgeworker-onoriginrequest-log`<br/>`x-akamai-edgeworker-subrequests` |


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

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/debugsubWorkers-v2.jpg" alt="Image"/>
</Frame>


## Response header fields for subWorkers

In addition to the [HTTP sub-request](enhanced-debug-header-details-for-http-sub-requests.md) header fields the `req-id` field is also included when you add the `akamai-x-ew-subworkers` pragma header to a request.
| Response header field | Details | Description |
| --- | --- | --- |
| subWorker request ID<br/>req_id=`<req_id>` | `<req_id>` | Identifier for the request that issued the subWorker. |

