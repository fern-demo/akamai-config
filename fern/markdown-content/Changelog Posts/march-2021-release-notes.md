---
title: "Mar 24, 2021 — Event handler support for sub-requests"
slug: "march-2021-release-notes"
type: ""
createdAt: "Wed Mar 24 2021 16:06:00 GMT+0000 (Coordinated Universal Time)"
hidden: false
---
- All event handlers now support [HTTP sub-requests](doc:http-request#http-sub-requests). 
- A `getHeaders()` method is now available for the Request Object in the `responseProvider` event handler. A `getHeaders()` method is also available for the httpResponse Object.
- We added an [FAQ](doc:faq-1) section to answer commonly asked questions about EdgeWorkers.
- We added [Best practices for performance](doc:best-practices-for-performance) to help you maximize the performance of your custom JavaScript code.
- You can now deactivate an EdgeWorker version. The deactivation history of an EdgeWorker version is also available.
- When activating an EdgeKV-enabled EdgeWorkers code bundle the EdgeKV files are now validated. We’ve added error messages that describe which files or tokens are missing, invalid, or expired.