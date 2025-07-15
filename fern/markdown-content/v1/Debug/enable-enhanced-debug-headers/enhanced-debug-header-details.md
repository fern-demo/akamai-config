---
title: "Enhanced debug header details"
slug: "enhanced-debug-header-details"
excerpt: ""
hidden: false
createdAt: "Thu May 06 2021 20:44:44 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Dec 18 2024 19:31:06 GMT+0000 (Coordinated Universal Time)"
---
Here’s an example of an enhanced debug request header:

```curl
curl http://www.example.com -H 'Pragma: akamai-x-ew-debug' -H 'Akamai-EW-Trace: exp=1600166650~acl=/*~hmac=db4018160fab828da87d3fd8685bfbb9e0f1020885a9cce9403bcf3f5182477d' -k -sD - -o /dev/null
```

This example shows the trace response headers with successful execution of all event handlers:

```http
HTTP/1.1 302 Moved Temporarily
Location: /us/en/
Content-Type: text/html
Content-Length: 0
Date: Tue, 10 Sep 2019 02:31:17 GMT
Connection: keep-alive
X-Akamai-EdgeWorker-onClientResponse-Info: ew=9 v7.0:EW for example.com; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=0; init_cpu_time=0; cpu_time=0; memory_usage=672;
X-Akamai-EdgeWorker-onClientRequest-Info: ew=9 v7.0: EW for example.com; status=Success; status_msg=-; res_tier=200; init_wall_time=9.99; wall_time=6.349; init_cpu_time=6.19; cpu_time=6.349;memory_usage=14572;
X-Akamai-EdgeWorker-onOriginResponse-Info: ew=9 v7.0:EW for example.com; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=0; init_cpu_time=0; cpu_time=0; memory_usage=472;
X-Akamai-EdgeWorker-onOriginRequest-Info: ew=9 v7.0: EW for example.com; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=0; init_cpu_time=0; cpu_time=0; memory_usage=372;

X-Powered-By: Akamai EdgeWorkers
```

Here's a curl request that passes the Pragma `akamai-x-ew-onclientrequest` request header:

```curl
curl "http://www.example.com" -H "Pragma: akamai-x-ew-onclientrequest" -H 'Akamai-EW-Trace: exp=1600166650~acl=/*~hmac=db4018160fab828da87d3fd8685bfbb9e0f1020885a9cce9403bcf3f5182477d' -k -sD - -o /dev/null
```

This example shows the trace response header with an execution error:

```http
HTTP/1.1 500 Internal Server Error
Server: AkamaiGHost
Mime-Version: 1.0
Content-Type: text/html
Content-Length: 174
Expires: Thu, 12 Sep 2019 15:11:24 GMT
Date: Thu, 12 Sep 2019 15:11:24 GMT
Connection: close
X-Akamai-EdgeWorker-onClientRequest-Info: ew=9 v7.0:EW for example.com; status=ExecutionError; status_msg=main.js:runtime_error:5:2,main.js:red_team:16:3,main.js:onClientRequest:39:3+ReferenceError:+calling_undefined_fn+is+not+defined; res_tier=200; init_wall_time=0; wall_time=0; init_cpu_time=0; cpu_time=0; memory_usage=21560
```

Enhanced debug headers include a status message and the amount of wall time, CPU time, and memory consumed by the event handler.

<table>

<caption>

</caption>

<colgroup>

<col>

<col>

<col>

</colgroup>

<thead>

<tr>

<th align="left"> Response Header fields</th>

<th align="left"> Details</th>

<th align="left"> Description</th>

</tr>

</thead>

<tbody>

<tr>

<td rowspan="3"; style=vertical-align:top><strong>EdgeWorker details</strong>

ew=`<id>` `<version>`:`<name>`</td>

<td><code>&lt;id&gt;</code></td>

<td>EdgeWorker ID</td>

</tr>

<tr>

<td><code>&lt;version&gt;</code></td>

<td>EdgeWorker version number</td>

</tr>

<tr>

<td><code>&lt;name&gt;</code></td>

<td>EdgeWorker name</td>

</tr>

<tr>

<td style=vertical-align:top><strong>Status type</strong>

