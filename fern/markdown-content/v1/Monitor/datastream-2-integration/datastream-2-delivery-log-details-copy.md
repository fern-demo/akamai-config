---
title: "UXTW-9074 DataStream 2 delivery log details"
slug: "datastream-2-delivery-log-details-copy"
excerpt: ""
hidden: true
createdAt: "Thu Feb 06 2025 14:14:50 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Feb 06 2025 14:15:24 GMT+0000 (Coordinated Universal Time)"
---
DataStream 2 delivery logs provide detailed data about EdgeWorkers usage, including metrics you can use to optimize traffic and solve issues on your Akamai property. The stream collects log data under two data set fields you can choose when configuring DataStream 2, EdgeWorker usage and EdgeWorkers execution. 

Refer to the [Integrate DataStream 2 logs](doc:datastream-2-integration) section for steps on how to configure DataStream 2 for EdgeWorkers. 

# EdgeWorkers usage

Usage information includes details about the EdgeWorker ID, version, event  handler, reasons for turning an EdgeWorkers function off, returned errors and metrics  such as initialization CPU, and initialization wall time for the event. The field returns the data in  the following format:

`//[EdgeWorker-Id]/[Version]/[Event Handler]/[Off Reason]/[Logic Executed]/[Status]/[RevisionId]/[OverJavaScriptLogLimit]/#[Metrics] `

Here's an example of the usage information output:  
`//4380/4.0/1/-/0/4/1-1/1/#1,2\//4380/4.0/4/-/0/4/1-1/0/#0,0\//4380/4.0/5/-/1/1/1-1/0/#0,0`

