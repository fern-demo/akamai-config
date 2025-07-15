---
title: "About monitoring"
slug: "about-monitoring"
excerpt: ""
hidden: false
createdAt: "Mon Feb 24 2025 21:01:43 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Feb 25 2025 14:55:38 GMT+0000 (Coordinated Universal Time)"
---
In this section you'll find information about how to set up and use reports and logs to help gain insight about the performance of your EdgeWorkers functions.

[block:parameters]
{
  "data": {
    "h-0": "Option",
    "h-1": "Description",
    "0-0": "[EdgeWorkers reports](doc:manage-report-data)",
    "0-1": "These reports are built-in to the EdgeWorkers management application and provide details about the performance and execution status of your EdgeWorkers functions.  \n  \nYou can also use the EdgeWorkers API to [generate reports](ref:get-reports).",
    "1-0": "[mPulse reports](doc:mpulse)",
    "1-1": "Displays reports about JavaScript errors in the mPulse dashboard.  \nTo use this feature you need to be part of an mPulse paid plan.",
    "2-0": "[JavaScript logging](doc:enable-javascript-logging)",
    "2-1": "Captures log messages generated during the current request.  \nYou can also use variable substitution to include dynamic data in the EdgeWorkers logs.  \n  \nYou can configure the JavaScript logs to appear in a [DataStream 2 log](doc:datastream-2-integration) or [an LDS server log](https://techdocs.akamai.com/log-delivery/docs).",
    "3-0": "[DataStream 2 logs](doc:datastream-2-integration)",
    "3-1": "Generates logs that contain near real-time insight into the performance of your EdgeWorkers functions. You need EdgeWorkers and DataStream 2 enabled in your contract.  \n  \nYou can also [use DataStream 2 to deliver JavaScript Logs](doc:ds2-javascript-logging) for an EdgeWorkers function.",
    "4-0": "[Log Delivery Service](doc:enable-log-delivery-for-edgeworkers)",
    "4-1": "Provides status and failure information for your EdgeWorker IDs over a specified period of time in an [LDS server log](https://techdocs.akamai.com/log-delivery/docs). You need to create a log delivery configuration."
  },
  "cols": 2,
  "rows": 5,
  "align": [
    "left",
    "left"
  ]
}
[/block]
