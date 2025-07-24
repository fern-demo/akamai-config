---
title: "Memory usage report"
slug: "memory-usage-report"
excerpt: ""
hidden: false
createdAt: "Wed Jan 11 2023 20:16:06 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Aug 30 2024 13:52:20 GMT+0000 (Coordinated Universal Time)"
---
This report lists memory usage, grouped by event handler. Only the selected event handlers appear in the report. For example, you can create a report that displays memory usage for the `onClientRequest` event handler.

You can also filter the memory usage of the EdgeWorker IDs selected for the report to show the results for various percentiles. Viewing percentiles can help you identify long tail and outlier use cases. You can then use this information to optimize the performance and stability of your EdgeWorkers functions.

### Memory usage summary for selected EdgeWorker IDs

By default, this report shows the **average** amount of memory used by each event handler. The results include data for all the EdgeWorker IDs you selected for the report. The average is calculated by adding up all of the individual values included in the report and dividing this total by the number of observations.

<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/memoryUsage1-v2.png" alt="Memory usage summary"/>
</Frame>

For a more in-depth measurement of performance you can display the report results by **percentile**. Percentiles aren't skewed by outliers and every data point is an actual measure of user experience. A percentile is a value on a scale of 100 that indicates the percent of a distribution that is equal to or below it. For example, the 95th percentile is the value which is greater than 95% of the all observed values.

- To show the results for various percentiles, select an option from the **Data display type** dropdown.
- Review the table below for details about each of the **Data display type** options.
| Select | The report displays |
| --- | --- |
| Average | The average memory used by each event handler. |
| 25th percentile | The memory usage for the 25th percentile.<br/>25 percent of event handler invocations took equal to or less memory than the value displayed in the report. |
| 50th percentile | The memory usage for the 50th percentile.<br/>50 percent of event handler invocations took equal to or less memory than the value displayed in the report. |
| 75th percentile | The memory usage for the 75th percentile.<br/>75 percent of event handler invocations took equal to or less memory than the value displayed in the report. |
| 95th percentile | The memory usage for the 95th percentile.<br/>95 percent of event handler invocations took equal to or less memory than the value displayed in the report. |
| 99th percentile | The memory usage for the 99th percentile.<br/>99 percent of event handler invocations took equal to or less memory than the value displayed in the report. |


### Memory usage by event handler

This section of the report only displays information for one version of an EdgeWorker ID at a time. To view the data for a specific EdgeWorker ID, select it from the dropdown.

- You can select the **Data display type** for this chart as well. This lets you view the results for the selected EdgeWorker ID within the various percentiles.

- You can also view the average memory usage by event handler in the donut chart.

- If the EdgeWorker version includes child EdgeWorkers, the active revision ID also appears in the graph. For more information see, [Flexible composition](flexible-composition.md).  
<Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/memoryUsage2-v2.png" alt="Memory usage by event handler"/>
</Frame>

### Memory usage summary in percentiles for selected EdgeWorker IDs

This report displays the memory usage for each event handler across percentiles. Using this view you don't have to select each **Data display type** option separately.

 <Frame>
  <img src="https://techdocs.akamai.com/edgeworkers/img/memoryUsage3-v3.png" alt="Memory usage percentile chart"/>
</Frame>
