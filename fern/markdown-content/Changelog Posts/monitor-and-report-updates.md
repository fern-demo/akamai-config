---
title: "Apr 28, 2025 — Monitor overview and Reports improvements"
slug: "monitor-and-report-updates"
type: ""
createdAt: "Thu Apr 24 2025 17:35:00 GMT+0000 (Coordinated Universal Time)"
hidden: false
---
The [Monitoring](doc:about-monitoring) section now includes a table that summarizes each of the options available to help you gain insight about the performance of your EdgeWorkers functions. This overview can help you, for example, decide if you want to deliver [JavaScript logs](doc:enable-javascript-logging) via [Enhanced debug headers](doc:enable-javascript-logging#use-enhanced-debug-headers-to-view-javascript-logs)  or a [DataStream 2 stream](doc:ds2-javascript-logging).

You'll also find the following improvements to the built-in [EdgeWorkers Reports](ref:reports-1).

- Resolved an issue that caused inconsistent date displays on graphs.
- Applied consistent terminology when referring to Execution time and CPU time.
- Improved filtering when selecting EdgeWorker IDs and versions.
- Applied consistent timezones in date pickers and graphs.
- Reports are now loaded by default when least one EdgeWorker ID is selected in the report filters.
- Added a Report overview to the EdgeWorker ID listing table.