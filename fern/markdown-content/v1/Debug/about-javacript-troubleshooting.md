---
title: "About JavaScript troubleshooting"
slug: "about-javacript-troubleshooting"
excerpt: ""
hidden: false
createdAt: "Fri May 28 2021 01:02:09 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Feb 25 2025 14:58:49 GMT+0000 (Coordinated Universal Time)"
---
In this section you'll find information about debugging, error codes, and how to resolve common errors. 

[block:parameters]
{
  "data": {
    "h-0": "Option",
    "h-1": "Description",
    "0-0": "[Standard debug headers](doc:enable-standard-debug-headers)",
    "0-1": "Provides general status and EdgeWorker information (id, version, and name) for the executed EdgeWorkers function.",
    "1-0": "[Enhanced debug headers](doc:enable-enhanced-debug-headers)",
    "1-1": "As a best practice you should enable enhanced debug headers.  \n  \nYou can use DataStream 2 to deliver JavaScript logs. For more information go to the [Use DataStream 2 to deliver JavaScript logs](doc:ds2-javascript-logging)  tutorial.  \n  \nThese enhanced debug trace headers provide actionable details that will help you troubleshoot your EdgeWorkers.",
    "2-0": "[Error codes - EdgeWorkers Management Application](doc:error-codes)",
    "2-1": "View a list of error codes that are displayed in the EdgeWorkers Management application to keep you informed about limitations and issues.",
    "3-0": "[Common errors](doc:common-errors)",
    "3-1": "Review the common errors and how they can be resolved."
  },
  "cols": 2,
  "rows": 4,
  "align": [
    "left",
    "left"
  ]
}
[/block]


Review these resources and tips that can also help you troubleshoot and test your EdgeWorkers:

- To handle exceptions cleanly write `try` and `catch` blocks in your JavaScript code.
- Refer to the [Limitations](doc:limitations) section for information about what you should keep in mind when designing your EdgeWorkers functions. You can also review a list of the currently supported delivery products.
- Use [Site Failover](doc:site-failover) to define what action to take in the event that an EdgeWorkers function fails.
- EdgeWorkers functions are supported on both the Enhanced TLS and Standard TLS networks.
