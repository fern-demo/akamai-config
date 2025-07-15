---
title: "July 11, 2023 — Run EdgeWorkers Code Profiler on cold start"
slug: "edgeworkers-code-profile-cold-start"
type: ""
createdAt: "Tue Jul 11 2023 19:52:00 GMT+0000 (Coordinated Universal Time)"
hidden: false
---
You can now configure the [Code Profiler](doc:edgeworkers-code-profiler) to run the EdgeWorkers initialization code first.

Profiling data from cold start executions includes information about code that runs outside an EdgeWorkers event handler. You can use these insights to help improve the [wall time](doc:resource-tier-limitations) consumption of your code during EdgeWorkers events.