For instructions on how to add EdgeWorkers usage information to a stream refer to the [data set parameters](https://techdocs.akamai.com/datastream2/docs/data-set-parameters) in the DataStream 2 documentation.

[block:parameters]
{
  "data": {
    "h-0": "Field",
    "h-1": "Description",
    "0-0": "EdgeWorker Id",
    "0-1": "The identifier of the EdgeWorkers function.",
    "1-0": "Version",
    "1-1": "The EdgeWorker version.",
    "2-0": "Event Handler",
    "2-1": "The event handler used to execute the EdgeWorkers function.  \n  \nReturns one of the following values:  \n**-** - No event handler was executed  \n**1** - onClientRequest  \n**2** - onOriginRequest  \n**3** - onOriginResponse  \n**4** - onClientResponse  \n**5** - responseProvider",
    "3-0": "Off Reason",
    "3-1": "Indicates why the EdgeWorkers service was turned off.  \n  \nReturns one of the following values:  \n**-** - Metadata indicated EdgeWorkers should be \"on\"  \n**m** - Metadata indicated EdgeWorkers should be \"off\"  \n**i** - Request was \"internal\" and as such shouldn't execute the EdgeWorkers function, such as:  \nSureRoute Test Object races, Intermediary Processing Agent requests, Request was not from End User (not CLIENT_REQ), Akamai Translate or Purge  \n**n** - Request not on supported network  \n**s** - Request was \"denied\" by a security product",
    "4-0": "Logic Executed",
    "4-1": "Was the EdgeWorkers function successfully executed?  \n  \nReturns one of the following values:  \n**0** - No  \n**1** - Yes",
    "5-0": "Status",
    "5-1": "Indicates if the EdgeWorkers event handler execution returned an error.  \n  \nReturns one of the following values:  \n**1** - Successful execution  \n**2** - Generic EdgeWorkers error  \n**3** - Could not find the EdgeWorkers identifier  \n**4** - Requested event handler was not implemented by the EdgeWorkers function  \n**5** - A runtime or environment error prevented the EdgeWorkers execution  \n**6** - Error during the EdgeWorkers execution, such as a JavaScript exception or error  \n**7** - EdgeWorkers function timed out  \n**8** - EdgeWorkers function hit preset resource limit  \n**12** - The amount of CPU time consumed by the event handler exceeded the limit  \n**13** - The wall time consumed by the event handler exceeded the limit  \n**14** - The amount of CPU time consumed during initialization by the event handler exceeded the limit  \n**15** - The amount of wall time consumed during initialization by the event handler exceeded the limit  \n**22** - subWorker not enabled  \n**23** - subWorker limit hit  \n  \nAll other error codes return a generic, unnamed or uncategorized value.",
    "6-0": "Revision ID",
    "6-1": "The Revision ID generated for a combined code bundle. If the code bundle does not include any child EdgeWorkers the output only contains a dash (-). The Revision ID is part of the [Flexible composition](doc:flexible-composition) feature.",
    "7-0": "Over JavaScript Log Limit",
    "7-1": "Indicates the request is hitting [JavaScript log delivery](https://techdocs.akamai.com/edgeworkers/docs/ds2-javascript-logging) limitations on the request.  If the request has reached the [rate limits](https://techdocs.akamai.com/edgeworkers/docs/limitations#limits-for-javascript-logs-delivered-via-datastream-2) , the request will be processed but no logs will be delivered.  \n  \nReturns one of the following values:  \n**0** - Logs could be delivered if configured  \n**1** - Logging limits have been reached and no logs will be delivered on the request",
    "8-0": "Metrics",
    "8-1": "Metrics about the execution of the event handler, separated by a comma (,):  \n  \n**Initialization CPU Time** -  The amount of CPU time, in milliseconds, consumed during the event handler initialization.  \n**Initialization Wall Time** -  The total duration, in milliseconds, of the event handler initialization."
  },
  "cols": 2,
  "rows": 9,
  "align": [
    "left",
    "left"
  ]
}
[/block]


# EdgeWorkers execution

Execution information includes the fields described in the table below, separated by a colon ‘:’.

`[Stage Information]:[EdgeWorker Id]:[Process Time]:[Total Time]:[Stage Time]:[Used Memory]:[Server Flow]:[Error Status Code]:[HTTP Status Change]:[Internal 1]:[Tier Id]:[Internal 2]:[Internal 3]:[Internal 4]:[Internal 5]`

Here's an example of the execution info:

`c:4380:7:161:162:161:n:::12473:200:0::::|C:4380:3:0:4:0:n:::6967:200:0::::|R:4380:20:99:99:1:n:::35982:200:0::::`

For instructions on how to add EdgeWorkers execution information to a stream refer to the [data set parameters](https://techdocs.akamai.com/datastream2/docs/data-set-parameters) in the DataStream 2 documentation.

[block:parameters]
{
  "data": {
    "h-0": "Field",
    "h-1": "Description",
    "0-0": "Stage information",
    "0-1": "The stage during which the EdgeWorkers function was executed.  \n  \nReturns one of the following values:  \n**S** - Sub-request  \n**c** - onClientRequest  \n**o** - onOriginRequest  \n**C** - onClientResponse  \n**O** - onOriginResponse  \n**R** - responseProvider  \n**m** - Missing stage",
    "1-0": "EdgeWorker ID",
    "1-1": "The identifier of the EdgeWorkers function.",
    "2-0": "EdgeWorker process time (ms)",
    "2-1": "The amount of time, in milliseconds, it took to process the EdgeWorkers function.",
    "3-0": "EdgeWorker total time (ms)",
    "3-1": "The total amount of time used, in milliseconds, it took for the EdgeWorkers function to execute.",
    "4-0": "Total stage time (ms)",
    "4-1": "The total amount of time used, in milliseconds,  it took for the EdgeWorkers function to execute.  This value includes any overhead associated with constructing the EdgeWorkers request beyond running the JavaScript code.",
    "5-0": "Used memory (KB)",
    "5-1": "The amount of memory used, in kilobytes, it took for the EdgeWorkers function to execute.",
    "6-0": "Akamai edge server flow",
    "6-1": "Akamai edge server flow status during the execution.  \n  \nReturns one of the following values:  \n**a** - subWorkers disabled  \n**n** - Normal flow  \n**s** - Akamai JavaScript execution engine not available  \n**r** - Termination request  \n**T** - Akamai edge server write timeout  \n**t** - Akamai edge server read timeout  \n**e** - EdgeWorkers returned error  \n**E** - Bad input from EdgeWorkers  \n**u** - Unexpected Termination Request for non-METHOD_GET method  \n**m** - Error in applying EdgeWorkers commands  \n**c** - EdgeWorkers result applied from cached results  \n**o** - Other",
    "7-0": "Error Status Code",
    "7-1": "The error status code when a problem has occurred processing the EdgeWorkers request. This field will not be populated unless an error has occurred.  If the `Akamai edge server flow` is `n`, this value will be empty.  \n  \nReturns one of the following values:  \n**2** - genericError - Unnamed or uncategorized error  \n**3** - unknownEdgeWorker - Unknown EdgeWorker ID  \n**5** - runtimeError - Error at runtime or environment prevented EdgeWorkers execution  \n**6** - executionError - Error during EdgeWorkers execution, such as JavaScript exception or error  \n**7** - timeoutError - EdgeWorkers timed out  \n**8** - resourceLimit - EdgeWorkers hit preset resource limit  \n**9** - ringBufferError - Error receiving or sending data through RingBuffer  \n**10** - blocklisted - EdgeWorkers function is blocklisted by Akamai JavaScript execution engine  \n**11** - bundleVersionUnavailable - EdgeWorkers code bundle unavailable for a particular version  \n**12** - cpuTimeoutError - JavaScript exec CPU timed out  \n**13** - wallTimeoutError - JavaScript exec Wall timed out  \n**14** - initCpuTimeoutError - Init CPU timed out  \n**15** - initWallTimeoutError - Init Wall timed out  \n**16** - responseProviderCancelled - RP cancelled  \n**17** - unsupportedResponseProviderMethod - `responseProvider` is attempting to run a method other than `GET`.  \n**18** - EdgeWorker deleted - EdgeWorkers function deleted by user  \n**19** - softwareTooOld - Software too old  \n**20** - erpDrop - Request dropped due to ERP  \n**21** - Error discovered by the Akamai edge server  \n**23** - subWorker limit hit",
    "8-0": "HTTP status change when response is generated with `respondWith` API",
    "8-1": "The `status` provided as part of the `respondWith()` JavaScript API:  \n`respondWith(status, headers, body, [deny_reason])`",
    "9-0": "Internal Field 1",
    "9-1": "This field is for Akamai internal use only.",
    "10-0": "Tier ID used for processing this request",
    "10-1": "The resource tier of the EdgeWorker ID, 200 for **Dynamic Compute**, 280 for **Enterprise Compute**, or 100 for **Basic Compute**.",
    "11-0": "Internal field 2",
    "11-1": "This field is for Akamai internal use only.",
    "12-0": "Internal field 3",
    "12-1": "This field is for Akamai internal use only.",
    "13-0": "Internal field 4",
    "13-1": "This field is for Akamai internal use only.",
    "14-0": "Internal field 5",
    "14-1": "This field is for Akamai internal use only."
  },
  "cols": 2,
  "rows": 15,
  "align": [
    "left",
    "left"
  ]
}
[/block]
