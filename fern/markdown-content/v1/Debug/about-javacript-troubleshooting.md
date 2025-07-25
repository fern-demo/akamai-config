---
title: "About JavaScript troubleshooting"
slug: "about-javacript-troubleshooting"
excerpt: ""
hidden: false
createdAt: "Fri May 28 2021 01:02:09 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Feb 25 2025 14:58:49 GMT+0000 (Coordinated Universal Time)"
---
In this section you'll find information about debugging, error codes, and how to resolve common errors. 
| Option | Description |
| --- | --- |
| [Standard debug headers](enable-standard-debug-headers.md) | Provides general status and EdgeWorker information (id, version, and name) for the executed EdgeWorkers function. |
| [Enhanced debug headers](enable-enhanced-debug-headers.md) | As a best practice you should enable enhanced debug headers.<br/><br/>You can use DataStream 2 to deliver JavaScript logs. For more information go to the [Use DataStream 2 to deliver JavaScript logs](ds2-javascript-logging.md)  tutorial.<br/><br/>These enhanced debug trace headers provide actionable details that will help you troubleshoot your EdgeWorkers. |
| [Error codes - EdgeWorkers Management Application](error-codes.md) | View a list of error codes that are displayed in the EdgeWorkers Management application to keep you informed about limitations and issues. |
| [Common errors](common-errors.md) | Review the common errors and how they can be resolved. |


Review these resources and tips that can also help you troubleshoot and test your EdgeWorkers:

- To handle exceptions cleanly write `try` and `catch` blocks in your JavaScript code.
- Refer to the [Limitations](limitations.md) section for information about what you should keep in mind when designing your EdgeWorkers functions. You can also review a list of the currently supported delivery products.
- Use [Site Failover](site-failover.md) to define what action to take in the event that an EdgeWorkers function fails.
- EdgeWorkers functions are supported on both the Enhanced TLS and Standard TLS networks.
