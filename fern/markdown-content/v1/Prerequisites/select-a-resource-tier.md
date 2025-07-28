---
title: "Select a resource tier"
slug: "select-a-resource-tier"
excerpt: ""
hidden: false
createdAt: "Wed May 05 2021 18:25:41 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Apr 21 2025 18:27:08 GMT+0000 (Coordinated Universal Time)"
---
Resource tiers let you select between different sets of resource consumption limits for your EdgeWorkers functions.

There are currently three resource tiers available, **Basic Compute**, **Dynamic Compute**, and **Enterprise Compute**.  You can choose one of these resource tiers when you [Create an EdgeWorker ID](create-an-edgeworker-id.md).

> 👍 By default, all EdgeWorker IDs created before resource tiers were introduced execute using the **Dynamic Compute** resource tier. The limitations applied by this resource tier are the same as when the EdgeWorker ID was created.

You can, however, change an EdgeWorkers function to Basic Compute, a less costly tier with lower limits. For instructions on how to change the resource tier assigned to an EdgeWorkers function see [How to change to a different EdgeWorkers tier](change-resource-tier.md). The billing rate for each of these resource tiers is different. For information about billing you can contact your <Markdown src="../../snippets/COMPANY_NICKNAME.mdx" /> account representative.

See the [Resource tier limitations](resource-tier-limitations.md) section to review the consumption limits for each resource tier. Review the table below for the supported use cases for each resource tier. Dynamic Compute allows you to implement any currently available EdgeWorkers use case.

# Use case support by resource tier

Review the table below to see which use cases are supported 

 The use case functionality is the same on both the basic and dynamic resource tiers. Only the product limits change.

| Use Case                                                 | Basic Compute  | Dynamic Compute | Enterprise Compute |
| :------------------------------------------------------- | :------------- | :-------------- | :----------------- |
| Cache Key Manipulation                                   | <Markdown src="../../snippets/CHAR_CHECK.mdx" /> | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |
| Forwarding / Conditionally Route Traffic                 | <Markdown src="../../snippets/CHAR_CHECK.mdx" /> | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |
| Redirect Management                                      | <Markdown src="../../snippets/CHAR_CHECK.mdx" /> | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |
| Header Management                                        | <Markdown src="../../snippets/CHAR_CHECK.mdx" /> | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |
| Cookie Management                                        | <Markdown src="../../snippets/CHAR_CHECK.mdx" /> | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |
| Simple regex / hashing / crypto                          | <Markdown src="../../snippets/CHAR_CHECK.mdx" /> | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |
| HTTP sub-request                                         | <Markdown src="../../snippets/CHAR_CHECK.mdx" /> | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |
| Fetches that GET JSON data and enable personalization    | <Markdown src="../../snippets/CHAR_CHECK.mdx" /> | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |
| Data POSTing for metrics beaconing and error logging     | <Markdown src="../../snippets/CHAR_CHECK.mdx" /> | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |
| Response Body modification                               |                | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |
| Integration with EdgeKV                                  | <Markdown src="../../snippets/CHAR_CHECK.mdx" /> | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |
| Complex crypto during the responseProvider event handler |                | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |
| JavaScript logging via a DataStream 2 stream             | <Markdown src="../../snippets/CHAR_CHECK.mdx" /> | <Markdown src="../../snippets/CHAR_CHECK.mdx" />  | <Markdown src="../../snippets/CHAR_CHECK.mdx" />     |

# Resource tiers and billing terminology

Familiarize yourself with these common terms associated with EdgeWorkers resource tiers and billing.

Contact your <Markdown src="../../snippets/COMPANY_NICKNAME.mdx" /> account representative for complete details related to billing.

| Term                   | Definition                                                                                                                                                                                                                                                                                                                                                                      |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Resource tier          | A resource tier is a collection of consumption limits for your EdgeWorkers functions. There are currently two resource tiers available, Dynamic Compute and Basic Compute. You can select a resource tier when you [Create an EdgeWorker ID](create-an-edgeworker-id.md).                                                                                                      |
| Compute resources      | EdgeWorkers compute resources include Execution/CPU time, memory usage, and wall time. For a complete list go to the [Resource tier limitations](resource-tier-limitations.md) section.                                                                                                                                                                                        |
| Events                 | Events are the JavaScript functions that execute when triggered by end user traffic. JavaScript functions are also known as Functions-as-a-Service (FaaS), microservices, and edge apps. To learn more review the [Event handler functions](event-handler-functions.md) section.                                                                                               |
| Traffic hits           | Traffic hits are the end user requests made to edge servers on the Akamai Intelligent Edge Platform. For each enabled EdgeWorkers function up to four events can occur. Keep in mind that hits don't always equal events.                                                                                                                                                       |
| Million events invoked | Million events invoked is the billing unit of measurement for EdgeWorkers. To calculate your bill we sum up the number of times each event was executed for your traffic over the course of a month. You can configure the events you need to support your business logic. Typically only one or two events per end user request occur for many of the early adopter use cases. |
