---
title: "DataStream 2 delivery log details"
slug: "datastream2-reports"
excerpt: ""
hidden: false
createdAt: "Thu Sep 09 2021 14:55:39 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Dec 18 2024 19:32:10 GMT+0000 (Coordinated Universal Time)"
---
DataStream 2 delivery logs provide detailed data about EdgeWorkers usage, including metrics you can use to optimize traffic and solve issues on your Akamai property. The stream collects log data under two data set fields you can choose when configuring DataStream 2, EdgeWorker usage and EdgeWorkers execution. 

Refer to the [Integrate DataStream 2 logs](datastream-2-integration.md) section for steps on how to configure DataStream 2 for EdgeWorkers. 

# EdgeWorkers usage

Usage information includes details about the EdgeWorker ID, version, event  handler, reasons for turning an EdgeWorkers function off, returned errors and metrics  such as initialization CPU, and initialization wall time for the event. The field returns the data in  the following format:

`//[EdgeWorker-Id]/[Version]/[Event Handler]/[Off Reason]/[Logic Executed]/[Status]/[RevisionId]/[OverJavaScriptLogLimit]/#[Metrics] `

Here's an example of the usage information output:  
`//4380/4.0/1/-/0/4/1-1/1/#1,2\//4380/4.0/4/-/0/4/1-1/0/#0,0\//4380/4.0/5/-/1/1/1-1/0/#0,0`

