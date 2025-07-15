---
title: "JavaScript Logging details"
slug: "javascript-logging-details"
excerpt: ""
hidden: false
createdAt: "Thu May 06 2021 21:27:59 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Sep 25 2024 16:19:37 GMT+0000 (Coordinated Universal Time)"
---
You can deliver the JavaScript logs via [Enhanced debug headers](doc:enable-enhanced-debug-headers) or a [DataStream 2](doc:ds2-javascript-logging).

# Enhanced debug header logging details

Each event handler returns a corresponding response header. A response header is only returned when logging information is available for the event. The log header name starts with X-Akamai-EdgeWorker:

- X-Akamai-EdgeWorker-onClientRequest-Log
- X-Akamai-EdgeWorker-onOriginRequest-Log
- X-Akamai-EdgeWorker-onClientResponse-Log
- X-Akamai-EdgeWorker-onOriginResponse-Log
- X-Akamai-EdgeWorker-responseProvider-Log

You can also add the `X-Akamai-EdgeWorker-subworkers-Log` request header to limit which EdgeWorkers collect JavaScript logs. This can help you stay with the JavaScript Logging limits. For more information go to [subWorkers JavaScript Logging details](doc:javascript-logging-details-copy#javascript-logging-for-subworkers).

> 📘 You can configure the JavaScript logs to appear in an [LDS server log](https://techdocs.akamai.com/log-delivery/docs) or a [DataStream 2 log](doc:datastream-2-integration).

## Enhanced debug header logging format

EdgeWorkers JavaScript logging returns logs in the following format `<debug-level>`:`<file>`:`<line>` `<message>`.

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

<th>JavaScript Logging fields</th>

<th>Details</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td rowspan="4" style=vertical-align:top><code>&lt;debug-level&gt;</code>:<code>&lt;file&gt;</code>:<code>&lt;line&gt;</code>:<code>&lt;message&gt;</code></td>

<td><code>&lt;debug-level&gt;</code></td>

<td>The debug level specified in the request request header.

T- Trace  
D - Debug  
I - Info  
W - Warn  
E - Error

</td>

</tr>

<tr>

<td><code>&lt;file&gt;</code></td>

<td>The URL encoded file name is only included if it is different from the previous log line.</td>

</tr>

<tr>

<td><code>&lt;line&gt;</code></td>

<td>The line number where the log was executed.</td>

</tr>

<tr>

<td><code>&lt;message&gt;</code></td>

<td>The URL encoded message. Includes values for any data included in the message.

A  vertical bar (|) separates multiple messages.

- All text in the string is ASCII. Invalid characters and delimiters are percent encoded.

- A dollar sign appends text truncated by the byte limit.

</td>

</tr>

</tbody>

</table>

# Data Stream 2 JavaScript logging details

You can generate these logs by following the steps in the [Use DataStream 2 to deliver JavaScript logs](doc:javascript-logging) tutorial.

The following is an example of the JSON data output by DataStream 2. If you select the JSON output option for your logs, `timestamp` and `version` are renamed to `time` and `format` to facilitate the naming conventions of specific endpoints.

```json
[
{ 
  "severity": "ERROR",
  "time": "1718023875520000000",
  "version": "1",
  "body": "onClientRequest%20test%20%20error%20level",
  "ds2id": "71321",
  "format": "1",
  "attributes": {
    "request_id": "1a1a1a1",
    "nl": "1",
  },
  "resource": {
    "cloud.provider": "AkamaiEdgeWorkers",
    "ew": "42",
    "ewv": "0.9",
    "ip": "<ip address of the log source>"
  }
}

]
```

## Data Stream 2 logging format

EdgeWorkers JavaScript logging returns logs in the following format, `timestamp` `version` `ds2id` `severity` `traceid` `spanid` `traceflags` `resource` `attributes` `body`.

[block:parameters]
{
  "data": {
    "h-0": "Data Stream 2 logging field",
    "h-1": "Description",
    "0-0": "`severity`",
    "0-1": "The available severity levels are TRACE, DEBUG, INFO, WARN, and ERROR.",
    "1-0": "`timestamp` or  \n`time` for JSON log output",
    "1-1": "Time of event handler initialization.",
    "2-0": "`version` or `format` for JSON output",
    "2-1": "A version number specifying the format of the log line for accurate parsing.  \nThe initial value is 1.",
    "3-0": "`ds2id`",
    "3-1": "Corresponds to the `streamId` identified in the EdgeWorkers code bundle. This is same streamID you can use for  API calls such as, `get-stream`.",
    "4-0": "`traceid`",
    "4-1": "Currently unused field. Reserved for future use with Open Telemetry standard.",
    "5-0": "`spanid`",
    "5-1": "Currently unused field. Reserved for future use with Open Telemetry standard.",
    "6-0": "`traceflags`",
    "6-1": "Currently unused field. Reserved for future use with Open Telemetry standard.",
    "7-0": "`resource`",
    "7-1": "Describes information about the source of the log such as the `ip`, `cloud.provider`, `ew_id`, `ew_version`.",
    "8-0": "`attributes`",
    "8-1": "Additional information about the specific event occurrence. You can use this field to correlate other log entries saved for the same request.  \n  \nIt also includes an `nl` flag if the number of logging messages sent within one second is close to the [limit](doc:limitations#limits-for-javascript-logs-delivered-via-datastream-2) . For example, `nl:1`.",
    "9-0": "`body`",
    "9-1": "You can include any text here. The body is delivered as URL encoded data and remains encoded until it reaches the destination endpoints. Protobuf supports formatted JSON."
  },
  "cols": 2,
  "rows": 10,
  "align": [
    "left",
    "left"
  ]
}
[/block]


## DataStream 2 and the EdgeWorkers access model

For an EdgeWorker to access a DataStream 2 object it has to be part of or share access to common group.  
This means that the EdgeWorker needs to be:

- A member of the same group as the Data Stream 2 object.
- Or in a group that belongs to the one that the Data Stream 2 object is assigned to.

You cannot use a DataStream 2 stream for log delivery if the EdgeWorker does not meet the Access control requirements. For more information go to the [Identity and Access Management](https://techdocs.akamai.com/iam/docs/about-access-control-model) guide.

## DataStream 2 log delivery

You can deliver the log entries in up to two separate streams.

- In the `bundle.json` file in the EdgeWorkers [code bundle](https://techdocs.akamai.com/edgeworkers/docs/code-bundle-format).

- Via the [EdgeWorkers CLI](https://techdocs.akamai.com/edgeworkers/docs/akamai-cli) where you can add additional independent streams to deliver logs. If you configure the streams independently from each other, you can apply different log level filters.
