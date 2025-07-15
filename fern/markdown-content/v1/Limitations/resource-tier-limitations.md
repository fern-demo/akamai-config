---
title: "Resource tier limitations"
slug: "resource-tier-limitations"
excerpt: ""
hidden: false
metadata: 
  description: "These limitations are unique for each resource tier. There are currently two resource tiers available, Dynamic Compute and Basic Compute."
  image: []
  robots: "index"
createdAt: "Wed May 05 2021 14:08:50 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Mar 07 2025 19:52:04 GMT+0000 (Coordinated Universal Time)"
---
These limitations are unique for each resource tier. There are currently three resource tiers available, **Dynamic Compute**, **Basic Compute** and **Enterprise Compute**.

> 👍 The limits for the EdgeWorker IDs created without a resource tier will not change. By default, these EdgeWorkers functions will execute using **Dynamic Compute**. The Dynamic Compute limits are the same as the limits applied prior to the introduction of resource tiers.

<table>

<caption>

</caption>

<colgroup>

<col>

<col>

<col>

<col>

</colgroup>

<thead>

<tr>

<th align="left">Event handler</th>

<th align="left">Description</th>

<th align="left">Basic Compute</th>

<th align="left">Dynamic Compute</th>

<th align="left">Enterprise Compute</th>

</tr>

</thead>

<tbody>

<tr>

<td rowspan="2"; style=vertical-align:top> all event handlers </td>

<td>Maximum CPU time during initialization</td>

<td>60 milliseconds</td>

<td>60 milliseconds</td>

<td>300 milliseconds</td>

</tr>

<tr>

<td>Maximum wall time during initialization</td>

<td>200 milliseconds</td>

<td>500 milliseconds</td>

<td>500 milliseconds</td>

</tr>

<tr>

<td rowspan="7"; style=vertical-align:top>

onClientRequest

onOriginRequest

onOriginResponse

onClientResponse </td>

<td>Maximum memory usage per event handler</td>

<td>1.5 MB</td>

<td>2.5 MB</td>

<td>4 MB</td>

</tr>

<tr>

<td>Maximum CPU time per event handler</td>

<td>10 milliseconds</td>

<td>20 milliseconds</td>

<td>70 milliseconds</td>

</tr>

<tr>

<td>Maximum wall time per event handler</td>

<td>4 seconds</td>

<td>5.5 seconds</td>

<td>10 seconds</td>

</tr>

<tr>

<td>Maximum number of HTTP sub-requests allowed from a parent request, per event handler<BR>
<BR>

**Note:** You can use content fetched using the onClientRequest event handler to modify the original end-user request's cache key. For cache keys modified in this way, you need to use purge by CP Code and not by URL. For instructions on how to purge a CP code see [Purge Content by CP code](https://techdocs.akamai.com/purge-cache/docs/purge-content-cp-code). For instructions on how to create a CP code see [Create a CP code](https://techdocs.akamai.com/cp-codes/docs/welcome-cp-codes-rpt-grps).</td>

<td style=vertical-align:top>2</td>

<td style=vertical-align:top>4</td>

<td>10</td>

</tr>

<tr>

<td>Maximum number of HTTP sub-requests allowed in parallel per request</td>

<td>2</td>

<td>4</td>

<td>10</td>

</tr>

<tr>

<td>Maximum wall time per HTTP sub-request</td>

<td>4 seconds</td>

<td>5.5 seconds</td>

<td>10 seconds</td>

</tr>

<tr>

<td>Maximum response size per HTTP sub-request</td>

<td>5 MB</td>

<td>5 MB</td>

<td>8 MB</td>

</tr>

<tr>

<td rowspan="7"; style=vertical-align:top> responseProvider </td>

<td>Maximum memory usage for responseProvider</td>

<td>2 MB</td>

<td>4 MB</td>

<td>6 MB</td>

</tr>

<tr>

<td>Maximum CPU time for responseProvider</td>

<td>100 milliseconds</td>

<td>200 milliseconds</td>

<td>300 milliseconds</td>

</tr>

<tr>

<td>Maximum wall time for responseProvider</td>

<td>4 seconds</td>

<td>8 seconds</td>

<td>10 seconds</td>

</tr>

<tr>

<td>Maximum number of HTTP sub-requests allowed for responseProvider</td>

<td>50</td>

<td>50</td>

<td>50</td>

</tr>

<tr>

<td>Maximum number of HTTP sub-requests allowed in parallel for responseProvider</td>

<td>5</td>

<td>5</td>

<td>10</td>

</tr>

<tr>

<td>Maximum wall time per HTTP sub-request during the execution of the responseProvider event handler</td>

<td>4 seconds</td>

<td>8 seconds</td>

<td>10 seconds</td>

</tr>

<tr>

<td>Maximum response size per HTTP sub-request during the execution of the responseProvider event handler
</td>

<td>5 MB</td>

<td>5 MB</td>

<td>8 MB</td>

</tr>

</tbody>

</table>
