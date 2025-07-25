---
title: "do not use - Debug subWorkers"
slug: "debug-subworkers"
excerpt: "see this page instead https://techdocs.akamai.com/edgeworkers/docs/enhanced-debug-header-details-for-http-subworkers"
hidden: true
createdAt: "Thu Feb 01 2024 13:19:24 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Apr 26 2024 11:38:18 GMT+0000 (Coordinated Universal Time)"
---
## Enhanced debug headers for subWorkers

To receive enhanced debugging information about EdgeWorkers executions on sub-requests: 

- Pass the `akamai-x-ew-subworkers` pragma header.
- Include the other pragma headers required for [Enhanced debug headers](enhanced-debug-headers.md).  
- The debugging headers and pragmas are automatically forwarded on any sub-requests made by the EdgeWorker. 
- The debug response headers are collected and returned on the response. 

When you specify `akamai-x-ew-subworkers`, the following set of pragmas and headers are automatically forwarded on sub-requests.
| Forwarded request pragmas |  Response headers |
| --- | --- |
| \*`akamai-x-ew-subworkers`<br/>`akamai-x-ew-debug`<br/>`akamai-x-ew-onclientrequest`<br/>`akamai-x-ew-onclientresponse`<br/>`akamai-x-ew-onoriginrequest`<br/>`akamai-x-ew-onoriginresponse`<br/>`akamai-x-ew-debug-subs`<br/>`akamai-x-ew-debug-rp` | Debug response headers include the request ID.<br/>The request ID identifies the headers associated with specific sub-requests.<br/><br/>`x-akamai-edgeworker-onclientrequest-info`<br/>`x-akamai-edgeworker-onclientresponse-info`<br/>`x-akamai-edgeworker-onoriginrequest-info`<br/>`x-akamai-edgeworker-onoriginresponse-info`<br/>`x-akamai-edgeworker-onclientrequest-log`<br/>`x-akamai-edgeworker-onclientresponse-log`<br/>`x-akamai-edgeworker-onoriginrequest-log`<br/>`x-akamai-edgeworker-onoriginrequest-log`<br/>`x-akamai-edgeworker-subrequests` |


\*The `akamai-x-ew-subworkers` pragma response includes the `Akamai-EW-Trace` and the `Akamai-X-EW-Subworkers-Log` forward request headers.

Here’s an example of an enhanced debug request header that specifies the `akamai-x-ew-subworker`s pragma header:

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

Note that the `Subrequests` header shows a sub-request from the `onClientRequest` event. It has a request id of 10f5d16 and returned a 200 response. The sub-request also returned two debug headers annotated with request id 10f5d16.10f5e61. The `onClientRequest` event ran successfully for EdgeWorker ID 258567741  and the `onClientResponse` event was not implemented.

```http
X-Akamai-Edgeworker-Subrequests-10f5e61: ew=1147649205; evt=CReq; id=1; method=GET; url="<http://example.com/?x=sw_root_to_sw_child">; rsp=200; dur=4; req_id=10f5d16
```

## JWT authentication token security

