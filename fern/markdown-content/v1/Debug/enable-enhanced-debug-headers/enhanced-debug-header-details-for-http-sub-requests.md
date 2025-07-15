---
title: "Enhanced debug header details for HTTP sub-requests"
slug: "enhanced-debug-header-details-for-http-sub-requests"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Thu May 06 2021 21:06:19 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Feb 15 2023 18:53:18 GMT+0000 (Coordinated Universal Time)"
---
Here's a curl request that passes the Pragma `akamai-x-ew-debug` and `akamai-x-ew-debug-subs` request headers. The `akamai-x-ew-debug-subs` request header is required in addition to the standard debug header to receive sub-request debug headers.

```curl
curl "http://www.example.com" -H "Pragma: akamai-x-ew-debug, akamai-x-ew-debug-subs" -H 'Akamai-EW-Trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Yw
```

Here’s an example of an HTTP sub-request response header:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Expires: Wed, 31 Mar 2021 13:08:41 GMT
Cache-Control: max-age=0, no-cache, no-store
Pragma: no-cache
Date: Wed, 31 Mar 2021 13:08:41 GMT
Content-Length: 676
Connection: keep-alive
X-Akamai-Edgeworker-Subrequests: ew=3693; evt=RP; id=1; method="GET"; url="http://www.example.com/api/request1.json"; rsp=200; dur=25.668; total_dur=27.633, ew=3693; evt=RP; id=2; method="HEAD"; url="http://www.example.com/api/request2.json"; rsp=200; dur=29.182; total_dur=29.534, ew=3693; evt=RP; id=3; method="POST"; url="http://www.example.com/api/request3.json"; rsp=200; dur=35.359; total_dur=35.905
X-Akamai-EdgeWorker-ResponseProvider-Info: ew=3693 v1.0:Example; status=Success; status_msg=-; res_tier=200: init_wall_time=0; wall_time=40.747; init_cpu_time=0; cpu_time=8.583; memory_usage=2740
X-Akamai-EdgeWorker-onClientResponse-Info: ew=3693 v1.0:Example; status=UnimplementedEventHandler; status_msg=-; res_tier=200; init_wall_time=0; wall_time=0.282; init_cpu_time=0; cpu_time=0.282; memory_usage=0
X-Akamai-EdgeWorker-onClientRequest-Info: ew=3693 v1.0:Example; status=UnimplementedEventHandler; status_msg=-; res_tier=200: init_wall_time=51.992; wall_time=0.283; init_cpu_time=6.562; cpu_time=0.283; memory_usage=140552
```

Each sub-request issued by the EdgeWorkers function returns a separate response header. These debug headers include several additional fields to identify and describe the sub-request.

[block:parameters]
{
  "data": {
    "h-0": "Response header field",
    "h-1": "Details",
    "h-2": "Description",
    "0-0": "EdgeWorker ID ew=`<ew>`",
    "0-1": "`<ew>`",
    "0-2": "EdgeWorker ID",
    "1-0": "Event handler evt=`<evt>`",
    "1-1": "`<evt>`",
    "1-2": "Identifier of the event handler that issued the HTTP sub-request. Possible values include:  \n<b>CReq</b> for requests issued by the `onClientRequest` event handler  \n<b>OReq</b> for requests issued by the `onOriginRequest` event handler  \n<b>ORsp</b> for requests issued by the `onOriginResponse` event handler  \n<b>CRsp</b> for requests issued by the `onClientResponse` event handler  \n<b>RP </b> for requests issued by the `responseProvider` event handler",
    "2-0": "HTTP sub-request ID =`<id>`",
    "2-1": "`<id>`",
    "2-2": "ID assigned to the HTTP sub-request starting at 1. The sub-request ID increments by 1 for each given event handler invocation.",
    "3-0": "HTTP sub-request method = `<method>`",
    "3-1": "`<method>`",
    "3-2": "HTTP request method for the sub-request that indicates an action to apply to a given resource.",
    "4-0": "URL targeted by sub-request url=`<url>`",
    "4-1": "`<url>`",
    "4-2": "Fully-qualified URL, delimited by quotation marks, to which the HTTP sub-request was issued. If the URL contains characters not allowed in HTTP headers, it is also per cent encoded.  \nSee the `<url_truncated>` and `<url_encoded>` fields for more information.",
    "5-0": "URL encoded url_encoded=`<url_encoded>`",
    "5-1": "`<url_encoded>`",
    "5-2": "Only appears with a value of 1 when the value of the field is percent-encoded on top of any percent encoding present in the URL value sent in the request.",
    "6-0": "HTTP sub-request response rsp=`<rsp>`",
    "6-1": "`<rsp>`",
    "6-2": "Response to the HTTP sub-request. Possible values include:  \nAn integer status code in the range of 200-599.  \nThe value \"pending\" if the event handler invocation finished before the HTTP sub-request was complete.  \nThis field is absent if the HTTP sub-request was not resolved due to an error.",
    "7-0": "HTTP sub-request response error err=`<err>`",
    "7-1": "`<err>`",
    "7-2": "Only included when an error occurs while waiting for the HTTP sub-request response.",
    "8-0": "Time to resolve promise dur=`<dur>`",
    "8-1": "`<dur>`",
    "8-2": "Time in milliseconds it took for the HTTP sub-request to resolve the promise. The promise, made as part of an EdgeWorkers JavaScript request, can be resolved with the contents of the response header or an exception.  \nThis field is absent if the request was still pending when the event handler invocation completed.",
    "9-0": "Error when reading response body body_err=`<body_err>`",
    "9-1": "`<body_err>`",
    "9-2": "Short string indicating the type of error that occurred while reading from the body of the HTTP sub-request response. This field includes the reason argument if a cancellation was triggered by the EdgeWorkers code using the `ReadableStream.cancel()` method.  \nThe value is percent-encoded and delimited by quotations if it contains spaces or characters with special semantics in the HTTP headers. Currently values longer than 100 characters are truncated.  \nThis field is absent if no errors occurred when reading the response body.",
    "10-0": "Response body truncated Body_err truncated=`<body_err_truncated>`",
    "10-1": "`<body_err_truncated>`",
    "10-2": "Only included with a value of 1 when the value of the `<body_err>` field is truncated.",
    "11-0": "Time to read HTTP sub-request total_dur=`<total_dur>`",
    "11-1": "`<total_dur>`",
    "11-2": "Time in milliseconds between the EdgeWorkers code request for the HTTP sub-request and when the response body was either read to completion or terminated by an error.  \nThis field is absent if the response body was not read to completion prior to the event handler invocation completing.",
    "12-0": "Queuing information due to concurrent HTTP sub-request limitations rate_limited=`<rate_limited>`",
    "12-1": "`<rate_limited>`",
    "12-2": "Information about HTTP sub-requests queued due to [limitations](doc:limitations)  on the supported number of concurrent sub-requests per event handler.  \n An HTTP sub-request can halt if the event finishes while the sub-request was still in the queue or if the sub-request times out while in the queue. This field is absent if the request was not queued.",
    "13-0": "Time in queue due limitations on concurrent HTTP sub-requests rate_limited_dur=`<rate_limited_dur>`",
    "13-1": "`<rate_limited_dur>`",
    "13-2": "Time in queue due to the per-handler [limitations](doc:limitations) on concurrent sub-requests.  \nThis field is absent if the request was not queued or if the request timed out while in the queue. If a timeout occurs, the `<dur>` field also reflects the timeout."
  },
  "cols": 3,
  "rows": 14,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]
