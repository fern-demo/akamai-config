---
title: "Debug"
slug: "debug-flexible-composition"
excerpt: ""
hidden: false
createdAt: "Mon Sep 04 2023 19:19:15 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Jun 07 2024 16:00:35 GMT+0000 (Coordinated Universal Time)"
---
Learn about debugging, logging, error codes, and how to resolve common errors related to EdgeWorkers created using flexible composition.

With dynamic reactivation, teams that develop EdgeWorkers are responsible for ensuring that parent EdgeWorkers continue to perform when they activate new versions. Review these resources and tips that can also help you troubleshoot and test your EdgeWorkers.

- Test new versions of the parent EdgeWorkers as part of a continuous integration pipeline.
- Strictly adhere to a mutually agreed upon API definition that is verified through unit tests.
- Monitor the behavior of parent EdgeWorkers and rollback quickly to the previous revision of the parent if an error occurs.

# Enhanced debug headers

[Enhanced debug headers](enable-enhanced-debug-headers.md) include the following details to help you understand which EdgeWorker version handled a request.

- The **Revision ID** of the EdgeWorkers function. You can use the Revision ID to find the associated bill of materials.
- The **EdgeWorker ID** in the file paths. The EdgeWorker ID appears in the log output and stack traces, to show exactly where events occurred.

> 📘 Standard debug headers do not include details about EdgeWorkers created using flexible composition.

This example shows the trace response headers with successful execution of all event handlers:

```http
X-Akamai-EdgeWorker-onClientResponse-Info: ew=64735 v0.4:jscomp-logging; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=0.265; init_cpu_time=0; cpu_time=0.194; memory_usage=376; revision_id=6-1
X-Akamai-EdgeWorker-onClientRequest-Info: ew=64735 v0.4:jscomp-logging; status=Success; status_msg=-; res_tier=200; init_wall_time=0.326; wall_time=0.33; init_cpu_time=0.326; cpu_time=0.194; memory_usage=7024; revision_id=6-1
X-Akamai-EdgeWorker-onOriginResponse-Info: ew=64735 v0.4:jscomp-logging; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=0.337; init_cpu_time=0; cpu_time=0.177; memory_usage=236; revision_id=6-1
X-Akamai-EdgeWorker-onOriginRequest-Info: ew=64735 v0.4:jscomp-logging; status=Success; status_msg=-; res_tier=200; init_wall_time=0; wall_time=0.213; init_cpu_time=0; cpu_time=0.095; memory_usage=232; revision_id=6-1 
```

This example shows the trace response header with an execution error.

```http
X-Akamai-EdgeWorker-onClientRequest-Info: ew=64735 v0.4:jscomp-logging; status=ExecutionError; status_msg=48815-0.2%2Fmain.js::13:34+SyntaxError:+missing+)+after+argument+list; res_tier=200; init_wall_time=0.266; wall_time=0; init_cpu_time=0.266; cpu_time=0; memory_usage=0
```

# JavaScript logging

[JavaScript logging](enable-javascript-logging.md) captures log messages generated during the current request. The paths included in exceptions indicate which EdgeWorker ID and version triggered the error. Here's a log output example.

```shell
X-Akamai-EdgeWorker-onClientRequest-Log: D:166203-0.3/main.js:6 main message|D:166203-0.3/module.js:3 nested_module|D:169141-0.2/main.js:5 library message|D:169141-0.2/module.js:3 lib-module message\
```

EdgeWorkers JavaScript logging returns logs in the following format `<debug-level>`:`<EdgeWorker-ID>`:`<version>`:`<file>`:`<line>`:`<message>`.
| Field | Description |
| --- | --- |
| `<debug-level>` | Currently the level is always "D" for debug. |
| `<EdgeWorker-ID>` | The EdgeWorker ID that generated the logging message. |
| `<version>` | The EdgeWorker version that generated the logging message. |
| `<file>` | The URL encoded file name is only included if it is different from the previous log line. |
| `<line>` | The line number where the log was executed. |
| `<message>` | The URL encoded message. Includes values for any data included in the message.<br/><br/>- A  vertical bar (|) separates multiple messages.<br/>- All text in the string is ASCII. Invalid characters and delimiters are percent encoded.<br/>- A dollar sign appends text truncated by the byte limit. |