status=<code><status type></code></td>

<td style=vertical-align:top><code>&lt;status type&gt;</code></td>

<td>Possible values include:

- Success - the EdgeWorker successfully executed.

- GenericError - a compile error, such as a syntax error occurred.

- ExecutionError - an execution error, such as a JavaScript exception or error occurred.

- RuntimeError - an error occurred at runtime/environment preventing the EdgeWorker from executing.

- UnknownEdgeWorker - the EdgeWorker ID cannot be loaded because it doesn't exist.

- UnimplementedHandler - the requested event handler wasn't implemented by the EdgeWorker.

- TimeoutError - the execution time surpassed an upper limit restriction.

- WallTimeoutError - the wall time consumed by the event handler exceeded the limit during the JavaScript execution.

- InitWallTimeoutError - the wall time consumed by the event handler exceeded the limit during the JavaScript initialization.

- CpuTimeoutError - the amount of CPU time consumed by the event handler exceeded the limit during the JavaScript execution.

- InitCpuTimeoutError - the amount of CPU time consumed by the event handler exceeded the limit during the JavaScript initialization.

- ResourceLimit - the upper bound of a resource limit was reached.

</td>

</tr>

<tr>

<td rowspan="4"; style=vertical-align:top><strong>Status Message</strong>

status_msg=(<code><function-name></code>:<code><line-number></code>:<code><column></code>) + <code><error-description></code></td>

<td><code>&lt;function-name&gt;</code></td>

<td>Optional URL encoded function name where the error occurred.</td>

</tr>

<tr>

<td><code>&lt;line-number&gt;</code></td>

<td>Optional line number where the error occurred.</td>

</tr>

<tr>

<td><code>&lt;column&gt;</code></td>

<td>Column number where the error occurred.</td>

</tr>

<tr>

<td><code>&lt;error-description&gt;</code></td>

<td>Error message for the exception.</td>

</tr>

<tr>

<td><strong>Resource tier</strong>

res_tier=`<res_tier>`</td>

<td><code>&lt;res_tier&gt;</code></td>

<td style=vertical-align:top>The resource tier selected for the EdgeWorker ID, 200 for Dynamic Compute, 280 for Enterprise Compute, or 100 for Basic Compute.</td>

</tr>

<tr>

<td><strong>Initialization Wall Time</strong>

init_wall_time=`<init_wall_time>`</td>

<td><code>&lt;init_wall_time&gt;</code></td>

<td style=vertical-align:top>The total amount of time consumed by the event handler in milliseconds for the initialization of the event.</td>

</tr>

<tr>

<td><strong>Wall Time</strong>

wall_time=`<wall_time>`</td>

<td><code>&lt;wall_time&gt;</code></td>

<td style=vertical-align:top>The total amount of time consumed by the event handler in milliseconds.</td>

</tr>

<tr>

<td><strong>Initialization CPU Time</strong>

init_cpu_time=`<init_cpu_time>`</td>

<td><code>&lt;init_cpu_time&gt;</code></td>

<td style=vertical-align:top>The amount of CPU time consumed by the event handler in milliseconds for the initialization of the event.</td>

</tr>

<tr>

<td><strong>CPU Time</strong>

cpu_time=`<cpu_time>`</td>

<td><code>&lt;cpu_time&gt;</code></td>

<td style=vertical-align:top>The amount of CPU time consumed by the event handler in milliseconds.</td>

</tr>

<tr>

<td><strong>Memory Usage</strong>

memory_usage=`<memory_usage>`</td>

<td><code>&lt;memory_usage&gt;</code></td>

<td style=vertical-align:top> The amount of memory consumed by the event handler in bytes.</td>

</tr>

<tr>

<td><strong>req_body</strong>

req_body=`<req_body>`</td>

<td><code>&lt;req_body&gt;</code></td>

<td style=vertical-align:top> Possible values include:

- buffered</strong> - A buffered request body of non-zero size was sent.

- streamed</strong> - A streamed request body was sent.

- error</strong> - An error occurred when sending a buffered request body. 

- none</strong> - An empty request body was sent.</td>

</tr>

</tbody>

</table>

> 📘 The trace response header format may change in the future to include new fields.
