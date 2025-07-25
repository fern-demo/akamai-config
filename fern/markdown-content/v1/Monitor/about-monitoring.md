---
title: "About monitoring"
slug: "about-monitoring"
excerpt: ""
hidden: false
createdAt: "Mon Feb 24 2025 21:01:43 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Feb 25 2025 14:55:38 GMT+0000 (Coordinated Universal Time)"
---
In this section you'll find information about how to set up and use reports and logs to help gain insight about the performance of your EdgeWorkers functions.
| Option | Description |
| --- | --- |
| [EdgeWorkers reports](manage-report-data.md) | These reports are built-in to the EdgeWorkers management application and provide details about the performance and execution status of your EdgeWorkers functions.<br/><br/>You can also use the EdgeWorkers API to [generate reports](ref:get-reports). |
| [mPulse reports](mpulse.md) | Displays reports about JavaScript errors in the mPulse dashboard.<br/>To use this feature you need to be part of an mPulse paid plan. |
| [JavaScript logging](enable-javascript-logging.md) | Captures log messages generated during the current request.<br/>You can also use variable substitution to include dynamic data in the EdgeWorkers logs.<br/><br/>You can configure the JavaScript logs to appear in a [DataStream 2 log](datastream-2-integration.md) or [an LDS server log](https://techdocs.akamai.com/log-delivery/docs). |
| [DataStream 2 logs](datastream-2-integration.md) | Generates logs that contain near real-time insight into the performance of your EdgeWorkers functions. You need EdgeWorkers and DataStream 2 enabled in your contract.<br/><br/>You can also [use DataStream 2 to deliver JavaScript Logs](ds2-javascript-logging.md) for an EdgeWorkers function. |
| [Log Delivery Service](enable-log-delivery-for-edgeworkers.md) | Provides status and failure information for your EdgeWorker IDs over a specified period of time in an [LDS server log](https://techdocs.akamai.com/log-delivery/docs). You need to create a log delivery configuration. |
