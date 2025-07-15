---
title: "Enhanced debug headers for responseProvider"
slug: "enable-enhanced-debug-headers-for-responseprovider"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jun 14 2021 21:00:53 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Aug 15 2023 18:11:28 GMT+0000 (Coordinated Universal Time)"
---
To enable enhanced debug headers for `responseProvider` the debug request must pass the  `akamai-x-ew-debug-rp` Pragma header. The debug output for `responseProvider` is appended to the end of the body as the second part of a multi-part stream.

When you enable enhanced debugging for `responseProvider` caching is bypassed. This prevents the body, that contains debug data, from being stored in cache and delivered to other users.

When you include, `akamai-x-ew-debug-rp` in the request, the **AK_EDGEWORKERS_RP_STATUS** built-in variable:

- Returns an inaccurate status. 
- Indicates success, even on a failure. This prevents `responseProvider` errors from being detected by Property Manager.
- Prevents the [Site Failover](doc:site-failover) behavior from responding to an EdgeWorkers failover accurately.

To resolve this issue you need to remove the `akamai-x-ew-debug-rp` Pragma header when testing Site Failover.

1. Use this EdgeWorkers CLI command to generate a JWT authentication token. In this example we set the token expiry to 60 minutes for the `www.example.com` hostname. By default, the token expiry is set at 480 for 8 hours. You can set the token expiry to a value between 1 to 720 minutes.

```shell
akamai edgeworkers auth --expiry 60 www.example.com
```

2. Here’s an example of an enhanced debug request header:

```curl
curl http://www.example.com -H 'Pragma: akamai-x-ew-debug, akamai-x-ew-debug-rp' -H 'Akamai-EW-Trace: eyJ0eXAiOiJKV1Qi ... iu1XOS9eJOl-54Yw
```

3. This example shows the trace response headers with successful execution of the `responseProvider` event handler:

```http
HTTP/1.1 200 OK
Content-Type: multipart/form-data; boundary=bZsAiCmRhboH2gSI4GzC84
content-disposition: attachment
Date: Mon, 28 Jun 2021 19:09:30 GMT
Content-Length: 501
Connection: keep-alive
X-Akamai-EdgeWorker-onClientResponse-Info: ew=9 v7.0:EW for example.com; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=0.855; init_cpu_time=0; cpu_time=0.159; memory_usage=96
X-Akamai-EdgeWorker-onClientRequest-Info: ew=9 v7.0:EW for example.com; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=0.756; init_cpu_time=0; cpu_time=0.128; memory_usage=164
AK_EIP_FORWARDER_IP: 


--bZsAiCmRhboH2gSI4GzC84
content-type: application/octet-stream
content-disposition: form-data; name="response-provider-body"

{"time":1624907370526,"header":["from-request"]}
--bZsAiCmRhboH2gSI4GzC84
content-type: text/plain;charset=UTF-8
content-disposition: form-data; name="stream-trace"

X-Akamai-EdgeWorker-ResponseProvider-Info: ew=9 v7.0:EW for example.com; status=Success; status_msg=-; resource_tier=200; wall_time=1.923; cpu_time=0.242; memory_usage=101;req_body=streamed

--bZsAiCmRhboH2gSI4GzC84--
```