# DataStream 2 logs

[DataStream 2 log](datastream-2-integration.md) details now include a field for the Revision ID. The format of the log output is.

`//[EdgeWorker-Id]/[Version]/[Event Handler]/[Off Reason]/[Logic Executed]/[RevisionID]/[Status]/#[Metrics]` 

Here's an example of the usage information output:  
`//4380/4.0/1/-/0/4/#1,2\//4380/4.0/4/-/0/4/#0,0\//4380/4.0/5/-/1/1/#0,0`

A [Revision ID](terminology.md#revision-id) is generated each time a dynamic reactivation occurs. If a dynamic reactivation did not occur a dash (-) appears to represent this field in the log output. 

# Fallback to the previous Revision

If a team in your organization activates a child EdgeWorker with errors, the parent will also begin to produce errors.

1. To identify the source of the error, review the parent EdgeWorker. 

2. If the failures begin after the most recent Revision ID activation you can fallback to the previous Revision of the parent EdgeWorker.

3. Go to the **Revision Activations** page for your EdgeWorker ID.

4. Click the **Activate revision** button and select the Revision that you want to fallback to

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/activateFallback-v1.png" alt="Image"/>
</Frame>

5. Click the** Activate revision** button.

   After the rollback completes, you can review the errors in the new version of the EdgeWorker, fix the error, and activate it again.

# Error codes

These error codes appear in the EdgeWorkers Management application to keep you informed about limitations and issues related to flexible composition.

You can find a full list of error codes in the [Error codes - EdgeWorkers Management Application](error-codes.md) section of this guide.

|        |                                                                                                                           |
| :----- | :------------------------------------------------------------------------------------------------------------------------ |
| EW0019 | You don’t have permission to access the imported EdgeWorker ID {{edgeWorkerId}}.                                          |
| EW1023 | A revision is currently activating.                                                                                       |
| EW1024 | There is no active version.                                                                                               |
| EW1025 | You can only activate a revision from the version that is currently active.                                               |
| EW1026 | The revision is already active.                                                                                           |
| EW1068 | You cannot pin or unpin a revision that has no dependency.                                                                |
| EW1115 | Dependency tree cycle detected: {{treeCycle}}.                                                                            |
| EW1116 | The EdgeWorkers code bundle doesn't include an active version for the imported EdgeWorker ID {{ewId}}.                    |
| EW1117 | The EdgeWorkers code bundle for the imported EdgeWorker ID {{edgeWorkerId}} cannot be downloaded.                         |
| EW1118 | EdgeWorkers code bundle validation failure for the imported EdgeWorker ID {{edgeWorkerId}}.                               |
| EW1120 | A BOM does not exist for the imported EdgeWorker ID {{edgeWorkerId}}.                                                     |
| EW3004 | This revision exceeds the dependency tree height limit for revision {{revisionKey}}.                                      |
| EW3006 | The imported EdgeWorker ID {{edgeWorkerId}} exceeds the maximum number of times it can be imported by an active revision. |
| EW3007 | This revision exceeds the transitive dependencies limit for EdgeWorker ID {{edgeWorkerId}}.                               |
| EW1131 | The combined EdgeWorkers code bundle is invalid.                                                                          |
| EW2401 | This revision doesn't exist.                                                                                              |
| EW2402 | This Bill of Materials doesn't exist.                                                                                     |
| EW2403 | This combined code bundle doesn't exist.                                                                                  |
| EW2404 | This list of revisions doesn't exist.                                                                                     |
| EW2405 | This list of revision activations doesn't exist.                                                                          |
| EW5101 | We're unable to process your request at this time.                                                                        |