If your subWorkers make calls to EdgeWorkers in different accounts you to need to add an `Akamai-EW-Trace` request header that contains a JSON Web Token (JWT) authentication token for each account. See [Specify multiple trace headers](debug-subworkers.md#specify-multiple-trace-headers) for more information.

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

> 📘 A `Akamai-EW-Trace` token can only be used in one other account. If, however, all properties belong to the same account, then the JWT tokens can propagate through the entire sub-request chain.

## Specify multiple trace headers

SubWorkers let you make requests to EdgeWorkers created in different properties or accounts.

You need to specify an additional trace header for each separate property in an enhanced debug request header. For more information on how to create a JWT token, go the [Enhanced debug headers](enable-enhanced-debug-headers.md#request-enhanced-debug-headers)section in this guide.

To do this, add a second `Akamai-EW-Trace` header to the request.

```curl
curl -i 'http://example.com' -H 'Akamai-EW-Trace: eyJhbGc...ZXrg'  \
                             -H 'Akamai-EW-Trace: eyJ0eXA...bdqQ'  \
                             -H 'Pragma: akamai-x-ew-subworkers,akamai-x-ew-debug' ...

```

EdgeWorkers requests automatically enable enhanced debugging if any of the `Akamai-EW-Trace` headers match  and forwards the headers when the sub-request is invoked.

## Response header limits

As the tree of a sub-request grows, so does the potential size of the response headers. There are limits imposed on the total size of headers collected from each of the main request's event handlers. There are also limits on the total size of response headers in the entire request. 

> 🚧 Question from Miranda
> 
> The Response header limits section: question to @Niefer, Andrew  
> There are limits imposed on the number of headers collected from each of the main request's event handlers. There are also limits on the total number of response headers in the entire request.  
> Is it number of headers? Or size of headers? If it’s “number of headers”, then what are those limits?  
> If property modify max response size but we did NOT use PMUSER var to do override, then what takes precedence?

Debug response headers truncate results that exceed these limits. A truncated response header ends with a '$' character and is not always the last header.

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

The overall response header size limit applies to all response headers. It does not just apply to those collected via subWorkers debugging.

> 📘 > 🚧 Please confirm "increases from 32 KB to 48 KB".
> 
> If you specify the `akamai-x-ew-subworkers` pragma, and enable enhanced debugging via the `Akamai-EW-Trace` header, then the maximum size of the response headers for the entire request increases from 32 KB to 48 KB.  If the property is otherwise modifying the maximum response headers size, then this default may interfere with that setting. You can use a `PMUSER_SW_HEADER_SIZE_OVERRIDE` user defined variable to change the subWorkers default.

## subWorkers log header

Each EdgeWorkers event can generate a 1 KB log. This means that a single subWorker invocation can potentially generate a 4 KB log. This makes logging the largest contributor to the subWorkers debugging response headers.

If your log response headers are hitting these limits, making it difficult to debug a particular subWorker, you can specify the `akamai-x-ew-subworkers-log` request header. The value of this header should be a comma separated list of  the EdgeWorker IDs you want to include in the logs. Any EdgeWorkers not on this list will not produce log headers for the request. If, however, you configured [DataStream 2](datastream-2-integration.md) for EdgeWorkers the EdgeWorker IDs not included in the list will appear in the DataStream 2 logs.

This request specify a single EdgeWorker ID to log `akamai-x-ew-subworkers-log: 809212161`.

```curl
curl -i '<http://example.com'> -X GET -H 'Akamai-EW-Trace: eyJhb...Xrg' -H 'Pragma: akamai-x-ew-debug, akamai-x-ew-debug-log, akamai-x-ew-subworkers' -H 'akamai-x-ew-subworkers-log: 809212161'

HTTP/1.1 200 OK  
Content-Type: text/html  
Content-Length: 18  
Expires: Thu, 25 Jan 2024 16:15:00 GMT  
Cache-Control: max-age=0, no-cache, no-store  
Pragma: no-cache  
Date: Thu, 25 Jan 2024 16:15:00 GMT  
Connection: keep-alive  
X-Akamai-EdgeWorker-onClientResponse-Info-11efe: ew=809212161 v:swparent; status=UnimplementedEventHandler  
X-Akamai-EdgeWorker-onClientRequest-Log-11efe: D:main.js:8 root request OCR  
X-Akamai-EdgeWorker-onClientRequest-Info-11efe: ew=809212161 vc14e39809f55f159475c12f9b06ba671_1:swparent; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=3.191; init_cpu_time=0; cpu_time=0.325; memory_usage=1640  
x-akamai-edgeworker-onclientresponse-info-11e63.11efe: ew=296717999 v:swchild; status=UnimplementedEventHandler  
x-akamai-edgeworker-onclientrequest-info-11e63.11efe: ew=296717999 v1:swchild; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=0.133; init_cpu_time=0; cpu_time=0.079; memory_usage=380
```

This request specify multiple EdgeWorker IDs to log `akamai-x-ew-subworkers-log: 809212161,29671799`.

```curl
curl -i '<http://example.com'> -X GET -H 'Akamai-EW-Trace: eyJ...Xrg' -H 'Pragma: akamai-x-ew-debug, akamai-x-ew-debug-log, akamai-x-ew-subworkers' -H 'akamai-x-ew-subworkers-log: 809212161,296717999'

HTTP/1.1 200 OK  
Content-Type: text/html  
Content-Length: 18  
Expires: Thu, 25 Jan 2024 16:18:42 GMT  
Cache-Control: max-age=0, no-cache, no-store  
Pragma: no-cache  
Date: Thu, 25 Jan 2024 16:18:42 GMT  
Connection: keep-alive  
X-Akamai-EdgeWorker-onClientResponse-Info-12130: ew=809212161 v:swparent; status=UnimplementedEventHandler  
X-Akamai-Edgeworker-Subrequests-12130: ew=809212161; evt=CReq; id=1; method=GET; url="<http://127.0.0.1/?x=sw_root_to_sw_child">; rsp=200; dur=4; req_id=11e65  
X-Akamai-EdgeWorker-onClientRequest-Log-12130: D:main.js:8 root request OCR  
X-Akamai-EdgeWorker-onClientRequest-Info-12130: ew=809212161 vc14e39809f55f159475c12f9b06ba671_1:swparent; status=Success; status_msg=-; res_tier=200; init_wall_time=0.339; wall_time=4.957; init_cpu_time=0.339; cpu_time=0.395; memory_usage=220332  
x-akamai-edgeworker-onclientresponse-info-11e65.12130: ew=296717999 v:swchild; status=UnimplementedEventHandler  
x-akamai-edgeworker-onclientrequest-log-11e65.12130: D:main.js:5 child request OCR  
x-akamai-edgeworker-onclientrequest-info-11e65.12130: ew=296717999 v1:swchild; status=Success; status_msg=-; res_tier=200; init_wall_time=0.13; wall_time=0.182; init_cpu_time=0.129; cpu_time=0.085; memory_usage=5276
```