For instructions on how to add EdgeWorkers usage information to a stream refer to the [data set parameters](https://techdocs.akamai.com/datastream2/docs/data-set-parameters) in the DataStream 2 documentation.
| Field | Description |
| --- | --- |
| EdgeWorker Id | The identifier of the EdgeWorkers function. |
| Version | The EdgeWorker version. |
| Event Handler | The event handler used to execute the EdgeWorkers function.<br/><br/>Returns one of the following values:<br/>**-** - No event handler was executed<br/>**1** - onClientRequest<br/>**2** - onOriginRequest<br/>**3** - onOriginResponse<br/>**4** - onClientResponse<br/>**5** - responseProvider |
| Off Reason | Indicates why the EdgeWorkers service was turned off.<br/><br/>Returns one of the following values:<br/>**-** - Metadata indicated EdgeWorkers should be "on"<br/>**m** - Metadata indicated EdgeWorkers should be "off"<br/>**i** - Request was "internal" and as such shouldn't execute the EdgeWorkers function, such as:<br/>SureRoute Test Object races, Intermediary Processing Agent requests, Request was not from End User (not CLIENT_REQ), Akamai Translate or Purge<br/>**n** - Request not on supported network<br/>**s** - Request was "denied" by a security product |
| Logic Executed | Was the EdgeWorkers function successfully executed?<br/><br/>Returns one of the following values:<br/>**0** - No<br/>**1** - Yes |
| Status | Indicates if the EdgeWorkers event handler execution returned an error.<br/><br/>Returns one of the following values:<br/>**1** - Successful execution<br/>**2** - Generic EdgeWorkers error<br/>**3** - Could not find the EdgeWorkers identifier<br/>**4** - Requested event handler was not implemented by the EdgeWorkers function<br/>**5** - A runtime or environment error prevented the EdgeWorkers execution<br/>**6** - Error during the EdgeWorkers execution, such as a JavaScript exception or error<br/>**7** - EdgeWorkers function timed out<br/>**8** - EdgeWorkers function hit preset resource limit<br/>**12** - The amount of CPU time consumed by the event handler exceeded the limit<br/>**13** - The wall time consumed by the event handler exceeded the limit<br/>**14** - The amount of CPU time consumed during initialization by the event handler exceeded the limit<br/>**15** - The amount of wall time consumed during initialization by the event handler exceeded the limit<br/>**22** - subWorker not enabled<br/>**23** - subWorker limit hit<br/><br/>All other error codes return a generic, unnamed or uncategorized value. |
| Revision ID | The Revision ID generated for a combined code bundle. If the code bundle does not include any child EdgeWorkers the output only contains a dash (-). The Revision ID is part of the [Flexible composition](flexible-composition.md) feature. |
| Over JavaScript Log Limit | Indicates the request is hitting [JavaScript log delivery](https://techdocs.akamai.com/edgeworkers/docs/ds2-javascript-logging) limitations on the request.  If the request has reached the [rate limits](https://techdocs.akamai.com/edgeworkers/docs/limitations#limits-for-javascript-logs-delivered-via-datastream-2) , the request will be processed but no logs will be delivered.<br/><br/>Returns one of the following values:<br/>**0** - Logs could be delivered if configured<br/>**1** - Logging limits have been reached and no logs will be delivered on the request |
| Metrics | Metrics about the execution of the event handler, separated by a comma (,):<br/><br/>**Initialization CPU Time** -  The amount of CPU time, in milliseconds, consumed during the event handler initialization.<br/>**Initialization Wall Time** -  The total duration, in milliseconds, of the event handler initialization. |


# EdgeWorkers execution

Execution information includes the fields described in the table below, separated by a colon ‘:’.

`[Stage Information]:[EdgeWorker Id]:[Process Time]:[Total Time]:[Stage Time]:[Used Memory]:[Server Flow]:[Error Status Code]:[HTTP Status Change]:[Internal 1]:[Tier Id]:[Internal 2]:[Internal 3]:[Internal 4]:[Internal 5]`

Here's an example of the execution info:

`c:4380:7:161:162:161:n:::12473:200:0::::|C:4380:3:0:4:0:n:::6967:200:0::::|R:4380:20:99:99:1:n:::35982:200:0::::`

For instructions on how to add EdgeWorkers execution information to a stream refer to the [data set parameters](https://techdocs.akamai.com/datastream2/docs/data-set-parameters) in the DataStream 2 documentation.
| Field | Description |
| --- | --- |
| Stage information | The stage during which the EdgeWorkers function was executed.<br/><br/>Returns one of the following values:<br/>**S** - Sub-request<br/>**c** - onClientRequest<br/>**o** - onOriginRequest<br/>**C** - onClientResponse<br/>**O** - onOriginResponse<br/>**R** - responseProvider<br/>**m** - Missing stage |
| EdgeWorker ID | The identifier of the EdgeWorkers function. |
| EdgeWorker process time (ms) | The amount of time, in milliseconds, it took to process the EdgeWorkers function. |
| EdgeWorker total time (ms) | The total amount of time used, in milliseconds, it took for the EdgeWorkers function to execute. |
| Total stage time (ms) | The total amount of time used, in milliseconds,  it took for the EdgeWorkers function to execute.  This value includes any overhead associated with constructing the EdgeWorkers request beyond running the JavaScript code. |
| Used memory (KB) | The amount of memory used, in kilobytes, it took for the EdgeWorkers function to execute. |
| Akamai edge server flow | Akamai edge server flow status during the execution.<br/><br/>Returns one of the following values:<br/>**a** - subWorkers disabled<br/>**n** - Normal flow<br/>**s** - Akamai JavaScript execution engine not available<br/>**r** - Termination request<br/>**T** - Akamai edge server write timeout<br/>**t** - Akamai edge server read timeout<br/>**e** - EdgeWorkers returned error<br/>**E** - Bad input from EdgeWorkers<br/>**u** - Unexpected Termination Request for non-METHOD_GET method<br/>**m** - Error in applying EdgeWorkers commands<br/>**c** - EdgeWorkers result applied from cached results<br/>**o** - Other |
| Error Status Code | The error status code when a problem has occurred processing the EdgeWorkers request. This field will not be populated unless an error has occurred.  If the `Akamai edge server flow` is `n`, this value will be empty.<br/><br/>Returns one of the following values:<br/>**2** - genericError - Unnamed or uncategorized error<br/>**3** - unknownEdgeWorker - Unknown EdgeWorker ID<br/>**5** - runtimeError - Error at runtime or environment prevented EdgeWorkers execution<br/>**6** - executionError - Error during EdgeWorkers execution, such as JavaScript exception or error<br/>**7** - timeoutError - EdgeWorkers timed out<br/>**8** - resourceLimit - EdgeWorkers hit preset resource limit<br/>**9** - ringBufferError - Error receiving or sending data through RingBuffer<br/>**10** - blocklisted - EdgeWorkers function is blocklisted by Akamai JavaScript execution engine<br/>**11** - bundleVersionUnavailable - EdgeWorkers code bundle unavailable for a particular version<br/>**12** - cpuTimeoutError - JavaScript exec CPU timed out<br/>**13** - wallTimeoutError - JavaScript exec Wall timed out<br/>**14** - initCpuTimeoutError - Init CPU timed out<br/>**15** - initWallTimeoutError - Init Wall timed out<br/>**16** - responseProviderCancelled - RP cancelled<br/>**17** - unsupportedResponseProviderMethod - `responseProvider` is attempting to run a method other than `GET`.<br/>**18** - EdgeWorker deleted - EdgeWorkers function deleted by user<br/>**19** - softwareTooOld - Software too old<br/>**20** - erpDrop - Request dropped due to ERP<br/>**21** - Error discovered by the Akamai edge server<br/>**23** - subWorker limit hit |
| HTTP status change when response is generated with `respondWith` API | The `status` provided as part of the `respondWith()` JavaScript API:<br/>`respondWith(status, headers, body, [deny_reason])` |
| Internal Field 1 | This field is for Akamai internal use only. |
| Tier ID used for processing this request | The resource tier of the EdgeWorker ID, 200 for **Dynamic Compute**, 280 for **Enterprise Compute**, or 100 for **Basic Compute**. |
| Internal field 2 | This field is for Akamai internal use only. |
| Internal field 3 | This field is for Akamai internal use only. |
| Internal field 4 | This field is for Akamai internal use only. |
| Internal field 5 | This field is for Akamai internal use only. |
