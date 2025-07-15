---
title: "Standard debug header details"
slug: "standard-debug-header-details"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Thu May 06 2021 20:14:01 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Sep 15 2021 19:55:14 GMT+0000 (Coordinated Universal Time)"
---
Here's a curl request that passes the Pragma `akamai-x-ew-debug` request header:

```curl
curl "http://www.example.com" -H "Pragma: akamai-x-ew-debug" -sD -
```

This example shows the trace response headers with successful execution of all event handlers:

```http
HTTP/1.1 200
Content-Type: text/html
Content-Length: 1024
Date: Tue, 17 Sep 2020 02:31:17 GMT
Connection: keep-alive
X-Akamai-EdgeWorker-onClientResponse-Info: ew=9 v7.0:EW for example.com; status=Success
X-Akamai-EdgeWorker-onClientRequest-Info: ew=9 v7.0: EW for example.com; status=Success
X-Akamai-EdgeWorker-onOriginResponse-Info: ew=9 v7.0:EW for example.com; status=Success
X-Akamai-EdgeWorker-onOriginRequest-Info: ew=9 v7.0: EW for example.com; status=Success
X-Akamai-EdgeWorker-ResponseProvider-Info: ew=9 v7.0: EW for example.com; status=Success
X-Powered-By: Akamai EdgeWorkers
```

Here's a curl request that passes the Pragma `akamai-x-ew-onclientrequest` request header:

```curl
curl "http://www.example.com" -H "Pragma:akamai-x-ew-onclientrequest" -sD -
```

This example shows the trace response header with an error response:

```http
HTTP/1.1 500 Internal Server Error
Server: AkamaiGHost
Mime-Version: 1.0
Content-Type: text/html
Content-Length: 174
Expires: Thu, 12 Sep 2019 15:11:24 GMT
Date: Thu, 12 Sep 2019 15:11:24 GMT
Connection: close
X-Akamai-EdgeWorker-onClientRequest-Info: ew=9 v7.0:EW for example.com; status=Failed
AK_EIP_FORWARDER_IP:
```

Standard debug headers contain EdgeWorkers details and the status type. 

[block:html]
{
  "html": "<div></div>\n<table>\n\n<caption>\n\n</caption>\n\n<colgroup>\n\n<col>\n\n<col>\n\n<col>\n\n</colgroup>\n\n<thead>\n\n<tr>\n\n<th align=\"left\">Response Header fields</th>\n\n<th align=\"left\">Details</th>\n\n<th align=\"left\">Description</th>\n\n</tr>\n\n</thead>\n\n<tbody>\n\n<tr>\n\n<td rowspan=\"3\"; style=vertical-align:top>EdgeWorker details\n\n  ew=<code>&lt;id&gt;</code>:<code>&lt;version&gt;</code>:<code>&lt;name&gt;</code></td>\n\n<td><code>&lt;id&gt;</code> </td>\n\n<td>EdgeWorker ID</td>\n\n</tr>\n\n<tr>\n\n<td><code>&lt;version&gt;</code></td>\n\n<td> EdgeWorker version number</td>\n\n</tr>\n\n<tr>\n\n<td><code>&lt;name&gt;</code></td>\n\n<td>EdgeWorker name</td>\n\n</tr>\n\n<tr>\n\n<td style=vertical-align:top>Status type\n\nstatus=<code>&lt;status type&gt;</code></td>\n\n<td><code>&lt;status type&gt;</code></td>\n\n<td>Possible values include:\n  \n<li>Success - the EdgeWorker successfully executed.</li>\n<li>UnimplementedHandler - the requested event handler wasn't implemented by the EdgeWorker.\n<li>Failed - the EdgeWorker did not successfully execute.</li>\n\n</td>\n\n</tr>\n\n</tbody>\n\n</table>\n<style></style>"
}
[/block]
